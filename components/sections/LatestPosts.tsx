import Link from "next/link";
import { LuArrowRight, LuRss } from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllPostsMeta, getFeaturedPostsMeta } from "@/lib/blog";

export function LatestPosts() {
  const posts = getFeaturedPostsMeta(2);
  const totalCount = getAllPostsMeta().length;

  if (posts.length === 0) return null;

  return (
    <Section id="blog" className="relative">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <SectionHeading
            eyebrow="Technical Writing"
            title="Latest Articles"
            description="Engineering notes on full-stack architecture, security, performance optimization, and lessons from building real systems."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex shrink-0 items-center gap-2.5">
            <Link
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe via RSS feed"
              title="RSS Feed"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border/80 bg-surface/60 text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface hover:text-accent"
            >
              <LuRss className="size-4" aria-hidden="true" />
            </Link>

            <Link
              href="/blog"
              data-track="blog_click"
              data-track-location="home_view_all"
              className="group inline-flex h-10 items-center gap-2 rounded-xl border border-accent/35 bg-accent/10 px-4 text-sm font-medium text-accent transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-background hover:shadow-glow"
            >
              <span>All articles ({totalCount})</span>
              <LuArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((post, index) => (
          <li key={post.slug} className="h-full">
            <Reveal delay={index * 0.08} className="h-full">
              <BlogCard post={post} location="home_latest" />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
