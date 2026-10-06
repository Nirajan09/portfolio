import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatReadTime, getReadTimeMinutes } from "@/lib/readTime";
import type { Project } from "@/types";
import { ProjectCover } from "./ProjectCover";

const MAX_TECH = 4;

export function ProjectCard({ project }: { project: Project }) {
  const visible = project.stack.slice(0, MAX_TECH);
  const hidden = project.stack.length - visible.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View project: ${project.title}`}
      className="group block h-full rounded-lg"
    >
      <Card
        interactive
        padding="none"
        className="flex h-full flex-col overflow-hidden"
      >
        <div className="relative">
          <ProjectCover
            project={project}
            zoom
            className="border-b border-border"
          />
          {/* Arrow chip appears on hover */}
          <span
            aria-hidden="true"
            className="absolute right-4 top-4 grid size-9 translate-y-1 place-items-center rounded-full border border-accent/40 bg-background/80 text-accent opacity-0 backdrop-blur-sm transition-all duration-300 ease-standard group-hover:translate-y-0 group-hover:opacity-100"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold text-primary transition-colors duration-200 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
            {project.summary}
          </p>

          <ul
            aria-label="Technologies"
            className="mt-5 flex flex-1 flex-wrap content-start gap-2"
          >
            {visible.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
            {hidden > 0 && (
              <li>
                <Badge>+{hidden}</Badge>
              </li>
            )}
          </ul>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors duration-200 group-hover:text-accent">
              View project
              <ArrowRight
                className="size-4 transition-transform duration-200 ease-standard group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted">
              <Clock className="size-3.5" aria-hidden="true" />
              {formatReadTime(getReadTimeMinutes(project))}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}