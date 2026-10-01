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
            <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-border pt-8 sm:grid-cols-2">
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-medium uppercase tracking-widest text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm text-primary sm:text-base">
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
                  <Card className="h-full">
                    <div className="flex size-10 items-center justify-center rounded-md border border-border bg-background-secondary text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
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