import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCalendar, LuClock } from "react-icons/lu";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TechChip } from "@/components/ui/TechChip";
import type { BlogPostMeta } from "@/types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatBlogDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return dateFormatter.format(parsed);
}

type BlogCardProps = {
  post: BlogPostMeta;
  location?: "home_latest" | "blog_index" | "blog_related";
};

export function BlogCard({ post, location = "blog_index" }: BlogCardProps) {
  const href = `/blog/${post.slug}`;

  return (
    <Card
      interactive
      padding="none"
      className="group relative flex h-full flex-col overflow-hidden"
    >
      {/* Top gradient hairline accent */}
      <span
        aria-hidden="true"
        className="h-0.5 w-full bg-linear-to-r from-accent/70 via-blue/60 to-violet/70 opacity-75 transition-opacity duration-200 group-hover:opacity-100"
      />

      {post.cover && (
        <Link
          href={href}
          data-track="blog_click"
          data-track-post={post.slug}
          data-track-location={location}
          className="relative block aspect-16/9 w-full overflow-hidden border-b border-border/70 bg-background-secondary"
        >
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-standard group-hover:scale-105"
          />
        </Link>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Category + Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="accent">{post.category}</Badge>
            {post.draft && (
              <Badge variant="default" className="text-warning border-warning/40 bg-warning/10">
                Draft
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-muted">
            <time dateTime={post.publishedAt} className="inline-flex items-center gap-1">
              <LuCalendar className="size-3.5 text-accent/80" aria-hidden="true" />
              {formatBlogDate(post.publishedAt)}
            </time>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <LuClock className="size-3.5 text-accent/80" aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-4 font-display text-lg sm:text-xl font-semibold leading-snug tracking-tight text-primary transition-colors duration-200 group-hover:text-accent">
          <Link
            href={href}
            data-track="blog_click"
            data-track-post={post.slug}
            data-track-location={location}
            className="focus-visible:outline-hidden focus-visible:underline"
          >
            {post.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-secondary/90 line-clamp-3">
          {post.summary}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Article tags">
            {post.tags.slice(0, 3).map((tag) => (
              <TechChip key={tag} name={tag} />
            ))}
          </ul>
        )}

        {/* Footer Read Link */}
        <div className="mt-6 border-t border-border/60 pt-4">
          <Link
            href={href}
            data-track="blog_click"
            data-track-post={post.slug}
            data-track-location={location}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            <span>Read article</span>
            <LuArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </Card>
  );
}
