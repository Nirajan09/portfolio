import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/icons";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectCover } from "./ProjectCover";

type ProjectDetailProps = {
  project: Project;
  related: readonly Project[];
};

const subheading =
  "font-display text-2xl font-semibold tracking-tight text-primary";

/**
 * Only renders sections for which the project has real information
 * (no placeholder "Challenges" or "Architecture" blocks).
 */
export function ProjectDetail({ project, related }: ProjectDetailProps) {
  const { links } = project;

  return (
    <>
      <Section id="project-hero" className="pb-10 pt-32 sm:pb-14 sm:pt-36">
        <Reveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All projects
          </Link>
          <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {project.summary}
          </p>
          {(links?.live || links?.repo) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.live && (
                <Button
                  href={links.live}
                  size="lg"
                  data-track="project_external_link"
                  data-track-project={project.slug}
                  data-track-kind="live"
                >
                  Live demo
                  <ExternalLink className="size-4" aria-hidden="true" />
                </Button>
              )}
              {links.repo && (
                <Button
                  href={links.repo}
                  variant="secondary"
                  size="lg"
                  data-track="project_external_link"
                  data-track-project={project.slug}
                  data-track-kind="repo"
                >
                  <GithubIcon className="size-4" />
                  Source code
                </Button>
              )}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <ProjectCover
            project={project}
            className="rounded-lg border border-border"
          />
        </Reveal>
      </Section>

      {project.overview && (
        <Section id="overview" className="py-10 sm:py-14">
          <Reveal>
            <h2 className={subheading}>Overview</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
              {project.overview}
            </p>
          </Reveal>
        </Section>
      )}

      {project.features.length > 0 && (
        <Section id="features" className="py-10 sm:py-14">
          <Reveal>
            <h2 className={subheading}>Key features</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-lg border border-border bg-surface/60 px-4 py-3 text-sm text-secondary sm:text-base"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      )}

      {project.stack.length > 0 && (
        <Section id="stack" className="py-10 sm:py-14">
          <Reveal>
            <h2 className={subheading}>Technology stack</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge variant="accent" className="px-3 py-1.5 text-sm">
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      )}

      {related.length > 0 && (
        <Section id="related" className="pb-24 pt-10 sm:pt-14">
          <Reveal>
            <h2 className={subheading}>More projects</h2>
          </Reveal>
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {related.map((item, index) => (
              <li key={item.slug}>
                <Reveal delay={index * 0.08} className="h-full">
                  <ProjectCard project={item} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
