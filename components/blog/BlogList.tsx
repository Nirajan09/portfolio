"use client";

import { memo, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuFilter, LuSearch, LuX } from "react-icons/lu";
import { trackEvent } from "@/lib/analytics";
import type { BlogPostMeta } from "@/types";
import { BlogCard } from "./BlogCard";

type BlogListProps = {
  posts: readonly BlogPostMeta[];
  categories: readonly string[];
};

export const BlogList = memo(function BlogList({
  posts,
  categories,
}: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      if (selectedCategory !== "all" && post.category !== selectedCategory) {
        return false;
      }

      if (!query) return true;

      return (
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [posts, searchQuery, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    trackEvent("blog_filter", { category });
  };

  return (
    <div className="mt-10 sm:mt-12">
      {/* Search & Category Filter Controls */}
      <div className="rounded-2xl border border-border/80 bg-surface/50 p-4 sm:p-5 backdrop-blur-md">
        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <LuSearch
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics, or technologies..."
              aria-label="Search blog articles"
              className="w-full h-10 pl-9.5 pr-8 rounded-xl border border-border/80 bg-background/80 text-xs sm:text-sm text-primary placeholder:text-muted focus:border-accent focus:bg-background focus:outline-hidden focus:ring-1 focus:ring-accent transition-all duration-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center rounded-md text-muted hover:text-primary transition-colors cursor-pointer"
              >
                <LuX className="size-3.5" />
              </button>
            )}
          </div>

          <span className="font-mono text-xs text-secondary shrink-0 tabular-nums">
            Showing{" "}
            <strong className="text-accent font-semibold">
              {filteredPosts.length}
            </strong>{" "}
            of {posts.length} {posts.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-3.5">
          <span className="mr-1 hidden items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted sm:inline-flex">
            <LuFilter className="size-3.5 text-accent" aria-hidden="true" />
            Topics:
          </span>

          {(["all", ...categories] as const).map((category) => {
            const isActive = selectedCategory === category;
            const count =
              category === "all"
                ? posts.length
                : posts.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "text-primary"
                    : "border border-border/70 bg-surface/60 text-secondary hover:border-accent/40 hover:text-primary"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="blogActiveCategory"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-accent/40 bg-accent/15 shadow-[0_0_14px_-3px_rgba(34,211,238,0.35)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  <span>{category === "all" ? "All Articles" : category}</span>
                  <span className="font-mono text-[10px] opacity-75 tabular-nums">
                    ({count})
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      <AnimatePresence mode="popLayout">
        {filteredPosts.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center"
          >
            <LuSearch className="mx-auto size-8 text-muted" aria-hidden="true" />
            <p className="mt-3 font-display text-base font-semibold text-primary">
              No matching articles found
            </p>
            <p className="mt-1 text-xs text-secondary">
              Try a different keyword or reset the topic filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.ul
            key="grid"
            layout
            className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2"
          >
            {filteredPosts.map((post) => (
              <motion.li
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <BlogCard post={post} location="blog_index" />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
});
