import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { codeToHast, type BundledLanguage, type BundledTheme } from "shiki/bundle/web";
import { unified } from "unified";
import type { BlogHeading, BlogPost, BlogPostMeta } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const CODE_THEME: BundledTheme = "github-dark-default";
const SLUG_PATTERN = /^[a-z0-9-]+$/;

type HastText = {
  type: "text";
  value: string;
};

type HastElement = {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children: HastNode[];
  data?: { meta?: string };
};

type HastRoot = {
  type: "root";
  children: HastNode[];
};

type HastNode = HastRoot | HastElement | HastText | { type: string; children?: HastNode[]; value?: string };

function isElement(node: HastNode): node is HastElement {
  return node.type === "element" && typeof (node as HastElement).tagName === "string";
}

function getPlainText(node: HastNode): string {
  if (node.type === "text" && typeof node.value === "string") {
    return node.value;
  }
  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map(getPlainText).join("");
  }
  return "";
}

function computeReadingTime(markdown: string): {
  readingMinutes: number;
  readingTime: string;
} {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~\-|]/g, " ");

  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));
  return {
    readingMinutes,
    readingTime: `${readingMinutes} min read`,
  };
}

function parseCodeTitle(meta: string | undefined): string | undefined {
  if (!meta) return undefined;
  const match = meta.match(/title=["']([^"']+)["']/);
  return match?.[1];
}

function extractHeadingsFromHast(tree: HastRoot): BlogHeading[] {
  const headings: BlogHeading[] = [];

  for (const node of tree.children) {
    if (!isElement(node)) continue;
    if (node.tagName !== "h2" && node.tagName !== "h3") continue;

    const id = typeof node.properties?.id === "string" ? node.properties.id : "";
    const text = getPlainText(node).trim();
    if (!id || !text) continue;

    headings.push({
      id,
      text,
      level: node.tagName === "h2" ? 2 : 3,
    });
  }

  return headings;
}

async function highlightCodeBlocks(tree: HastNode): Promise<void> {
  if (!("children" in tree) || !Array.isArray(tree.children)) return;

  for (let i = 0; i < tree.children.length; i++) {
    const child = tree.children[i];
    if (!isElement(child)) continue;

    if (child.tagName === "pre") {
      const codeEl = child.children.find(
        (n): n is HastElement => isElement(n) && n.tagName === "code",
      );

      if (codeEl) {
        const classNames = Array.isArray(codeEl.properties?.className)
          ? codeEl.properties.className
          : typeof codeEl.properties?.className === "string"
            ? [codeEl.properties.className]
            : [];

        const langClass = classNames.find(
          (c): c is string => typeof c === "string" && c.startsWith("language-"),
        );
        const lang = langClass ? langClass.replace("language-", "") : "text";
        const rawCode = getPlainText(codeEl).replace(/\n$/, "");
        const title = parseCodeTitle(codeEl.data?.meta);

        let shikiRoot: Awaited<ReturnType<typeof codeToHast>>;
        try {
          shikiRoot = await codeToHast(rawCode, {
            lang: lang as BundledLanguage,
            theme: CODE_THEME,
          });
        } catch {
          shikiRoot = await codeToHast(rawCode, {
            lang: "text" as BundledLanguage,
            theme: CODE_THEME,
          });
        }

        const shikiPre = shikiRoot.children.find(
          (n) => n.type === "element" && n.tagName === "pre",
        );

        if (shikiPre && shikiPre.type === "element") {
          tree.children[i] = {
            ...shikiPre,
            properties: {
              ...shikiPre.properties,
              "data-code": rawCode,
              "data-lang": lang,
              ...(title ? { "data-title": title } : {}),
            },
          } as HastNode;
        }
        continue;
      }
    }

    await highlightCodeBlocks(child);
  }
}

const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug);

function parseFrontmatter(slug: string, rawFile: string): BlogPostMeta & { content: string } {
  const { data, content } = matter(rawFile);
  const { readingMinutes, readingTime } = computeReadingTime(content);

  const tags = Array.isArray(data.tags)
    ? data.tags.filter((t): t is string => typeof t === "string")
    : [];

  const cover =
    data.cover &&
    typeof data.cover === "object" &&
    typeof (data.cover as { src?: unknown }).src === "string"
      ? {
          src: (data.cover as { src: string }).src,
          alt:
            typeof (data.cover as { alt?: unknown }).alt === "string"
              ? (data.cover as { alt: string }).alt
              : String(data.title ?? slug),
        }
      : undefined;

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    summary: typeof data.summary === "string" ? data.summary : "",
    publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : "2026-01-01",
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
    category: typeof data.category === "string" ? data.category : "Engineering",
    tags,
    readingTime,
    readingMinutes,
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    ...(cover && { cover }),
    content,
  };
}

/** Reads and sorts all published blog post metadata (excluding drafts in production). */
export const getAllPostsMeta = cache((): readonly BlogPostMeta[] => {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const isProd = process.env.NODE_ENV === "production";
  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const posts: BlogPostMeta[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const slug = entry.name.replace(/\.md$/, "");
    if (!SLUG_PATTERN.test(slug)) continue;

    const raw = fs.readFileSync(path.join(CONTENT_DIR, entry.name), "utf8");
    const parsed = parseFrontmatter(slug, raw);

    if (isProd && parsed.draft) continue;

    const { content: _content, ...meta } = parsed;
    posts.push(meta);
  }

  return posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
});

export const getFeaturedPostsMeta = cache((limit = 2): readonly BlogPostMeta[] => {
  const all = getAllPostsMeta();
  const featured = all.filter((p) => p.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
});

export function getAllCategories(): readonly string[] {
  const categories = new Set<string>();
  for (const post of getAllPostsMeta()) {
    categories.add(post.category);
  }
  return Array.from(categories);
}

export const compileMarkdown = cache(async (markdown: string) => {
  const mdast = markdownProcessor.parse(markdown);
  const hast = (await markdownProcessor.run(mdast)) as HastRoot;
  const headings = extractHeadingsFromHast(hast);
  await highlightCodeBlocks(hast);

  return { hast, headings };
});

export const getPostBySlug = cache(
  async (
    slug: string,
  ): Promise<{ post: BlogPost; hast: HastRoot } | null> => {
    if (!SLUG_PATTERN.test(slug)) return null;

    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = parseFrontmatter(slug, raw);

    if (process.env.NODE_ENV === "production" && parsed.draft) {
      return null;
    }

    const { hast, headings } = await compileMarkdown(parsed.content);

    return {
      post: {
        ...parsed,
        headings,
      },
      hast,
    };
  },
);

export function getPostNav(slug: string): {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
} {
  const all = getAllPostsMeta();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

export function getRelatedPosts(
  slug: string,
  limit = 2,
): readonly BlogPostMeta[] {
  const all = getAllPostsMeta();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const currentTags = new Set(current.tags);

  return all
    .filter((p) => p.slug !== slug)
    .map((candidate) => {
      let score = candidate.category === current.category ? 2 : 0;
      for (const tag of candidate.tags) {
        if (currentTags.has(tag)) score += 1;
      }
      return { post: candidate, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post);
}
