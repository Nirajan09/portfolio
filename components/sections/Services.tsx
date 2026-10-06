import {
  ArrowUpRight,
  CodeXml,
  Database,
  Globe,
  PanelsTopLeft,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, type ServiceId } from "@/data/services";

const serviceIcons: Record<ServiceId, LucideIcon> = {
  "full-stack": CodeXml,
  backend: Database,
  frontend: PanelsTopLeft,
  "business-websites": Globe,
};

export function Services() {
  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          eyebrow="Services"
          title="How I can help"
          description="Open to freelance and collaboration work. These are the areas where I can be most useful."
        />
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.id];
          return (
            <li key={service.id}>
              <Reveal delay={index * 0.08} className="h-full">
                <Link
                  href="/#contact"
                  aria-label={`Discuss ${service.title}`}
                  className="group block h-full rounded-lg"
                >
                  <Card
                    interactive
                    className="relative flex h-full flex-col overflow-hidden"
                  >
                    {/* Gradient hairline that draws across the top on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-[scale] duration-500 ease-standard group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />

                    {/* Soft corner glow */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-accent/15 opacity-0 blur-2xl transition-opacity duration-500 ease-standard group-hover:opacity-100 group-focus-visible:opacity-100"
                    />

                    {/* Top row: icon tile + index number */}
                    <div className="relative flex items-start justify-between">
                      <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-background-secondary text-accent transition-[border-color,background-color,box-shadow,scale] duration-300 ease-standard group-hover:scale-105 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:shadow-glow">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      {/* <span
                        aria-hidden="true"
                        className="font-display text-sm font-semibold tabular-nums text-muted/60 transition-colors duration-300 group-hover:text-accent"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span> */}
                    </div>

                    <h3 className="relative mt-6 font-display text-lg font-semibold leading-snug text-primary">
                      {service.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>

                    {/* Tech tags */}
                    <ul className="relative mt-5 flex flex-1 flex-wrap content-start gap-1.5">
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-md border border-border bg-background-secondary/70 px-2 py-0.5 text-xs font-medium text-secondary transition-colors duration-300 group-hover:border-accent/30"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    {/* CTA row */}
                    <div className="relative mt-6 flex items-center justify-between border-t border-border pt-4">
                      <span className="text-sm font-medium text-secondary transition-colors duration-200 group-hover:text-accent">
                        Discuss this
                      </span>
                      <span className="flex size-7 items-center justify-center rounded-full border border-border text-muted transition-[border-color,background-color,color] duration-300 ease-standard group-hover:border-accent/50 group-hover:bg-accent group-hover:text-background">
                        <ArrowUpRight
                          className="size-4 transition-transform duration-300 ease-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}