import { LuArrowRight, LuDownload, LuMail } from "react-icons/lu";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { personal } from "@/data/personal";
import { HeroPortrait } from "./HeroPortrait";

export function Hero() {
  const { github, linkedin } = personal.socials;
  const resumeHref = personal.resumeUrl ?? "";

  return (
    <section
      id="home"
      className="relative isolate flex flex-col overflow-x-clip pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-16"
    >
      {/* Subtle Background Grid with Radial Falloff */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)]"
      />

      <PageContainer className="relative z-20 w-full py-4 sm:py-6 lg:py-0">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12">
          <Stagger className="w-full lg:max-w-3xl animate-hero-enter">
            {/* Single Restrained Availability Indicator */}
            <StaggerItem>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>Open to New Opportunities</span>
              </div>
            </StaggerItem>

            {/* Main Headline */}
            <StaggerItem>
              <h1 className="mt-4 sm:mt-5 text-balance font-display text-3xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                Hi, I&apos;m {personal.name}
                <span className="text-accent">.</span>
              </h1>
            </StaggerItem>

            {/* Confident Static Role Subtitle */}
            <StaggerItem>
              <p className="mt-2 sm:mt-2.5 font-display text-lg font-medium text-accent sm:text-2xl lg:text-3xl">
                {personal.role}
              </p>
            </StaggerItem>

            {/* Professional Value Proposition Narrative */}
            <StaggerItem>
              <p className="mt-3 sm:mt-4 w-full lg:max-w-xl text-sm leading-relaxed text-secondary/90 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                I build full-stack web applications and backend services with
                React, Next.js, Django, and Node.js. My focus is on clear
                architecture, dependable APIs, and clean, responsive user interfaces.
              </p>
            </StaggerItem>

            {/* Action CTA Buttons */}
            <StaggerItem>
              <div className="mt-6 sm:mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  href="/#projects"
                  size="lg"
                  className="w-full sm:w-auto cursor-pointer justify-center"
                  data-track="hero_cta_click"
                  data-track-label="view_projects"
                >
                  <span>View Projects</span>
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
                    className="w-full sm:w-auto cursor-pointer justify-center"
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

            {/* Social Links */}
            <StaggerItem>
              <div className="mt-6 sm:mt-7 flex items-center gap-2">
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
            </StaggerItem>
          </Stagger>

          {/* Hero Portrait Showcase */}
          <div className="mx-auto w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[340px] lg:justify-self-end mt-4 lg:mt-0 animate-hero-enter [animation-delay:120ms]">
            <HeroPortrait />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
