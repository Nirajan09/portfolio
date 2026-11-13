import { LuGitCommitHorizontal, LuLayers, LuNetwork } from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import { TechChip } from "@/components/ui/TechChip";
import type { Project } from "@/types";

type ProjectArchitectureSectionProps = {
  project: Project;
};

export function ProjectArchitectureSection({ project }: ProjectArchitectureSectionProps) {
  const { architecture, workflow } = project;

  if (!architecture) return null;

  return (
    <section id="architecture" className="scroll-mt-28 py-10 sm:py-14">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
            <span className="font-mono text-xs font-bold">02</span>
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-primary">
            System Architecture
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
        </div>
      </Reveal>

      {/* Architecture Style Badge & Summary */}
      <Reveal delay={0.05}>
        <div className="mt-6 rounded-2xl border border-accent/30 bg-linear-to-br from-surface to-background-secondary p-4 sm:p-7 md:p-8 backdrop-blur-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent shadow-xs">
              <LuNetwork className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{architecture.style}</span>
            </span>
          </div>

          <p className="mt-4 w-full lg:max-w-3xl text-sm sm:text-base leading-relaxed text-secondary sm:text-lg">
            {architecture.summary}
          </p>
        </div>
      </Reveal>

      {/* Multi-Tier Architecture Diagram Layers */}
      {architecture.layers && architecture.layers.length > 0 && (
        <div className="mt-10">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              <LuLayers className="size-3.5 text-accent" aria-hidden="true" />
              <span>Architectural Layers</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {architecture.layers.map((layer, index) => (
                <div
                  key={layer.title}
                  className="group/layer relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-surface/50 p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-surface/80 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.8),0_0_20px_rgba(34,211,238,0.1)]"
                >
                  {/* Top hairline draw on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-transform duration-500 ease-standard group-hover/layer:scale-x-100"
                  />

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent transition-colors duration-200 group-hover/layer:text-accent-hover">
                        {layer.layer}
                      </span>
                      <span className="font-mono text-xs text-muted/60 transition-colors duration-200 group-hover/layer:text-accent group-hover/layer:font-bold">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-base sm:text-lg font-semibold text-primary transition-colors duration-200 group-hover/layer:text-accent">
                      {layer.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-secondary">
                      {layer.description}
                    </p>
                  </div>

                  {/* Technology badges for this layer */}
                  <div className="mt-5 border-t border-border/60 pt-4">
                    <ul className="flex flex-wrap gap-1.5">
                      {layer.technologies.map((tech) => (
                        <TechChip key={tech} name={tech} />
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      )}

      {/* Step-by-Step Technical Workflow with interactive hover */}
      {workflow && workflow.length > 0 && (
        <div className="mt-12">
          <Reveal delay={0.15}>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted mb-6">
              <LuGitCommitHorizontal className="size-3.5 text-accent" aria-hidden="true" />
              <span>Application Workflow</span>
            </div>

            <div className="relative space-y-4 before:absolute before:left-4 before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-linear-to-b before:from-accent before:via-blue before:to-border sm:before:left-5">
              {workflow.map((item) => (
                <div
                  key={item.step}
                  className="group/step relative flex items-start gap-3 sm:gap-4 rounded-xl border border-border/70 bg-surface/40 p-3.5 pl-10 sm:pl-14 sm:p-5 transition-all duration-300 hover:translate-x-1.5 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs min-w-0"
                >
                  {/* Step bullet node that reacts on card hover */}
                  <div className="absolute left-4 top-4.5 sm:left-5 sm:top-5 flex size-5 -translate-x-1/2 items-center justify-center rounded-full border border-accent bg-background text-[11px] font-bold text-accent shadow-[0_0_8px_var(--color-accent)] transition-all duration-300 group-hover/step:scale-125 group-hover/step:bg-accent group-hover/step:text-background group-hover/step:shadow-[0_0_12px_var(--color-accent)]">
                    {item.step}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm sm:text-base font-semibold text-primary transition-colors duration-200 group-hover/step:text-accent">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}
