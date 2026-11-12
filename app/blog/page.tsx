import type { Metadata } from "next";
import Link from "next/link";
import { LuArrowLeft, LuRss } from "react-icons/lu";
import { BlogList } from "@/components/blog/BlogList";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCategories, getAllPostsMeta } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog & Engineering Notes",
  description:
    "Technical articles on Next.js, Django, backend security, database architecture, and frontend performance by Nirajan Tiwari.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();

  return (
    <article className="min-h-screen overflow-x-clip pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background radial atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 -z-10 -translate-x-1/2 size-[520px] rounded-full bg-linear-to-b from-accent/10 via-blue/5 to-transparent blur-3xl opacity-70"
      />

      <PageContainer>
        {/* Top breadcrumb & RSS toolbar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-5">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-4 py-1.5 text-xs font-medium text-secondary backdrop-blur-xs transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-primary"
          >
            <LuArrowLeft
              className="size-3.5 transition-transform duration-200 ease-standard group-hover:-translate-x-1"
              aria-hidden="true"
            />
            <span>Back to home</span>
          </Link>

          <Link
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface/70 px-3.5 py-1.5 font-mono text-xs text-secondary transition-colors hover:border-accent/40 hover:text-accent"
          >
            <LuRss className="size-3.5 text-accent" aria-hidden="true" />
            <span>RSS Feed</span>
          </Link>
        </div>

        <SectionHeading
          eyebrow="Technical Writing"
          title="Blog & Engineering Notes"
          description="Deep dives into web architecture, API security, database design, and performance engineering."
        />

        <BlogList posts={posts} categories={categories} />
      </PageContainer>
    </article>
  );
}
