"use client";

import { memo, useCallback, useMemo, useRef, type MouseEvent } from "react";
import { LuArrowUpRight, LuCheck, LuExternalLink, LuLayers } from "react-icons/lu";
import Link from "next/link";
import { GithubIcon } from "@/components/ui/icons";
import { TechChip } from "@/components/ui/TechChip";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { ProjectCover } from "./ProjectCover";

const MAX_TECH = 6;

type ProjectCardProps = {
  project: Project;
  reversed?: boolean;
  index: number;
};

export const ProjectCard = memo(function ProjectCard({
  project,
  reversed = false,
  index,
}: ProjectCardProps) {
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const { visible, hidden, highlights, projectIndexStr } = useMemo(() => {
    const v = project.stack.slice(0, MAX_TECH);
    const h = project.stack.length - v.length;
    const hl = (project.highlights ?? []).slice(0, 3);
    const idx = String(index + 1).padStart(2, "0");
    return { visible: v, hidden: h, highlights: hl, projectIndexStr: idx };
  }, [project.stack, project.highlights, index]);

  const handleMouseEnter = useCallback((event: MouseEvent<HTMLElement>) => {
    rectRef.current = event.currentTarget.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLElement>) => {
    const clientX = event.clientX;
    const clientY = event.clientY;
    const currentTarget = event.currentTarget;

    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!rectRef.current) {
        rectRef.current = currentTarget.getBoundingClientRect();
      }
      currentTarget.style.setProperty("--mx", `${clientX - rectRef.current.left}px`);
      currentTarget.style.setProperty("--my", `${clientY - rectRef.current.top}px`);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/40 p-4 sm:p-7 lg:p-10",
        "backdrop-blur-xs transform-gpu will-change-transform transition-[transform,translate,border-color,background-color,box-shadow] duration-500 ease-standard",
        "hover:-translate-y-2 hover:border-accent/40 hover:bg-surface/70 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_30px_rgba(34,211,238,0.12)]",
      )}
    >
      {/* Dynamic Cursor Spotlight that follows mouse */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(550px circle at var(--mx, 50%) var(--my, 50%), rgba(34, 211, 238, 0.12), transparent 70%)",
        }}
      />

      {/* Top Hairline Gradient Sweep that expands across top on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-transform duration-500 ease-standard group-hover:scale-x-100"
      />

      {/* Ambient background bloom on card hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-accent/5 blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-0"
      />

      <div
        className={cn(
          "relative z-10 grid items-center gap-6 sm:gap-8 lg:gap-12",
          reversed
            ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
            : "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]",
        )}
      >
        {/* ---------- Visual Preview Column ---------- */}
        <div className={cn("relative", reversed && "lg:order-2")}>
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`View project details: ${project.title}`}
            className="group/preview block focus-visible:outline-hidden"
          >
            <div className="relative rounded-xl">
              <ProjectCover project={project} zoom priority={index === 0} />

              {/* Floating "View project details" badge on image hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-px flex items-center justify-center rounded-[calc(var(--radius-xl)-1px)] bg-background/50 backdrop-blur-xs opacity-0 transition-all duration-300 group-hover/preview:opacity-100"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-surface/95 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-glow transition-transform duration-300 group-hover/preview:scale-105">
                  <span>View project details</span>
                  <LuArrowUpRight className="size-4 text-accent transition-transform duration-300 group-hover/preview:translate-x-0.5 group-hover/preview:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* ---------- Information Column ---------- */}
        <div className={cn("flex flex-col justify-center", reversed && "lg:order-1")}>
          {/* Top metadata badges row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs">
            <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-accent">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              PROJECT {projectIndexStr}
            </span>

            {project.category && (
              <>
                <span className="text-border" aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1 rounded-md border border-border/80 bg-background-secondary/80 px-2.5 py-0.5 font-medium text-secondary">
                  <LuLayers className="size-3 text-accent/80" aria-hidden="true" />
                  {project.category}
                </span>
              </>
            )}

            {project.status && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                  project.status === "Live Production"
                    ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border border-border/60 bg-surface-elevated/70 text-muted",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    project.status === "Live Production" ? "bg-emerald-400 animate-pulse" : "bg-muted",
                  )}
                  aria-hidden="true"
                />
                {project.status}
              </span>
            )}
          </div>

          {/* Project Title */}
          <h3 className="mt-3 sm:mt-4 font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-primary transition-colors duration-200 group-hover:text-accent">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:underline decoration-accent/40 underline-offset-4 focus-visible:outline-hidden"
              data-track="project_click"
              data-track-project={project.slug}
              data-track-target="title"
            >
              {project.title}
            </Link>
          </h3>

          {/* Project Summary */}
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base leading-relaxed text-secondary sm:text-lg">
            {project.summary}
          </p>

          {/* Key Architectural Highlights Bullets */}
          {highlights.length > 0 && (
            <ul className="mt-4 sm:mt-5 space-y-2 text-xs sm:text-sm text-secondary/90">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 transition-transform duration-200 group-hover:translate-x-0.5">
                  <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <LuCheck className="size-2.5 stroke-[3]" aria-hidden="true" />
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech Stack Chips */}
          <div className="mt-5 sm:mt-6">
            <p className="sr-only">Technologies used</p>
            <ul aria-label="Technologies" className="flex flex-wrap gap-1.5 sm:gap-2">
              {visible.map((tech) => (
                <TechChip key={tech} name={tech} />
              ))}
              {hidden > 0 && <TechChip name={`+${hidden}`} />}
            </ul>
          </div>

          {/* Direct Action Links Row */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Primary Case Study Link */}
            <Link
              href={`/projects/${project.slug}`}
              className="group/cta inline-flex w-full min-[480px]:w-auto items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-accent transition-all duration-300 ease-standard hover:border-accent hover:bg-accent hover:text-background hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-hidden"
              data-track="project_click"
              data-track-project={project.slug}
              data-track-target="case_study_btn"
            >
              <span>View project details</span>
              <LuArrowUpRight className="size-3.5 sm:size-4 transition-transform duration-300 ease-standard group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>

            {/* Live Demo Link (when available) */}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                data-track="project_external_link"
                data-track-project={project.slug}
                data-track-kind="live"
                className="group/demo inline-flex flex-1 min-[480px]:flex-none items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-medium text-emerald-300 transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-500 hover:text-background hover:scale-[1.02] active:scale-[0.98]"
                aria-label={`Open live demo for ${project.title} (opens in new tab)`}
              >
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live demo</span>
                <LuExternalLink className="size-3.5 transition-transform duration-200 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" aria-hidden="true" />
              </a>
            )}

            {/* GitHub Source Code Link */}
            {project.links?.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                data-track="project_external_link"
                data-track-project={project.slug}
                data-track-kind="repo"
                className="group/gh inline-flex flex-1 min-[480px]:flex-none items-center justify-center gap-2 rounded-lg border border-border/80 bg-surface-elevated/80 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-medium text-secondary transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-primary hover:scale-[1.02] active:scale-[0.98]"
                aria-label={`View GitHub repository for ${project.title} (opens in new tab)`}
              >
                <GithubIcon className="size-3.5 sm:size-4 transition-transform duration-200 group-hover/gh:scale-110" />
                <span>Source code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
});