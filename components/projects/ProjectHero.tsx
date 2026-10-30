"use client";

import { useEffect, useState } from "react";
import { LuArrowLeft, LuClock, LuExpand, LuExternalLink, LuLayers, LuSparkles, LuX } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/icons";
import { TechChip } from "@/components/ui/TechChip";
import { formatReadTime, getReadTimeMinutes } from "@/lib/readTime";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { ProjectCover } from "./ProjectCover";

type ProjectHeroProps = {
  project: Project;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { links } = project;
  const readTime = formatReadTime(getReadTimeMinutes(project));
  const heroStack = project.stack.slice(0, 6);
  const heroHidden = project.stack.length - heroStack.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    if (lightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <>
      <header className="relative pb-12 pt-28 sm:pb-16 sm:pt-36">
        {/* Background radial atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 left-1/2 -z-10 -translate-x-1/2 size-[600px] rounded-full bg-linear-to-b from-accent/10 via-blue/5 to-transparent blur-3xl opacity-70"
        />

        {/* Return to projects link */}
        <Reveal>
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-4 py-1.5 text-xs font-medium text-secondary backdrop-blur-xs transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-primary hover:scale-[1.02] active:scale-[0.98]"
            >
              <LuArrowLeft
                className="size-3.5 transition-transform duration-200 ease-standard group-hover:-translate-x-1"
                aria-hidden="true"
              />
              <span>All projects</span>
            </Link>

            {project.status && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                  project.status === "Live Production"
                    ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border border-border/80 bg-surface/60 text-muted",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    project.status === "Live Production"
                      ? "bg-emerald-400 animate-pulse"
                      : "bg-muted",
                  )}
                  aria-hidden="true"
                />
                {project.status}
              </span>
            )}
          </div>
        </Reveal>

        {/* Hero content grid */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:gap-14">
          {/* Left: Metadata, Title, Summary, Actions */}
          <div className="flex flex-col">
            <Reveal delay={0.05}>
              {/* Category and Role pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {project.category && (
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-3 py-1 font-medium text-accent">
                    <LuLayers className="size-3" aria-hidden="true" />
                    {project.category}
                  </span>
                )}
                {project.role && (
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-surface/80 px-3 py-1 text-secondary">
                    <LuSparkles className="size-3 text-muted" aria-hidden="true" />
                    {project.role}
                  </span>
                )}
              </div>

              {/* Main Title */}
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>

              {/* Compelling summary */}
              <p className="mt-5 w-full lg:max-w-xl text-lg leading-relaxed text-secondary sm:text-xl sm:leading-8">
                {project.summary}
              </p>

              {/* Quick tech chip strip */}
              <div className="mt-7">
                <p className="sr-only">Primary Technologies</p>
                <ul aria-label="Primary technologies" className="flex flex-wrap gap-2">
                  {heroStack.map((tech) => (
                    <TechChip key={tech} name={tech} />
                  ))}
                  {heroHidden > 0 && <TechChip name={`+${heroHidden}`} />}
                </ul>
              </div>

              {/* Action buttons with spring hover */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {links?.live && (
                  <Button
                    href={links.live}
                    size="lg"
                    data-track="project_external_link"
                    data-track-project={project.slug}
                    data-track-kind="live"
                    className="bg-emerald-500 text-background hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Live demo</span>
                    <LuExternalLink className="size-4" aria-hidden="true" />
                  </Button>
                )}

                {links?.repo && (
                  <Button
                    href={links.repo}
                    variant="secondary"
                    size="lg"
                    data-track="project_external_link"
                    data-track-project={project.slug}
                    data-track-kind="repo"
                    className="hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <GithubIcon className="size-4" />
                    <span>Source code</span>
                  </Button>
                )}

                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-muted">
                  <LuClock className="size-3.5 text-accent" aria-hidden="true" />
                  <span>{readTime}</span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right: Browser Mockup Preview with click-to-expand */}
          <Reveal delay={0.15}>
            <div className="group/hero-preview relative">
              {/* Ambient bloom behind the mockup */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-3xl bg-linear-to-br from-accent/20 via-blue/10 to-violet/20 blur-2xl opacity-60 transition-opacity duration-700 group-hover/hero-preview:opacity-100"
              />
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="Click to inspect full resolution screenshot"
                className="group/btn relative block w-full text-left focus-visible:outline-hidden"
              >
                <ProjectCover
                  project={project}
                  zoom
                  priority
                  className="border-border/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
                />

                {/* Hover overlay hint */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-xs opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 rounded-xl"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-surface/95 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary shadow-glow transition-transform duration-300 group-hover/btn:scale-105">
                    <LuExpand className="size-3.5 text-accent" />
                    <span>Click to expand preview</span>
                  </span>
                </div>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Quick Specs Ribbon with interactive card lift */}
        <Reveal delay={0.2}>
          <div className="mt-12 grid grid-cols-1 gap-3 min-[440px]:grid-cols-2 lg:grid-cols-4 sm:gap-4 border-t border-border/80 pt-8">
            <div className="group/spec min-w-0 rounded-xl border border-border/60 bg-surface/40 p-3.5 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted transition-colors group-hover/spec:text-accent">Domain</span>
              <span className="mt-1 block font-medium text-primary text-sm sm:text-base truncate">{project.category ?? "Full-Stack Web"}</span>
            </div>
            <div className="group/spec min-w-0 rounded-xl border border-border/60 bg-surface/40 p-3.5 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted transition-colors group-hover/spec:text-accent">Architecture</span>
              <span className="mt-1 block font-medium text-primary text-sm sm:text-base truncate">
                {project.architecture?.style.split(" ")[0]} {project.architecture?.style.split(" ")[1]}
              </span>
            </div>
            <div className="group/spec min-w-0 rounded-xl border border-border/60 bg-surface/40 p-3.5 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted transition-colors group-hover/spec:text-accent">Key Database</span>
              <span className="mt-1 block font-medium text-primary text-sm sm:text-base truncate">
                {project.slug === "book-recommendation-system"
                  ? "PostgreSQL / SQLite"
                  : "MongoDB Atlas"}
              </span>
            </div>
            <div className="group/spec min-w-0 rounded-xl border border-border/60 bg-surface/40 p-3.5 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted transition-colors group-hover/spec:text-accent">Authentication</span>
              <span className="mt-1 block font-medium text-primary text-sm sm:text-base truncate">
                {project.slug === "job-portal"
                  ? "Clerk Auth"
                  : project.slug === "image-sharing-platform"
                  ? "Stateless JWT"
                  : "Django DRF Token"}
              </span>
            </div>
          </div>
        </Reveal>
      </header>

      {/* Screenshot Lightbox Modal */}
      {lightboxOpen && project.cover && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} screenshot preview`}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-3.5 sm:p-4 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative my-auto flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header bar */}
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface-elevated px-3.5 sm:px-4 py-2.5 sm:py-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="size-2.5 shrink-0 rounded-full bg-rose-500" />
                <span className="size-2.5 shrink-0 rounded-full bg-amber-400" />
                <span className="size-2.5 shrink-0 rounded-full bg-emerald-400" />
                <span className="ml-2 sm:ml-3 font-mono text-xs text-muted truncate max-w-[calc(100vw-8rem)] sm:max-w-md">
                  {project.title} — Full Preview
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border text-muted hover:bg-surface hover:text-primary transition-colors cursor-pointer active:scale-95"
                aria-label="Close image preview"
              >
                <LuX className="size-4" />
              </button>
            </div>

            {/* Modal image container with background shimmer */}
            <div className="relative aspect-video max-h-[75vh] w-full min-h-0 overflow-auto bg-background p-2 sm:p-4">
              <div className="relative size-full min-h-[220px] sm:min-h-[300px] overflow-hidden rounded-lg bg-surface/70">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/[0.08] to-transparent animate-shimmer"
                />

                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  className="relative z-10 object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
