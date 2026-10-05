import { LayoutTemplate, ServerCog, Wrench, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups, type SkillGroupId } from "@/data/skills";

const groupIcons: Record<SkillGroupId, LucideIcon> = {
  frontend: LayoutTemplate,
  backend: ServerCog,
  tools: Wrench,
};

export function Skills() {
  return (
    <Section id="skills">
      <Reveal>
        <SectionHeading
          eyebrow="Skills"
          title="My toolkit"
          description="Technologies I use to design, build and ship web applications."
        />
      </Reveal>

      <ul className="mt-12 grid gap-4 lg:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = groupIcons[group.id];
          return (
            <li key={group.id}>
              <Reveal delay={index * 0.1} className="h-full">
                <Card className="group relative h-full overflow-hidden transition-colors duration-300 hover:border-accent/30">
                  {/* Accent line draws across the top edge on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-[scale] duration-500 ease-standard group-hover:scale-x-100"
                  />

                  <div className="flex items-center gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-background-secondary text-accent transition-[scale,border-color,background-color] duration-300 ease-standard group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-primary">
                        {group.title}
                      </h3>
                      <p className="text-sm text-muted">
                        {group.skills.length} technologies
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      // The li is the stable hover target; only the inner pill
                      // moves, so there is no flicker at its edges.
                      <li key={skill} className="group/chip">
                        <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background-secondary/70 px-3 py-1.5 text-sm font-medium text-secondary transition-[translate,border-color,background-color,color] duration-200 ease-standard group-hover/chip:-translate-y-0.5 group-hover/chip:border-accent/50 group-hover/chip:bg-accent/10 group-hover/chip:text-primary">
                          <span className="size-1.5 rounded-full bg-accent/60 transition-[scale,background-color] duration-200 group-hover/chip:scale-150 group-hover/chip:bg-accent" />
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}