import { memo } from "react";
import { LuArrowUpRight, LuExternalLink } from "react-icons/lu";
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
  const visible = project.stack.slice(0, MAX_TECH);
  const hidden = project.stack.length - visible.length;
  const projectIndexStr = String(index + 1).padStart(2, "0");

  return (
    <article
      className={cn(
        "group relative rounded-2xl border border-border/80 bg-surface/50 p-4 sm:p-7 lg:p-10",
        "backdrop-blur-xs transform-gpu will-change-transform transition-[transform,translate,border-color,background-color,box-shadow] duration-300 ease-standard",
        "hover:-translate-y-1.5 hover:border-accent/40 hover:bg-surface/75 hover:shadow-glow",
      )}
    >
      <div
        className={cn(
          "grid items-center gap-6 sm:gap-8 lg:gap-12",
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

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-px flex items-center justify-center rounded-[calc(var(--radius-xl)-1px)] bg-background/55 backdrop-blur-xs opacity-0 transition-all duration-300 group-hover/preview:opacity-100"
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
          {/* Clean Monospace Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs">
            <span className="font-mono font-semibold text-accent">
              {projectIndexStr}
            </span>

            {project.category && (
              <>
                <span className="text-border" aria-hidden="true">·</span>
                <span className="font-medium text-secondary">
                  {project.category}
                </span>
              </>
            )}

            {project.status && (
              <>
                <span className="text-border" aria-hidden="true">·</span>
                <span
                  className={cn(
                    "font-mono text-[11px] font-medium",
                    project.status === "Live Production"
                      ? "text-emerald-400"
                      : "text-muted",
                  )}
                >
                  {project.status}
                </span>
              </>
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

          {/* Tech Stack Chips */}
          <div className="mt-4 sm:mt-5">
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
            <Link
              href={`/projects/${project.slug}`}
              className="group/cta inline-flex w-full min-[480px]:w-auto items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-accent transition-all duration-200 ease-standard hover:border-accent hover:bg-accent hover:text-background hover:shadow-glow focus-visible:outline-hidden"
              data-track="project_click"
              data-track-project={project.slug}
              data-track-target="case_study_btn"
            >
              <span>View project details</span>
              <LuArrowUpRight className="size-3.5 sm:size-4 transition-transform duration-200 ease-standard group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>

            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                data-track="project_external_link"
                data-track-project={project.slug}
                data-track-kind="live"
                className="group/demo inline-flex flex-1 min-[480px]:flex-none items-center justify-center gap-1.5 rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-medium text-emerald-300 transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-500 hover:text-background"
                aria-label={`Open live demo for ${project.title} (opens in new tab)`}
              >
                <span>Live demo</span>
                <LuExternalLink className="size-3.5 transition-transform duration-200 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" aria-hidden="true" />
              </a>
            )}

            {project.links?.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                data-track="project_external_link"
                data-track-project={project.slug}
                data-track-kind="repo"
                className="group/gh inline-flex flex-1 min-[480px]:flex-none items-center justify-center gap-2 rounded-lg border border-border/80 bg-surface-elevated/80 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-medium text-secondary transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-primary"
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
