"use client";

import { CalendarDays, Check, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/animation/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types";

export function ExperienceTimeline({ items }: { items: readonly Experience[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);

  // The line draws itself as the list scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 55%"],
  });

  // Active entry: the one crossing the middle of the viewport (last one wins
  // while between entries, so emphasis never flickers off).
  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const entries = root.querySelectorAll<HTMLElement>("[data-experience-id]");
    const observer = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.getAttribute("data-experience-id") ?? undefined);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    entries.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={listRef} className="relative">
      {/* Track + progress line */}
      <div
        aria-hidden="true"
        className="absolute bottom-2 left-[11.5px] top-2 w-px bg-border"
      />
      <motion.div
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : { scaleY: scrollYProgress, transformOrigin: "top" }
        }
        className="absolute bottom-2 left-[11.5px] top-2 w-px bg-linear-to-b from-accent to-blue"
      />

      <ol aria-label="Work experience" className="space-y-10">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li
              key={item.id}
              data-experience-id={item.id}
              className="relative pl-12"
            >
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                className={cn(
                  "absolute left-0 top-6 flex size-6 items-center justify-center rounded-full border bg-background transition-[border-color,box-shadow] duration-300",
                  isActive ? "border-accent shadow-glow" : "border-border",
                )}
              >
                <span
                  className={cn(
                    "size-2 rounded-full transition-colors duration-300",
                    isActive ? "bg-accent" : "bg-muted",
                  )}
                />
              </motion.span>

              <Reveal y={20}>
                <Card
                  className={cn(
                    "transition-[border-color,box-shadow] duration-300",
                    isActive && "border-accent/40 shadow-glow",
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-primary">
                        {item.company}
                      </h3>
                      <p className="mt-1 text-base font-medium text-secondary">
                        {item.role}
                      </p>
                    </div>
                    {item.current && <Badge variant="accent">Current</Badge>}
                  </div>

                  <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-4" aria-hidden="true" />
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4" aria-hidden="true" />
                      {item.location}
                      {item.mode && ` · ${item.mode}`}
                    </span>
                  </p>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-5 space-y-2 border-t border-border pt-5">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-3 text-sm leading-relaxed text-secondary"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-accent"
                            aria-hidden="true"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}