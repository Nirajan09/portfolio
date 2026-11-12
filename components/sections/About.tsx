"use client";

import Link from "next/link";
import { memo, useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuBriefcase,
  LuClock,
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

// Cached time formatter instance
const aboutTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kathmandu",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export const About = memo(function About() {
  const [kathmanduTime, setKathmanduTime] = useState<string>("");

  // Live Kathmandu time update
  useEffect(() => {
    const updateTime = () => {
      try {
        setKathmanduTime(aboutTimeFormatter.format(new Date()));
      } catch {
        setKathmanduTime("UTC+5:45");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="about">
      <Reveal>
        <SectionHeading eyebrow="About Me" title="Background & Overview" />
      </Reveal>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* Left Column: Narrative Story */}
        <Reveal className="space-y-6">
          <div className="w-full space-y-4 lg:max-w-prose">
            <p className="text-base leading-relaxed text-primary/95 sm:text-lg">
              {about.paragraphs[0]}
            </p>

            <div className="space-y-3">
              <p className="text-base leading-relaxed text-secondary/90">
                {about.paragraphs[1]}
              </p>

              {/* Core Tech Stack */}
              <div className="flex flex-wrap gap-2 pt-1">
                {about.coreTechnologies.map((tech) => (
                  <TechChip key={tech} name={tech} as="span" />
                ))}
              </div>
            </div>

            <p className="pt-1 text-base leading-relaxed text-secondary/80">
              {about.paragraphs[2]}
            </p>
          </div>
        </Reveal>

        {/* Right Column: Overview Card */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border/75 bg-surface/50 p-5 backdrop-blur-xs transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-glow sm:p-7">
            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3.5">
              <h3 className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted">
                Overview
              </h3>
              {kathmanduTime && (
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/80 bg-background-secondary/70 px-2.5 py-0.5 font-mono text-xs text-secondary">
                  <LuClock className="size-3 text-accent" aria-hidden="true" />
                  <span className="truncate">{kathmanduTime} (NPT)</span>
                </span>
              )}
            </div>

            <ul role="list" className="divide-y divide-border/50">
              {about.highlights.map((highlight) => {
                const Icon = highlightIcons[highlight.id];
                const isRole = highlight.id === "role";

                return (
                  <li
                    key={highlight.id}
                    className="group/row -mx-2 rounded-xl px-2 py-3.5 list-none transition-colors duration-150 first:pt-3.5 last:pb-0 hover:bg-surface-elevated/50"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-surface-elevated text-accent transition-colors duration-200 group-hover/row:border-accent/40 group-hover/row:bg-accent/10">
                        <Icon className="size-4" aria-hidden="true" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="block font-mono text-[11px] uppercase tracking-wider text-muted transition-colors group-hover/row:text-accent">
                            {highlight.label}
                          </span>
                          {isRole && "href" in highlight && (
                            <Link
                              href={highlight.href}
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline"
                            >
                              <span>Experience</span>
                              <LuArrowUpRight
                                className="size-3 transition-transform duration-200 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
                                aria-hidden="true"
                              />
                            </Link>
                          )}
                        </div>

                        <h4 className="mt-0.5 text-sm font-semibold text-primary sm:text-base">
                          {highlight.title}
                        </h4>

                        <p className="mt-0.5 text-xs text-secondary/80">
                          {highlight.detail}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
});
