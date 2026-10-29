import { LuArrowRight, LuMail } from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          eyebrow="What I Offer"
          title="Services"
          description="I build reliable web applications, backend APIs, and modern user interfaces tailored to real-world needs."
        />
      </Reveal>

      {/* 1x3 Clean Services Grid (3 columns on desktop) */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 0.08} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>

      {/* High-Impact Project CTA Banner */}
      <Reveal delay={0.2} className="mt-14 sm:mt-16">
        <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-linear-to-b from-surface/90 via-surface/60 to-background-secondary/90 p-6 sm:p-8 md:p-10 text-center backdrop-blur-md">
          {/* Top hairline accent gradient */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
          />

          {/* Ambient background glow orb */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-30"
            style={{
              background:
                "radial-gradient(450px circle at 50% 0%, rgb(34 211 238 / 0.15), transparent 70%)",
            }}
          />

          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-medium text-emerald-400">
            <span
              className="size-1.5 rounded-full bg-emerald-400 animate-pulse"
              aria-hidden="true"
            />
            <span>Available for New Projects</span>
          </div>

          <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Have a project in mind?
          </h3>
          <p className="mx-auto mt-2.5 max-w-lg text-sm sm:text-base text-secondary/90 leading-relaxed">
            Let&apos;s discuss how I can help bring your idea to life — from technical architecture to production deployment.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 max-w-md mx-auto sm:max-w-none">
            <Button
              href="/#contact"
              size="lg"
              className="w-full sm:w-auto shadow-[0_0_25px_-5px_rgba(34,211,238,0.35)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] cursor-pointer justify-center"
              data-track="services_cta_click"
              data-track-label="discuss_project"
            >
              <span>Discuss Your Project</span>
              <LuArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
            <Button
              href={`mailto:${personal.email}`}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto cursor-pointer justify-center min-w-0"
              data-track="services_email_click"
              data-track-label="email_direct"
            >
              <LuMail className="size-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{personal.email}</span>
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}