import { LuCheck, LuTag } from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import type { Project } from "@/types";

type ProjectFeaturesSectionProps = {
  project: Project;
};

export function ProjectFeaturesSection({ project }: ProjectFeaturesSectionProps) {
  const detailed = project.detailedFeatures;
  const basic = project.features;

  return (
    <section id="features" className="scroll-mt-28 py-10 sm:py-14">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
            <span className="font-mono text-xs font-bold">03</span>
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-primary">
            Key Features
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
        </div>
      </Reveal>

      {detailed && detailed.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {detailed.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04} className="h-full min-w-0">
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-surface/40 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-surface/80 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8),0_0_20px_rgba(34,211,238,0.1)]">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:border-accent group-hover:bg-accent group-hover:text-background group-hover:shadow-glow">
                      <LuCheck className="size-4" aria-hidden="true" />
                    </span>

                    {item.category && (
                      <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background-secondary/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted transition-colors group-hover:border-accent/30 group-hover:text-secondary">
                        <LuTag className="size-2.5 text-accent/70" aria-hidden="true" />
                        {item.category}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-base font-semibold text-primary transition-colors duration-200 group-hover:text-accent">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {basic.map((feature, index) => (
            <Reveal key={feature} delay={index * 0.03} className="h-full min-w-0">
              <div className="group flex items-start gap-3 rounded-xl border border-border/70 bg-surface/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface/70 hover:shadow-xs">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent transition-transform duration-200 group-hover:scale-115">
                  <LuCheck className="size-3" aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-secondary transition-colors group-hover:text-primary">
                  {feature}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
