import { LuCircleAlert, LuCircleCheck, LuUsers } from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import type { Project } from "@/types";

type ProjectOverviewSectionProps = {
  project: Project;
};

export function ProjectOverviewSection({ project }: ProjectOverviewSectionProps) {
  return (
    <section id="overview" className="scroll-mt-28 py-10 sm:py-14">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
            <span className="font-mono text-xs font-bold">01</span>
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-primary">
            Project Overview
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
        </div>
      </Reveal>

      {/* Main Narrative / Overview */}
      {project.overview && (
        <Reveal delay={0.05}>
          <p className="mt-6 w-full lg:max-w-3xl text-base sm:text-lg leading-relaxed text-secondary sm:leading-8">
            {project.overview}
          </p>
        </Reveal>
      )}

      {/* Problem & Solution Grid with interactive hover dynamics */}
      {(project.problem || project.solution) && (
        <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-2">
          {project.problem && (
            <Reveal delay={0.1} className="h-full min-w-0">
              <div className="group/problem relative flex h-full flex-col overflow-hidden rounded-2xl border border-rose-500/25 bg-rose-500/5 p-4 sm:p-6 md:p-8 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-rose-500/40 hover:bg-rose-500/10 hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.18)]">
                <div className="flex items-center gap-3 text-rose-400">
                  <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 transition-transform duration-300 group-hover/problem:scale-110 group-hover/problem:-rotate-3">
                    <LuCircleAlert className="size-4.5 sm:size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-semibold text-primary">
                    Problem
                  </h3>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-secondary sm:text-base">
                  {project.problem}
                </p>
              </div>
            </Reveal>
          )}

          {project.solution && (
            <Reveal delay={0.15} className="h-full min-w-0">
              <div className="group/sol relative flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4 sm:p-6 md:p-8 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.18)]">
                <div className="flex items-center gap-3 text-emerald-400">
                  <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 transition-transform duration-300 group-hover/sol:scale-110 group-hover/sol:rotate-3">
                    <LuCircleCheck className="size-4.5 sm:size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-semibold text-primary">
                    Solution
                  </h3>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-secondary sm:text-base">
                  {project.solution}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      )}

      {/* Target Users & Personas with interactive accent indicator */}
      {project.targetAudience && project.targetAudience.length > 0 && (
        <div className="mt-12">
          <Reveal delay={0.2}>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              <LuUsers className="size-3.5 text-accent" aria-hidden="true" />
              <span>Target Users</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.targetAudience.map((user) => (
                <div
                  key={user.role}
                  className="group/persona relative overflow-hidden rounded-xl border border-border/80 bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs"
                >
                  {/* Left accent bar highlight on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 bg-accent scale-y-0 origin-top transition-transform duration-300 group-hover/persona:scale-y-100"
                  />

                  <div className="flex items-center gap-2.5">
                    <span className="size-2 rounded-full bg-accent transition-transform duration-300 group-hover/persona:scale-125" />
                    <h4 className="font-display text-base font-semibold text-primary transition-colors group-hover/persona:text-accent">
                      {user.role}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {user.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}
