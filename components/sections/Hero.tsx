import { LuArrowRight, LuDownload, LuMail, LuSparkles } from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { personal } from "@/data/personal";
import { HeroPortrait } from "./HeroPortrait";
import { TypingRole } from "@/components/animation/TypingRole";

const ROLES = [
  "Full Stack Developer",
  "React 19 & Next.js 16 Specialist",
  "Django REST & Python Architect",
  "Building High-Impact Web Systems",
];

export function Hero() {
  const { github, linkedin } = personal.socials;
  const resumeHref = personal.resumeUrl ?? "";

  return (
    <section
      id="home"
      className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden pt-20 pb-8 lg:py-0"
    >
      {/* Background Cyber-Mesh Grid Pattern with Radial Falloff */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)]"
      />

      {/* Atmospheric Ambient Glowing Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-1/4 -z-10 size-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-1/3 -z-10 size-[500px] -translate-y-1/2 rounded-full bg-blue/10 blur-[140px]"
      />

      <PageContainer className="relative z-20 w-full py-4 sm:py-6 lg:py-0">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12">
          <Stagger className="max-w-3xl">
            {/* Live Status Eyebrow Badge */}
            <StaggerItem>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(16,185,129,0.25)]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span>Open to Engineering Roles & Projects</span>
                <span className="text-emerald-500/40" aria-hidden="true">
                  •
                </span>
                <span className="font-mono text-[11px] text-emerald-300/80">
                  Kathmandu, Nepal
                </span>
              </div>
            </StaggerItem>

            {/* Main Headline */}
            <StaggerItem>
              <h1 className="mt-4 sm:mt-5 text-balance font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                <span className="mb-1.5 block font-mono text-xs sm:text-sm font-medium uppercase tracking-widest text-accent">
                  // Full-Stack Software Engineer
                </span>
                Hi, I&apos;m{" "}
                <span className="bg-linear-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(34,211,238,0.2)]">
                  {personal.name}
                </span>
              </h1>
            </StaggerItem>

            {/* Dynamic Typewriter Role */}
            <StaggerItem>
              <div className="mt-2 sm:mt-2.5 flex items-center min-h-[38px] sm:min-h-[44px]">
                <TypingRole
                  roles={ROLES}
                  className="font-display text-2xl font-semibold text-accent sm:text-3xl lg:text-4xl"
                />
              </div>
            </StaggerItem>

            {/* Professional Value Proposition Narrative */}
            <StaggerItem>
              <p className="mt-3 sm:mt-4 max-w-xl text-sm leading-relaxed text-secondary/90 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                I engineer production-grade web systems and resilient cloud
                architectures — bridging fluid React 19 & Next.js user experiences
                with type-safe APIs in Django and Node.js.
              </p>
            </StaggerItem>

            {/* Action CTA Buttons */}
            <StaggerItem>
              <div className="mt-6 sm:mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Button
                  href="/#projects"
                  size="lg"
                  className="w-full sm:w-auto shadow-[0_0_25px_-5px_rgba(34,211,238,0.35)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] cursor-pointer"
                  data-track="hero_cta_click"
                  data-track-label="view_work"
                >
                  <span>Explore Featured Work</span>
                  <LuArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>

                {resumeHref && (
                  <Button
                    href={resumeHref}
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto cursor-pointer"
                    download
                    data-track="resume_download"
                    data-track-location="hero"
                  >
                    <LuDownload className="size-4" aria-hidden="true" />
                    <span>Download Resume</span>
                  </Button>
                )}
              </div>
            </StaggerItem>

            {/* Social Links & Stack Ribbon */}
            <StaggerItem>
              <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2.5">
                  {github && (
                    <IconButton
                      href={github}
                      label="GitHub"
                      data-track="social_click"
                      data-track-network="github"
                      data-track-location="hero"
                    >
                      <GithubIcon className="size-5" />
                    </IconButton>
                  )}
                  {linkedin && (
                    <IconButton
                      href={linkedin}
                      label="LinkedIn"
                      data-track="social_click"
                      data-track-network="linkedin"
                      data-track-location="hero"
                    >
                      <LinkedinIcon className="size-5" />
                    </IconButton>
                  )}
                  <IconButton
                    href={`mailto:${personal.email}`}
                    label="Email"
                    data-track="social_click"
                    data-track-network="email"
                    data-track-location="hero"
                  >
                    <LuMail className="size-5" aria-hidden="true" />
                  </IconButton>
                </div>

                <span className="h-4 w-px bg-border/80" aria-hidden="true" />

                <div className="flex items-center gap-1.5 text-xs font-mono text-muted">
                  <LuSparkles className="size-3.5 text-accent" aria-hidden="true" />
                  <span>TypeScript • Python • Next.js • Django</span>
                </div>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Hero Portrait Showcase */}
          <Reveal
            delay={0.3}
            y={24}
            className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] lg:justify-self-end"
          >
            <HeroPortrait />
          </Reveal>
        </div>
      </PageContainer>
    </section>
  );
}