import { Container, Layers, Monitor, Server, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, type AboutHighlightId } from "@/data/about";

const highlightIcons: Record<AboutHighlightId, LucideIcon> = {
  "full-stack": Layers,
  backend: Server,
  frontend: Monitor,
  production: Container,
};

export function About() {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading eyebrow="About" title="Building across the whole stack" />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <Reveal className="max-w-prose space-y-5 text-base leading-relaxed text-secondary sm:text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid gap-x-5 gap-y-1 border-t border-border pt-6 sm:grid-cols-2">
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className={[
                    "group relative -mx-3 rounded-lg px-3 py-3",
                    "transition-colors duration-300 hover:bg-surface/60",
                    // Accent bar that grows down the left edge on hover
                    "before:absolute before:bottom-3 before:left-0 before:top-3 before:w-0.5",
                    "before:origin-top before:scale-y-0 before:rounded-full before:bg-accent",
                    "before:transition-[scale] before:duration-300 before:ease-standard",
                    "group-hover:before:scale-y-100 hover:before:scale-y-100",
                  ].join(" ")}
                >
                  <dt className="text-xs font-medium uppercase tracking-widest text-muted transition-colors duration-300 group-hover:text-accent">
                    {fact.label}
                  </dt>
                  {/* Only the text slides, so the hover area itself never moves */}
                  <dd className="mt-1 text-sm text-primary transition-[translate] duration-300 ease-standard group-hover:translate-x-1 sm:text-base">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:self-start">
          {about.highlights.map((item, index) => {
            const Icon = highlightIcons[item.id];
            return (
              <li key={item.id}>
                <Reveal delay={index * 0.08} className="h-full">
                  <Card interactive className="group relative h-full overflow-hidden">
                    {/* Accent line draws across the top edge */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-[scale] duration-500 ease-standard group-hover:scale-x-100"
                    />
                    {/* Faint index number in the corner */}
                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-4 font-display text-3xl font-bold text-primary/5 transition-colors duration-300 group-hover:text-accent/20"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex size-10 items-center justify-center rounded-md border border-border bg-background-secondary text-accent transition-[scale,border-color,background-color] duration-300 ease-standard group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-secondary">
                      {item.description}
                    </p>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}