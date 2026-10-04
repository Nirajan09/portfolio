import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { personal } from "@/data/personal";
import { HeroPortrait } from "./HeroPortrait";

export function Hero() {
  const { github, linkedin } = personal.socials;

  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh items-center overflow-hidden"
    >
      {/* Content */}
      <PageContainer className="relative z-20 py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <Stagger className="max-w-3xl">
            <StaggerItem>
              <Badge variant="success">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                Available for opportunities
              </Badge>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-8 text-lg text-muted sm:text-xl">Hi, I&apos;m</p>
            </StaggerItem>

            <StaggerItem>
              <h1 className="mt-1 text-balance font-display text-5xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl">
                {personal.name}
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-3 font-display text-2xl font-medium text-secondary sm:text-3xl">
                {personal.role}
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                I build modern web applications across frontend and backend
                systems using React, Next.js, Django and Node.js.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button
                  href="/#projects"
                  size="lg"
                  className="w-full sm:w-auto"
                  data-track="hero_cta_click"
                  data-track-label="view_work"
                >
                  View My Work
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
                <Button
                  href="/#contact"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                  data-track="hero_cta_click"
                  data-track-label="connect"
                >
                  Let&apos;s Connect
                </Button>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8 flex items-center gap-3">
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
                  <Mail className="size-5" aria-hidden="true" />
                </IconButton>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Portrait: below the text on mobile so the headline and buttons stay above the fold */}
          <Reveal
            delay={0.35}
            y={24}
            className="mx-auto w-full max-w-70 sm:max-w-[320px] lg:max-w-100 lg:justify-self-end"
          >
            <HeroPortrait />
          </Reveal>
        </div>
      </PageContainer>
    </section>
  );
}