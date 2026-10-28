import { LuArrowLeft, LuArrowRight, LuArrowUpRight, LuLayoutGrid } from "react-icons/lu";
import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/types";
import { ProjectCover } from "./ProjectCover";

type ProjectNavigationProps = {
  currentProject: Project;
  prevProject: Project | null;
  nextProject: Project | null;
  relatedProjects: readonly Project[];
};

export function ProjectNavigation({
  currentProject,
  prevProject,
  nextProject,
  relatedProjects,
}: ProjectNavigationProps) {
  return (
    <div className="pt-10 pb-20 sm:pt-14 sm:pb-28">
      {/* ---------- Prev / Next Pagination Bar ---------- */}
      <Reveal>
        <div className="grid gap-4 sm:grid-cols-2 border-t border-border/80 pt-10">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group relative overflow-hidden flex flex-col justify-between rounded-xl border border-border/70 bg-surface/40 p-5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-surface/75 hover:shadow-glow"
            >
              {/* Top hairline accent draw on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-transform duration-500 ease-standard group-hover:scale-x-100"
              />

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted group-hover:text-accent">
                <LuArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-2" />
                <span>Previous Case Study</span>
              </div>
              <div className="mt-3">
                <p className="font-display text-lg font-semibold text-primary transition-colors duration-200 group-hover:text-accent sm:text-xl">
                  {prevProject.title}
                </p>
                {prevProject.category && (
                  <p className="mt-1 text-xs text-secondary/80">
                    {prevProject.category}
                  </p>
                )}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group relative overflow-hidden flex flex-col justify-between rounded-xl border border-border/70 bg-surface/40 p-5 text-right transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-surface/75 hover:shadow-glow sm:text-right"
            >
              {/* Top hairline accent draw on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-right scale-x-0 bg-linear-to-l from-accent via-blue to-violet transition-transform duration-500 ease-standard group-hover:scale-x-100"
              />

              <div className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-wider text-muted group-hover:text-accent">
                <span>Next Case Study</span>
                <LuArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-2" />
              </div>
              <div className="mt-3">
                <p className="font-display text-lg font-semibold text-primary transition-colors duration-200 group-hover:text-accent sm:text-xl">
                  {nextProject.title}
                </p>
                {nextProject.category && (
                  <p className="mt-1 text-xs text-secondary/80">
                    {nextProject.category}
                  </p>
                )}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </Reveal>

      {/* ---------- Collaboration CTA Card ---------- */}
      <Reveal delay={0.1}>
        <div className="relative mt-12 overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-surface to-background-secondary p-8 sm:p-12 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8),0_0_30px_rgba(34,211,238,0.1)]">
          {/* Ambient light glow */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 size-60 rounded-full bg-accent/10 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-16 size-60 rounded-full bg-violet/10 blur-3xl"
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                Let&apos;s Build Together
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                Need a full-stack engineer for your next project?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-secondary">
                Whether you need scalable cloud architectures, complex APIs, or polished web applications, I&apos;m ready to collaborate.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="/#contact" size="lg" className="hover:scale-[1.02] active:scale-[0.98]">
                <span>Start a conversation</span>
                <LuArrowUpRight className="size-4" aria-hidden="true" />
              </Button>
              <Button href="/#projects" variant="secondary" size="lg" className="hover:scale-[1.02] active:scale-[0.98]">
                <LuLayoutGrid className="size-4" />
                <span>All projects</span>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---------- More Related Projects Grid ---------- */}
      {relatedProjects.length > 0 && (
        <div className="mt-16">
          <Reveal delay={0.15}>
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <h3 className="font-display text-xl font-bold text-primary sm:text-2xl">
                Explore Other Case Studies
              </h3>
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition-colors hover:underline"
              >
                <span>View all projects</span>
                <LuArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {relatedProjects.map((item) => (
                <Link
                  key={item.slug}
                  href={`/projects/${item.slug}`}
                  aria-label={`View project: ${item.title}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border/80 bg-surface/50 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-surface/80 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8),0_0_25px_rgba(34,211,238,0.12)]"
                >
                  <ProjectCover project={item} zoom className="border-b border-border/70" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      {item.category && (
                        <span className="font-medium text-accent">
                          {item.category}
                        </span>
                      )}
                      {item.status && (
                        <span className="text-[11px] text-muted">
                          {item.status}
                        </span>
                      )}
                    </div>
                    <h4 className="mt-2 font-display text-xl font-semibold text-primary transition-colors duration-200 group-hover:text-accent">
                      {item.title}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-secondary">
                      {item.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-transform duration-200 group-hover:translate-x-1.5">
                      <span>Read case study</span>
                      <LuArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}
