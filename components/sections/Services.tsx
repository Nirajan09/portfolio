import {
  ArrowRight,
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
                  <Card interactive className="flex h-full flex-col">
                    <div className="flex size-10 items-center justify-center rounded-md border border-border bg-background-secondary text-accent transition-colors duration-200 group-hover:border-accent/40">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors duration-200 group-hover:text-accent">
                      Discuss this
                      <ArrowRight
                        className="size-4 transition-transform duration-200 ease-standard group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
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