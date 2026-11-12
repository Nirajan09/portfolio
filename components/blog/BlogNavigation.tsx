import Link from "next/link";
import { LuArrowLeft, LuArrowRight, LuLayoutGrid } from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import type { BlogPostMeta } from "@/types";
import { BlogCard, formatBlogDate } from "./BlogCard";

type BlogNavigationProps = {
  prevPost: BlogPostMeta | null;
  nextPost: BlogPostMeta | null;
  relatedPosts: readonly BlogPostMeta[];
};

export function BlogNavigation({
  prevPost,
  nextPost,
  relatedPosts,
}: BlogNavigationProps) {
  return (
    <div className="pt-10 pb-20 sm:pt-14 sm:pb-24">
      {/* Prev / Next Pagination */}
      {(prevPost || nextPost) && (
        <Reveal>
          <div className="grid gap-4 border-t border-border/80 pt-10 sm:grid-cols-2">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                data-track="blog_click"
                data-track-post={prevPost.slug}
                data-track-location="blog_prev"
                className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-border/70 bg-surface/40 p-4 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-surface/75 hover:shadow-glow sm:p-5"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-transform duration-500 ease-standard group-hover:scale-x-100"
                />
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted group-hover:text-accent">
                  <LuArrowLeft className="size-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-x-1.5" />
                  <span>Newer Article</span>
                </div>
                <div className="mt-3 min-w-0">
                  <p className="font-display text-base font-semibold text-primary transition-colors duration-200 group-hover:text-accent sm:text-lg break-words">
                    {prevPost.title}
                  </p>
                  <p className="mt-1 text-xs text-secondary/80">
                    {prevPost.category} · {formatBlogDate(prevPost.publishedAt)}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                data-track="blog_click"
                data-track-post={nextPost.slug}
                data-track-location="blog_next"
                className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-border/70 bg-surface/40 p-4 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-surface/75 hover:shadow-glow sm:p-5 sm:text-right"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-transform duration-500 ease-standard group-hover:scale-x-100 sm:origin-right sm:bg-linear-to-l"
                />
                <div className="flex items-center justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-muted group-hover:text-accent sm:justify-end">
                  <span>Older Article</span>
                  <LuArrowRight className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
                <div className="mt-3 min-w-0">
                  <p className="font-display text-base font-semibold text-primary transition-colors duration-200 group-hover:text-accent sm:text-lg break-words">
                    {nextPost.title}
                  </p>
                  <p className="mt-1 text-xs text-secondary/80">
                    {nextPost.category} · {formatBlogDate(nextPost.publishedAt)}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
          </div>
        </Reveal>
      )}

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section aria-labelledby="related-posts-heading" className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2
              id="related-posts-heading"
              className="font-display text-xl sm:text-2xl font-bold text-primary"
            >
              More Articles
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              <LuLayoutGrid className="size-4" aria-hidden="true" />
              <span>View all articles</span>
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {relatedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} location="blog_related" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
