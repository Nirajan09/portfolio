import { ImageResponse } from "next/og";
import { getAllPostsMeta, getPostBySlug } from "@/lib/blog";
import { OgCard } from "@/lib/brand";

export const alt = "Blog article by Nirajan Tiwari";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPostsMeta().map(({ slug }) => ({ slug }));
}

export default async function BlogOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loaded = await getPostBySlug(slug);
  const post = loaded?.post;

  return new ImageResponse(
    (
      <OgCard
        eyebrow={post ? `Blog · ${post.category}` : "Blog"}
        title={post?.title ?? "Engineering Notes"}
        subtitle={post?.summary ?? "Technical writing by Nirajan Tiwari"}
        footer={
          post
            ? `${post.readingTime} · ${post.tags.slice(0, 3).join(" · ")}`
            : "nirajantiwari.com.np"
        }
      />
    ),
    size,
  );
}
