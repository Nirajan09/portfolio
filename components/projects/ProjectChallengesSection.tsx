import { LuCircleCheck, LuLightbulb, LuShieldCheck, LuTriangleAlert } from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import type { Project } from "@/types";

type ProjectChallengesSectionProps = {
  project: Project;
};

export function ProjectChallengesSection({ project }: ProjectChallengesSectionProps) {
  const { challenges } = project;

  if (!challenges || challenges.length === 0) return null;

  return (
    <section id="challenges" className="scroll-mt-28 py-10 sm:py-14">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
            <span className="font-mono text-xs font-bold">05</span>
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-primary">
            Engineering Challenges & Solutions
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
        </div>
      </Reveal>

      <div className="mt-8 space-y-6">
        {challenges.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <div className="group/challenge relative overflow-hidden rounded-2xl border border-border/80 bg-surface/40 p-4 sm:p-6 md:p-8 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-surface/75 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.8),0_0_20px_rgba(34,211,238,0.1)]">
              {/* Top hairline accent draw on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-transform duration-500 ease-standard group-hover/challenge:scale-x-100"
              />

              <h3 className="flex items-start sm:items-center gap-2.5 font-display text-base sm:text-lg font-semibold text-primary transition-colors group-hover/challenge:text-accent md:text-xl">
                <span className="flex size-6 shrink-0 mt-0.5 sm:mt-0 items-center justify-center rounded-full bg-accent/15 text-accent text-xs font-mono font-bold transition-all duration-300 group-hover/challenge:scale-110 group-hover/challenge:bg-accent group-hover/challenge:text-background group-hover/challenge:shadow-glow">
                  {index + 1}
                </span>
                <span>{item.title}</span>
              </h3>

              <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
                {/* Challenge description */}
                <div className="rounded-xl border border-border/70 bg-background-secondary/60 p-4 transition-all duration-300 group-hover/challenge:border-amber-500/30 group-hover/challenge:bg-background-secondary/80 sm:p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                    <LuTriangleAlert className="size-3.5" aria-hidden="true" />
                    <span>The Engineering Challenge</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-secondary sm:text-base">
                    {item.challenge}
                  </p>
                </div>

                {/* Solution description */}
                <div className="rounded-xl border border-border/70 bg-background-secondary/60 p-4 transition-all duration-300 group-hover/challenge:border-accent/30 group-hover/challenge:bg-background-secondary/80 sm:p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                    <LuLightbulb className="size-3.5" aria-hidden="true" />
                    <span>The Technical Solution</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-secondary sm:text-base">
                    {item.solution}
                  </p>
                </div>
              </div>

              {/* Outcome / Impact */}
              {item.impact && (
                <div className="mt-4 flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-xs sm:text-sm text-emerald-300 transition-colors duration-300 group-hover/challenge:border-emerald-500/40 group-hover/challenge:bg-emerald-500/10">
                  <LuCircleCheck className="size-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-emerald-200">Outcome:</strong>{" "}
                    {item.impact}
                  </span>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
