import { ArrowLeft, Check, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/icons";
import { formatReadTime, getReadTimeMinutes } from "@/lib/readTime";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectCover } from "./ProjectCover";
import { ProjectNav } from "./ProjectNav";

type ProjectDetailProps = {
  project: Project;
  related: readonly Project[];
};

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-semibold tracking-tight text-primary">
      {children}
    </h2>
  );
}

/**
 * Only renders sections for which the project has real information
 * (no placeholder "Challenges" or "Architecture" blocks).
 */
export function ProjectDetail({ project, related }: ProjectDetailProps) {
  const { links } = project;
  const readTime = formatReadTime(getReadTimeMinutes(project));

  const stackGroups = project.stackGroups ?? [];
  const steps = project.howItWorks ?? [];
  const highlights = project.highlights ?? [];

  const hasOverview = Boolean(project.overview) || highlights.length > 0;
  const hasFeatures = project.features.length > 0;
  const hasSteps = steps.length > 0;
  const hasStack = stackGroups.length > 0 || project.stack.length > 0;

  const navItems: { id: string; label: string }[] = [];
  if (hasOverview) navItems.push({ id: "overview", label: "Overview" });
  if (hasFeatures) navItems.push({ id: "features", label: "Key features" });
  if (hasSteps) navItems.push({ id: "how-it-works", label: "How it works" });
  if (hasStack) navItems.push({ id: "stack", label: "Tech stack" });

  return (
    <>

      {/* Hero */}
      <Section id="project-hero" className="pb-10 pt-32 sm:pb-14 sm:pt-36">
        <Reveal>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-primary"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-200 ease-standard group-hover:-translate-x-1"
              aria-hidden="true"
            />
            All projects
          </Link>
          <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-sm text-muted">
              <Clock className="size-4 text-accent" aria-hidden="true" />
              {readTime}
            </span>
            {(links?.live || links?.repo) && (
              <>
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
              </>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <ProjectCover
            project={project}
            className="rounded-xl border border-border"
          />
        </Reveal>
      </Section>

      {/* Body: sticky section nav + content */}
      {navItems.length > 0 && (
        <Section id="project-body" className="py-10 sm:py-14">
          <div className="grid gap-12 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-16">
            <ProjectNav items={navItems} />

            <div className="min-w-0 space-y-16">
              {hasOverview && (
                <section id="overview" aria-labelledby="overview-title">
                  <Reveal>
                    <div id="overview-title">
                      <H2>Overview</H2>
                    </div>
                    {project.overview && (
                      <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
                        {project.overview}
                      </p>
                    )}
                    {highlights.length > 0 && (
                      <div className="mt-8 rounded-xl border border-l-2 border-border border-l-accent/60 bg-surface/60 p-5 sm:p-6">
                        <h3 className="text-sm font-medium text-primary">
                          Technical highlights
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {highlights.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-sm leading-relaxed text-secondary sm:text-base"
                            >
                              <Check
                                className="mt-1 size-4 shrink-0 text-accent"
                                aria-hidden="true"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Reveal>
                </section>
              )}

              {hasFeatures && (
                <section id="features">
                  <Reveal>
                    <H2>Key features</H2>
                    <ul className="mt-6 grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm leading-relaxed text-secondary sm:text-base"
                        >
                          <Check
                            className="mt-1 size-4 shrink-0 text-accent"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </section>
              )}

              {hasSteps && (
                <section id="how-it-works">
                  <Reveal>
                    <H2>How it works</H2>
                    <ol className="relative mt-8 space-y-6 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-px before:bg-border">
                      {steps.map((step, index) => (
                        <li
                          key={step}
                          className="group/step relative flex items-start gap-4"
                        >
                          <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-border bg-background-secondary font-display text-sm font-semibold text-accent transition-colors duration-300 group-hover/step:border-accent group-hover/step:bg-accent group-hover/step:text-background">
                            {index + 1}
                          </span>
                          <p className="pt-1 text-sm leading-relaxed text-secondary transition-colors duration-200 group-hover/step:text-primary sm:text-base">
                            {step}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </Reveal>
                </section>
              )}

              {hasStack && (
                <section id="stack">
                  <Reveal>
                    <H2>Tech stack</H2>
                    {stackGroups.length > 0 ? (
                      <dl className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface/60">
                        {stackGroups.map((group) => (
                          <div
                            key={group.label}
                            className="flex flex-col gap-3 px-5 py-4 transition-colors duration-300 hover:bg-accent/5 sm:flex-row sm:items-start sm:gap-6"
                          >
                            <dt className="text-sm text-muted sm:w-36 sm:shrink-0 sm:pt-1.5">
                              {group.label}
                            </dt>
                            <dd>
                              <ul className="flex flex-wrap gap-2">
                                {group.items.map((tech) => (
                                  <li key={tech}>
                                    <Badge variant="accent">{tech}</Badge>
                                  </li>
                                ))}
                              </ul>
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <li key={tech}>
                            <Badge variant="accent">{tech}</Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                </section>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* More projects */}
      {related.length > 0 && (
        <Section id="related" className="pb-24 pt-10 sm:pt-14">
          <Reveal>
            <H2>More projects</H2>
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