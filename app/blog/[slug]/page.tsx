import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuCalendar, LuClock } from "react-icons/lu";
import { BlogNavigation } from "@/components/blog/BlogNavigation";
import { formatBlogDate } from "@/components/blog/BlogCard";
import { BlogShareCopy } from "@/components/blog/BlogShareCopy";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { PageContainer } from "@/components/layout/PageContainer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { TechChip } from "@/components/ui/TechChip";
import {
  getAllPostsMeta,
  getPostBySlug,
  getPostNav,
  getRelatedPosts,
} from "@/lib/blog";
import { blogPostingJsonLd, pageMetadata } from "@/lib/seo";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostsMeta().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await getPostBySlug(slug);
  if (!loaded) return {};

  const { post } = loaded;
  return pageMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const loaded = await getPostBySlug(slug);
  if (!loaded) notFound();

  const { post, hast } = loaded;
  const { prev, next } = getPostNav(slug);
  const related = getRelatedPosts(slug, 2);

  return (
    <article className="min-h-screen overflow-x-clip">
      <JsonLd data={blogPostingJsonLd(post)} />

      <PageContainer>
        {/* Header Hero */}
        <header className="relative border-b border-border/70 pt-28 pb-10 sm:pt-36 sm:pb-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 left-1/2 -z-10 -translate-x-1/2 size-[560px] rounded-full bg-linear-to-b from-accent/10 via-blue/5 to-transparent blur-3xl opacity-70"
          />

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-4 py-1.5 text-xs font-medium text-secondary backdrop-blur-xs transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-primary"
            >
              <LuArrowLeft
                className="size-3.5 transition-transform duration-200 ease-standard group-hover:-translate-x-1"
                aria-hidden="true"
              />
              <span>All articles</span>
            </Link>

            <BlogShareCopy slug={post.slug} title={post.title} />
          </div>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <Badge variant="accent">{post.category}</Badge>
              {post.draft && (
                <Badge variant="default" className="text-warning border-warning/40 bg-warning/10">
                  Draft Preview
                </Badge>
              )}

              <time
                dateTime={post.publishedAt}
                className="inline-flex items-center gap-1.5 text-muted"
              >
                <LuCalendar className="size-3.5 text-accent/80" aria-hidden="true" />
                {formatBlogDate(post.publishedAt)}
              </time>

              <span className="inline-flex items-center gap-1.5 text-muted tabular-nums">
                <LuClock className="size-3.5 text-accent/80" aria-hidden="true" />
                {post.readingTime}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl text-balance">
              {post.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg text-pretty">
              {post.summary}
            </p>

            {post.tags.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Article tags">
                {post.tags.map((tag) => (
                  <TechChip key={tag} name={tag} />
                ))}
              </ul>
            )}
          </div>

          {post.cover && (
            <div className="relative mt-10 aspect-16/9 max-w-4xl overflow-hidden rounded-2xl border border-border/80 bg-background-secondary">
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}
        </header>

        {/* Body + Sticky Sidebar TOC */}
        <div
          className={
            post.headings.length > 0
              ? "mt-10 sm:mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]"
              : "mt-10 sm:mt-12 max-w-3xl"
          }
        >
          <div className="min-w-0 max-w-3xl">
            <MarkdownContent hast={hast} />
          </div>

          {post.headings.length > 0 && (
            <aside className="hidden lg:block">
              <BlogTableOfContents headings={post.headings} />
            </aside>
          )}
        </div>

        {/* Prev / Next + Related Articles */}
        <BlogNavigation
          prevPost={prev}
          nextPost={next}
          relatedPosts={related}
        />
      </PageContainer>
    </article>
  );
}
