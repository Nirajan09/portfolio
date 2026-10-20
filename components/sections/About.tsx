import type { IconType } from "react-icons";
import {
  LuBriefcase,
  LuDumbbell,
  LuGraduationCap,
  LuMapPin,
  LuSparkles,
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
        <SectionHeading
          eyebrow="About Me"
          title="Engineering across the entire stack"
          description="Passionate about writing clean, maintainable code and solving complex technical challenges from database schemas to polished interfaces."
        />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
        {/* ---------- Narrative Story ---------- */}
        <Reveal className="max-w-prose space-y-6">
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "text-lg leading-8 text-primary sm:text-xl sm:leading-9 font-medium"
                  : "text-base leading-8 text-secondary/90 sm:text-lg"
              }
            >
              {paragraph}
            </p>
          ))}

          {/* Philosophy Highlight Box */}
          <div className="mt-6 rounded-xl border border-border/80 bg-surface/50 p-4 sm:p-5 backdrop-blur-xs transform-gpu will-change-transform transition-[border-color,box-shadow] duration-200 hover:border-accent/30 hover:shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <LuSparkles className="size-3.5" aria-hidden="true" />
              <span>Core Philosophy</span>
            </div>
            <p className="mt-2 text-sm italic leading-relaxed text-secondary/90">
              &ldquo;Building software that balances engineering rigor under the hood with intuitive elegance on the surface.&rdquo;
            </p>
          </div>
        </Reveal>

        {/* ---------- Profile Credentials Panel ---------- */}
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-surface to-background-secondary p-5 sm:p-7 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-glow">
            {/* Ambient glows */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-accent/10 opacity-40 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-12 size-48 rounded-full bg-violet/10 opacity-30 blur-3xl"
            />
            {/* Hairline along the top edge */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-transparent via-accent/60 to-transparent"
            />

            <div className="relative">
              {/* Professional Status Pill */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 transition-colors duration-200 hover:border-emerald-500/50 hover:bg-emerald-500/15">
                <span className="relative flex size-2">
                  <span
                    aria-hidden="true"
                    className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60"
                  />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-semibold text-emerald-400 sm:text-sm">
                  {about.status}
                </span>
              </div>

              {/* Fact Tiles */}
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {about.facts.map((fact) => {
                  const Icon = factIcons[fact.id];
                  const hasBadge = "badge" in fact && fact.badge;
                  return (
                    <div
                      key={fact.id}
                      className={[
                        "group relative rounded-xl border border-border/70 bg-background/60 p-4 transform-gpu will-change-transform",
                        "transition-[transform,translate,border-color,background-color,box-shadow] duration-200 ease-standard",
                        "hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-elevated/80 hover:shadow-xs",
                        fact.wide ? "sm:col-span-2" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background-secondary text-accent transition-[scale,border-color,background-color] duration-200 ease-standard group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/15">
                          <Icon className="size-4.5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <dt className="text-xs font-medium uppercase tracking-wider text-muted transition-colors duration-200 group-hover:text-accent">
                              {fact.label}
                            </dt>
                            {hasBadge && (
                              <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                                {fact.badge}
                              </span>
                            )}
                          </div>
                          <dd className="mt-1 font-display text-sm font-semibold text-primary sm:text-base">
                            {fact.value}
                          </dd>
                          {"detail" in fact && fact.detail && (
                            <p className="mt-0.5 text-xs text-muted/90 font-mono">
                              {fact.detail}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </dl>

              {/* Engineering Pillars Micro-Row */}
              <div className="mt-5 border-t border-border/70 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Engineering Tenets
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {about.pillars.map((pillar) => (
                    <span
                      key={pillar}
                      className="inline-flex items-center rounded-md border border-border/70 bg-background-secondary/70 px-2.5 py-1 text-xs font-medium text-secondary/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}