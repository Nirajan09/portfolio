import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TechChip } from "@/components/ui/TechChip";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { ProjectCover } from "./ProjectCover";

const MAX_TECH = 6;

export function ProjectCard({
  project,
  reversed = false,
}: {
  project: Project;
  reversed?: boolean;
}) {
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
        {/* ---------- Cover ---------- */}
        <div className={cn("relative", reversed && "lg:order-2")}>
          {/* Glow that fades in behind the frame on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 rounded-3xl bg-linear-to-br from-accent/20 via-blue/10 to-violet/20 opacity-0 blur-2xl transition-opacity duration-500 ease-standard group-hover:opacity-100 group-focus-visible:opacity-100"
          />

          <div
            className={cn(
              "relative overflow-hidden rounded-xl border border-border bg-surface",
              "shadow-[0_20px_50px_-20px_rgb(0_0_0/0.7)]",
              "transition-[translate,border-color] duration-500 ease-standard",
              "group-hover:-translate-y-1 group-hover:border-accent/40",
              "group-focus-visible:-translate-y-1 group-focus-visible:border-accent/40",
            )}
          >
            <ProjectCover project={project} zoom />

            {/* Soft bottom shade for depth */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/50 via-transparent to-transparent"
            />

            {/* Hairline along the top edge */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
            />

            {/* "View project" chip appears on hover */}
            <span
              aria-hidden="true"
              className="absolute bottom-4 right-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-accent/40 bg-background/80 px-3.5 py-1.5 text-xs font-semibold text-accent opacity-0 backdrop-blur-md transition-[translate,opacity] duration-300 ease-standard group-hover:translate-y-0 group-hover:opacity-100"
            >
              View project
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        </div>

        {/* ---------- Details ---------- */}
        <div className={cn(reversed && "lg:order-1")}>
          <h3 className="font-display text-2xl font-semibold leading-tight text-primary transition-colors duration-300 group-hover:text-accent sm:text-3xl">
            {project.title}
          </h3>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
            {project.summary}
          </p>

          <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
            {visible.map((tech) => (
              <TechChip key={tech} name={tech} />
            ))}
            {hidden > 0 && <TechChip name={`+${hidden}`} />}
          </ul>

          <span className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-primary">
            <span className="relative">
              View project
              {/* Underline wipes in on hover */}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-[scale] duration-300 ease-standard group-hover:origin-left group-hover:scale-x-100"
              />
            </span>
            <span className="flex size-9 items-center justify-center rounded-full border border-border text-muted transition-[border-color,background-color,color] duration-300 ease-standard group-hover:border-accent group-hover:bg-accent group-hover:text-background">
              <ArrowUpRight
                className="size-4 transition-transform duration-300 ease-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </span>
        </div>
      </article>
    </Link>
  );
}