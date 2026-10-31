import { LuCpu, LuLayers } from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import { TechChip } from "@/components/ui/TechChip";
import type { Project } from "@/types";

type ProjectStackSectionProps = {
  project: Project;
};

export function ProjectStackSection({ project }: ProjectStackSectionProps) {
  const groups = project.stackGroups ?? [];

  return (
    <section id="stack" className="scroll-mt-28 py-10 sm:py-14">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
            <span className="font-mono text-xs font-bold">04</span>
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-primary">
            Technology Stack
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
        </div>
      </Reveal>

      {groups.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2">
          {groups.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.05} className="h-full min-w-0">
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-surface/40 p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-surface/75 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.8),0_0_20px_rgba(34,211,238,0.1)]">
                {/* Top hairline accent draw on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-transform duration-500 ease-standard group-hover:scale-x-100"
                />

                <div>
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <span className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-primary transition-colors group-hover:text-accent">
                      <LuLayers className="size-3.5 text-accent transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
                      {group.label}
                    </span>
                    <span className="rounded-full bg-surface-elevated px-2 py-0.5 font-mono text-[11px] text-muted transition-colors group-hover:bg-accent/15 group-hover:text-accent font-semibold">
                      {group.items.length} tools
                    </span>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((tech) => (
                      <TechChip key={tech} name={tech} />
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <Reveal>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <TechChip key={tech} name={tech} />
              ))}
            </ul>
          </Reveal>
        </div>
      )}
    </section>
  );
}
