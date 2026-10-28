"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuBriefcase,
  LuDumbbell,
  LuGraduationCap,
  LuMapPin,
} from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechChip } from "@/components/ui/TechChip";
import { about, type AboutHighlightId } from "@/data/about";

const highlightIcons: Record<AboutHighlightId, IconType> = {
  role: LuBriefcase,
  education: LuGraduationCap,
  location: LuMapPin,
  interests: LuDumbbell,
};

export function About() {
  const [kathmanduTime, setKathmanduTime] = useState<string>("");

  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  // Live Kathmandu time update
  useEffect(() => {
    const updateTime = () => {
      try {
        const time = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kathmandu",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setKathmanduTime(time);
      } catch {
        setKathmanduTime("UTC+5:45");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Spotlight mouse tracking on the overview card
  function handleMouseEnter(event: MouseEvent<HTMLDivElement>) {
    rectRef.current = event.currentTarget.getBoundingClientRect();
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const clientX = event.clientX;
    const clientY = event.clientY;
    const currentTarget = event.currentTarget;

    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!rectRef.current) {
        rectRef.current = currentTarget.getBoundingClientRect();
      }
      currentTarget.style.setProperty(
        "--mx",
        `${clientX - rectRef.current.left}px`,
      );
      currentTarget.style.setProperty(
        "--my",
        `${clientY - rectRef.current.top}px`,
      );
    });
  }

  function handleMouseLeave() {
    rectRef.current = null;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  return (
    <Section id="about">
      <Reveal>
        <SectionHeading
          eyebrow="About Me"
          title="Background & Overview"
        />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 items-start">
        {/* Left Column: Narrative Story */}
        <Reveal className="space-y-6">
          <div className="space-y-4 max-w-prose">
            <p className="text-base sm:text-lg leading-relaxed text-primary/95">
              {about.paragraphs[0]}
            </p>

            <div className="space-y-3">
              <p className="text-base leading-relaxed text-secondary/90">
                {about.paragraphs[1]}
              </p>

              {/* Interactive Core Tech Stack Explorer */}
              <div className="flex flex-wrap gap-2 pt-1">
                {about.coreTechnologies.map((tech) => (
                  <TechChip key={tech} name={tech} as="span" />
                ))}
              </div>
            </div>

            <p className="text-base leading-relaxed text-secondary/80 pt-1">
              {about.paragraphs[2]}
            </p>
          </div>
        </Reveal>

        {/* Right Column: Interactive Overview Spotlight Card */}
        <Reveal delay={0.1}>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-surface/40 p-5 sm:p-7 backdrop-blur-xs transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-glow"
          >
            {/* Dynamic cursor-following spotlight beam */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(350px circle at var(--mx, 50%) var(--my, 0%), rgb(34 211 238 / 0.12), transparent 70%)",
              }}
            />

            {/* Hairline accent line that sweeps across the top on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-[scale] duration-500 ease-standard group-hover:scale-x-100"
            />

            <div className="relative">
              <div className="flex items-center justify-between border-b border-border/50 pb-3.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted">
                  Overview
                </h3>
                {kathmanduTime && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-2.5 py-0.5">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{kathmanduTime} (NPT)</span>
                  </span>
                )}
              </div>

              <dl className="divide-y divide-border/50">
                {about.highlights.map((highlight) => {
                  const Icon = highlightIcons[highlight.id];
                  const isRole = highlight.id === "role";

                  return (
                    <div
                      key={highlight.id}
                      className="group/row py-3.5 first:pt-3.5 last:pb-0 transition-colors duration-150 rounded-xl px-2 -mx-2 hover:bg-surface-elevated/50"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-surface-elevated text-accent transition-all duration-200 group-hover/row:scale-110 group-hover/row:border-accent/40 group-hover/row:bg-accent/15">
                          <Icon className="size-4" aria-hidden="true" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <dt className="text-[11px] font-mono uppercase tracking-wider text-muted group-hover/row:text-accent transition-colors">
                              {highlight.label}
                            </dt>
                            {isRole && "href" in highlight && (
                              <Link
                                href={highlight.href}
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:underline"
                              >
                                <span>Experience</span>
                                <LuArrowUpRight
                                  className="size-3 transition-transform duration-200 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
                                  aria-hidden="true"
                                />
                              </Link>
                            )}
                          </div>

                          <dd className="mt-0.5 text-sm sm:text-base font-semibold text-primary">
                            {highlight.title}
                          </dd>

                          <p className="mt-0.5 text-xs text-secondary/80">
                            {highlight.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}