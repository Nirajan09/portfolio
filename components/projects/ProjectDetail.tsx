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
import { ReadingProgress } from "./ReadingProgress";

type ProjectDetailProps = {
  project: Project;
  related: readonly Project[];
};

const subheading =
  "font-display text-2xl font-semibold tracking-tight text-primary";

/** Shared interactive card: lift, accent border, glow. */
const card =
  "group/item h-full rounded-lg border border-border bg-surface/60 text-sm text-secondary transition-all duration-300 ease-standard hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface hover:text-primary hover:shadow-glow sm:text-base";

const listCard = `${card} flex items-start gap-3 px-4 py-3`;

const checkIcon =
  "mt-0.5 size-4 shrink-0 text-accent transition-transform duration-300 ease-standard group-hover/item:scale-125";

const badgeHover =
  "transition-colors duration-200 hover:border-accent/50 hover:text-accent";

/** Cap the delay so long lists don't feel slow. */
const stagger = (index: number) => Math.min(index * 0.05, 0.3);

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className={subheading}>{children}</h2>;
}

/**
 * Only renders sections for which the project has real information
 * (no placeholder "Challenges" or "Architecture" blocks).
 */
export function ProjectDetail({ project, related }: ProjectDetailProps) {
  const { links } = project;
  const readTime = formatReadTime(getReadTimeMinutes(project));

  return (
    <>
      <ReadingProgress />

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
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-sm text-muted transition-colors duration-200 hover:border-accent/40 hover:text-primary">
            <Clock className="size-4 text-accent" aria-hidden="true" />
            <span>{readTime}</span>
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
            className="rounded-lg border border-border transition-all duration-300 ease-standard hover:border-accent/40 hover:shadow-glow"
          />
        </Reveal>
      </Section>

      {project.overview && (
        <Section id="overview" className="py-10 sm:py-14">
          <Reveal>
            <SectionHeading>Overview</SectionHeading>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
              {project.overview}
            </p>
          </Reveal>
        </Section>
      )}

      {project.features.length > 0 && (
        <Section id="features" className="py-10 sm:py-14">
          <Reveal>
            <SectionHeading>Key Features</SectionHeading>
          </Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.features.map((feature, index) => (
              <li key={feature}>
                <Reveal delay={stagger(index)} className="h-full">
                  <div className={listCard}>
                    <Check className={checkIcon} aria-hidden="true" />
                    {feature}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {project.howItWorks && project.howItWorks.length > 0 && (
        <Section id="how-it-works" className="py-10 sm:py-14">
          <Reveal>
            <SectionHeading>How It Works</SectionHeading>
          </Reveal>
          <ol className="relative mt-8 grid gap-6 before:absolute before:bottom-4 before:left-4.5 before:top-4 before:w-px before:bg-border">
            {project.howItWorks.map((step, index) => (
              <li key={step}>
                <Reveal delay={stagger(index)}>
                  <div className="group/item relative flex items-start gap-4">
                    <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-border bg-background-secondary font-display text-sm font-semibold text-accent transition-all duration-300 ease-standard group-hover/item:scale-110 group-hover/item:border-accent group-hover/item:bg-accent group-hover/item:text-background group-hover/item:shadow-glow">
                      {index + 1}
                    </span>
                    <p className="pt-1.5 text-sm leading-relaxed text-secondary transition-colors duration-200 group-hover/item:text-primary sm:text-base">
                      {step}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {(project.stackGroups?.length ?? 0) > 0 ? (
        <Section id="stack" className="py-10 sm:py-14">
          <Reveal>
            <SectionHeading>Technology Stack</SectionHeading>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.stackGroups!.map((group, index) => (
              <Reveal
                key={group.label}
                delay={stagger(index)}
                className="h-full"
              >
                <div className={`${card} p-5`}>
                  <h3 className="text-sm font-medium uppercase tracking-wide text-muted transition-colors duration-300 group-hover/item:text-accent">
                    {group.label}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((tech) => (
                      <li
                        key={tech}
                        className="transition-transform duration-200 ease-standard hover:-translate-y-0.5"
                      >
                        <Badge
                          variant="accent"
                          className={`px-3 py-1.5 text-sm ${badgeHover}`}
                        >
                          {tech}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : (
        project.stack.length > 0 && (
          <Section id="stack" className="py-10 sm:py-14">
            <Reveal>
              <SectionHeading>Technology Stack</SectionHeading>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="transition-transform duration-200 ease-standard hover:-translate-y-0.5"
                  >
                    <Badge
                      variant="accent"
                      className={`px-3 py-1.5 text-sm ${badgeHover}`}
                    >
                      {tech}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Section>
        )
      )}

      {project.highlights && project.highlights.length > 0 && (
        <Section id="highlights" className="py-10 sm:py-14">
          <Reveal>
            <SectionHeading>Technical Highlights</SectionHeading>
          </Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.highlights.map((item, index) => (
              <li key={item}>
                <Reveal delay={stagger(index)} className="h-full">
                  <div
                    className={`${listCard} border-l-2 border-l-accent/60 hover:border-l-accent`}
                  >
                    <Check className={checkIcon} aria-hidden="true" />
                    {item}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {related.length > 0 && (
        <Section id="related" className="pb-24 pt-10 sm:pt-14">
          <Reveal>
            <SectionHeading>More Projects</SectionHeading>
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
