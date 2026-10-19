import { LuArrowUpRight } from "react-icons/lu";
import Link from "next/link";
import { TechChip } from "@/components/ui/TechChip";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { ProjectCover } from "./ProjectCover";

const MAX_TECH = 6;

type ProjectCardProps = {
  project: Project;
  reversed?: boolean;
  index?: number;
};

export function ProjectCard({
  project,
  reversed = false,
  index,
}: ProjectCardProps) {
  const visible = project.stack.slice(0, MAX_TECH);
  const hidden = project.stack.length - visible.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View project: ${project.title}`}
      className="group block rounded-2xl"
    >
      <article
        className={cn(
          "grid items-center gap-8 lg:gap-16",
          reversed
            ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
            : "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]",
        )}
      >
        {/* ---------- Cover Frame ---------- */}
        <div className={cn("relative", reversed && "lg:order-2")}>
          {/* Multi-stop vibrant ambient bloom that blooms on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-linear-to-tr from-accent/30 via-blue/20 to-violet/30 opacity-0 blur-3xl transition-[opacity,scale] duration-700 ease-standard group-hover:scale-105 group-hover:opacity-100 group-focus-visible:opacity-100"
          />

          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border border-border bg-surface",
              "shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)]",
              "transform-gpu will-change-transform transition-[transform,translate,border-color,box-shadow] duration-500 ease-standard",
              "group-hover:-translate-y-2.5 group-hover:scale-[1.015] group-hover:border-accent/50 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.85),0_0_30px_rgba(34,211,238,0.15)]",
              "group-focus-visible:-translate-y-2.5 group-focus-visible:border-accent/50",
            )}
          >
            <ProjectCover project={project} zoom />

            {/* Glass sheen light sweep on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/12 to-transparent transition-transform duration-1000 ease-standard group-hover:translate-x-full"
            />

            {/* Soft bottom shade for depth */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-standard group-hover:opacity-100 group-focus-visible:opacity-100"
            />

            {/* Hairline glow along the top edge */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-100"
            />

            {/* "View project" floating pill on hover */}
            <span
              aria-hidden="true"
              className="absolute bottom-4 right-4 inline-flex translate-y-3 items-center gap-2 rounded-full border border-accent/40 bg-surface/90 px-4 py-2 text-xs font-semibold text-primary opacity-0 shadow-glow backdrop-blur-md transition-all duration-300 ease-standard group-hover:translate-y-0 group-hover:opacity-100"
            >
              <span>View project</span>
              <span className="flex size-5 items-center justify-center rounded-full bg-accent text-background transition-transform duration-300 ease-standard group-hover:rotate-45">
                <LuArrowUpRight className="size-3.5 stroke-[2.5]" />
              </span>
            </span>
          </div>
        </div>

        {/* ---------- Details ---------- */}
        <div className={cn("transition-transform duration-300 ease-standard group-hover:translate-x-1", reversed && "lg:order-1")}>
          {index !== undefined && (
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="size-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] animate-pulse" />
              <span>Project {String(index + 1).padStart(2, "0")}</span>
              <span className="text-muted/40">•</span>
              <span className="text-muted font-normal">Case Study</span>
            </div>
          )}

          <h3 className="font-display text-2xl font-bold leading-tight text-primary transition-colors duration-300 group-hover:text-accent sm:text-3xl lg:text-4xl">
            {project.title}
          </h3>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-secondary transition-colors duration-300 group-hover:text-primary/90 sm:text-lg">
            {project.summary}
          </p>

          <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
            {visible.map((tech) => (
              <TechChip key={tech} name={tech} />
            ))}
            {hidden > 0 && <TechChip name={`+${hidden}`} />}
          </ul>

          <div className="mt-8 flex items-center gap-3">
            <span className="group/btn relative inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-surface/80 px-5 py-2.5 text-sm font-semibold text-primary shadow-sm backdrop-blur-xs transition-all duration-300 ease-standard group-hover:border-accent/60 group-hover:bg-accent group-hover:text-background group-hover:shadow-glow group-hover:-translate-y-0.5">
              <span>Explore case study</span>
              <span className="flex size-6 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 ease-standard group-hover:border-transparent group-hover:bg-background/20 group-hover:text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <LuArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}