import type { IconType } from "react-icons";
import {
  LuBriefcase,
  LuDumbbell,
  LuGraduationCap,
  LuMapPin,
} from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, type AboutFactId } from "@/data/about";

const factIcons: Record<AboutFactId, IconType> = {
  current: LuBriefcase,
  education: LuGraduationCap,
  location: LuMapPin,
  outside: LuDumbbell,
};

export function About() {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading eyebrow="About" title="Building across the whole stack" />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
        {/* ---------- Story ---------- */}
       <Reveal className="max-w-prose space-y-6">
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "text-lg leading-8 text-primary sm:text-xl sm:leading-9"
                  : "text-base leading-8 text-secondary sm:text-lg"
              }
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        {/* ---------- Profile panel ---------- */}
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-linear-to-br from-surface to-background-secondary p-5 sm:p-6">
            {/* Ambient glows */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-accent/10 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-12 size-48 rounded-full bg-violet/10 blur-3xl"
            />
            {/* Hairline along the top edge */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent"
            />

            <div className="relative">
              {/* Availability pill */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-success/30 bg-success/10 px-3.5 py-1.5">
                <span className="relative flex size-2">
                  <span
                    aria-hidden="true"
                    className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60"
                  />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                <span className="text-xs font-medium text-success sm:text-sm">
                  {about.status}
                </span>
              </div>

              {/* Fact tiles */}
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {about.facts.map((fact) => {
                  const Icon = factIcons[fact.id];
                  return (
                    <div
                      key={fact.id}
                      className={[
                        "group relative rounded-xl border border-border bg-background/50 p-4",
                        "transition-[translate,border-color,background-color] duration-300 ease-standard",
                        "hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-elevated/70",
                        fact.wide ? "sm:col-span-2" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background-secondary text-accent transition-[scale,border-color,background-color] duration-300 ease-standard group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10">
                          <Icon className="size-4" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <dt className="text-xs font-medium uppercase tracking-widest text-muted transition-colors duration-300 group-hover:text-accent">
                            {fact.label}
                          </dt>
                          <dd className="mt-1 text-sm leading-snug text-primary sm:text-base">
                            {fact.value}
                          </dd>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}