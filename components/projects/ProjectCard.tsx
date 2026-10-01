import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/types";
import { ProjectCover } from "./ProjectCover";

export function ProjectCard({ project }: { project: Project }) {
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
        <ProjectCover
          project={project}
          zoom
          className="border-b border-border"
        />
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold text-primary">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {project.summary}
          </p>
          <ul aria-label="Technologies" className="mt-5 flex flex-1 flex-wrap content-start gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors duration-200 group-hover:text-accent">
            View project
            <ArrowRight
              className="size-4 transition-transform duration-200 ease-standard group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Card>
    </Link>
  );
}