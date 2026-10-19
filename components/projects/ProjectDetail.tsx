import {
  LuArrowLeft,
  LuArrowUpRight,
  LuClock,
  LuExternalLink,
} from "react-icons/lu";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/icons";
import { TechChip } from "@/components/ui/TechChip";
import { formatReadTime, getReadTimeMinutes } from "@/lib/readTime";
import type { Project } from "@/types";
import { ProjectCover } from "./ProjectCover";
import { ProjectTabs } from "./ProjectTabs";

type ProjectDetailProps = {
  project: Project;
  related: readonly Project[];
};

function H2({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        {children}
      </h2>
      <span
        aria-hidden="true"
        className="h-px flex-1 bg-linear-to-r from-border to-transparent"
      />
    </div>
  );
}

/** Compact card for the "More projects" block. */
function RelatedCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View project: ${project.title}`}
      className="group block h-full rounded-xl"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface/60 transition-[translate,border-color,box-shadow] duration-300 ease-standard group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-glow">
        <ProjectCover
          project={project}
          zoom
          className="border-b border-border"
        />
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold text-primary transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-secondary">
            {project.summary}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors duration-200 group-hover:text-accent">
            View project
            <LuArrowUpRight
              className="size-4 transition-transform duration-300 ease-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectDetail({ project, related }: ProjectDetailProps) {
  const { links } = project;
  const readTime = formatReadTime(getReadTimeMinutes(project));

  const heroStack = project.stack.slice(0, 6);
  const heroHidden = project.stack.length - heroStack.length;

  const hasDetails =
    Boolean(project.overview) ||
    (project.highlights ?? []).length > 0 ||
    project.features.length > 0 ||
    (project.howItWorks ?? []).length > 0 ||
    (project.stackGroups ?? []).length > 0 ||
    project.stack.length > 0;

  return (
    <>
      {/* ---------- Hero: details left, cover right ---------- */}
      <Section id="project-hero" className="pb-10 pt-32 sm:pb-14 sm:pt-36">
        <Reveal>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm font-medium text-muted transition-[color,border-color] duration-200 hover:border-accent/40 hover:text-primary"
          >
            <LuArrowLeft
              className="size-4 transition-transform duration-200 ease-standard group-hover:-translate-x-1"
              aria-hidden="true"
            />
            All projects
          </Link>
        </Reveal>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <Reveal>
            <h1 className="text-balance font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-secondary">
              {project.summary}
            </p>

            <ul
              aria-label="Technologies"
              className="mt-7 flex flex-wrap gap-2"
            >
              {heroStack.map((tech) => (
                <TechChip key={tech} name={tech} />
              ))}
              {heroHidden > 0 && <TechChip name={`+${heroHidden}`} />}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {links?.live && (
                <Button
                  href={links.live}
                  size="lg"
                  data-track="project_external_link"
                  data-track-project={project.slug}
                  data-track-kind="live"
                >
                  Live demo
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
                >
                  <GithubIcon className="size-4" />
                  Source code
                </Button>
              )}
              <span className="inline-flex items-center gap-2 px-2 text-sm text-muted">
                <LuClock className="size-4 text-accent" aria-hidden="true" />
                {readTime}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="group relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 rounded-3xl bg-linear-to-br from-accent/15 via-blue/10 to-violet/15 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-[0_25px_50px_-20px_rgb(0_0_0/0.8)] transition-[border-color,translate] duration-500 ease-standard group-hover:-translate-y-1 group-hover:border-accent/40">
                <ProjectCover project={project} zoom />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Details (tabs) ---------- */}
      {hasDetails && (
        <Section id="project-body" className="py-10 sm:py-14">
          <Reveal>
            <ProjectTabs project={project} />
          </Reveal>
        </Section>
      )}

      {/* ---------- Closing call to action ---------- */}
      <Section id="project-cta" className="py-10 sm:py-14">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-linear-to-br from-surface to-background-secondary px-6 py-10 sm:px-12 sm:py-14">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-accent/10 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -right-12 size-56 rounded-full bg-violet/10 blur-3xl"
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                  Have a project like this in mind?
                </h2>
                <p className="mt-3 text-base leading-relaxed text-secondary">
                  I&apos;m open to freelance and collaboration work. Tell me
                  what you&apos;re building.
                </p>
              </div>
              <Button href="/#contact" size="lg">
                Get in touch
                <LuArrowUpRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ---------- More projects ---------- */}
      {related.length > 0 && (
        <Section id="related" className="pb-24 pt-10 sm:pt-14">
          <Reveal>
            <H2>More projects</H2>
          </Reveal>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((item, index) => (
              <li key={item.slug}>
                <Reveal delay={index * 0.08} className="h-full">
                  <RelatedCard project={item} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}