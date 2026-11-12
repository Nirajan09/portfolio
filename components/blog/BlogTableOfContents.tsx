"use client";

import { useEffect, useState } from "react";
import { LuList } from "react-icons/lu";
import { cn } from "@/lib/utils";
import type { BlogHeading } from "@/types";

export function BlogTableOfContents({
  headings,
}: {
  headings: readonly BlogHeading[];
}) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-18% 0px -70% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <div className="rounded-xl border border-border/80 bg-surface/50 p-5 backdrop-blur-xs">
        <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
          <LuList className="size-3.5 text-accent" aria-hidden="true" />
          <span>On this page</span>
        </p>

        <ul className="mt-3.5 space-y-1 border-l border-border/80">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;

            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={() => setActiveId(heading.id)}
                  className={cn(
                    "-ml-px block border-l-2 py-1 text-xs leading-snug transition-colors duration-150",
                    heading.level === 3 ? "pl-6" : "pl-3.5",
                    isActive
                      ? "border-accent font-medium text-accent"
                      : "border-transparent text-muted hover:border-border-accent hover:text-primary",
                  )}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
