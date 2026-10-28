"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { LuArrowUp, LuArrowUpRight, LuFileText, LuMail, LuShieldCheck } from "react-icons/lu";

import { navHref, navItems } from "@/data/navigation";
import { personal } from "@/data/personal";
import { IconButton } from "@/components/ui/IconButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { PrivacyModal } from "@/components/ui/PrivacyModal";
import { PageContainer } from "./PageContainer";

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
      {children}
    </h2>
  );
}

/**
 * Text-roll hover: the label slides up and an accent copy slides in from
 * below. The parent link must have the `group/roll` class.
 */
function Roll({ children }: { children: string }) {
  return (
    <span className="relative inline-block overflow-hidden align-bottom leading-normal">
      <span className="block transition-transform duration-300 ease-standard group-hover/roll:-translate-y-full group-focus-visible/roll:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 block translate-y-full text-accent transition-transform duration-300 ease-standard group-hover/roll:translate-y-0 group-focus-visible/roll:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const { github, linkedin } = personal.socials;

  return (
    <footer className="relative overflow-hidden border-t border-border/80 bg-linear-to-b from-surface/80 via-background-secondary to-background">
      {/* Gradient hairline along the top edge */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
      />

      {/* Atmospheric corner glows */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 -top-28 size-80 rounded-full bg-accent/8 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -right-24 size-80 rounded-full bg-violet/8 blur-3xl"
      />

      <PageContainer className="relative pt-16 pb-6 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_0.8fr_0.9fr] lg:gap-16">
          {/* ---------- Brand Column ---------- */}
          <div>
            <Link
              href={navHref("home")}
              aria-label={`${personal.name}, back to top`}
              className="group relative inline-block rounded-md py-1"
            >
              <span className="font-display text-2xl font-bold tracking-tight text-primary transition-[color,text-shadow] duration-300 ease-standard group-hover:text-accent group-hover:[text-shadow:0_0_18px_rgb(34_211_238/0.45)]">
                {personal.name}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-right scale-x-0 rounded-full bg-linear-to-r from-accent via-blue to-violet transition-[scale] duration-500 ease-standard group-hover:origin-left group-hover:scale-x-100"
              />
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-secondary/90 sm:text-[14.5px]">
              Full Stack Developer specializing in React, Next.js, Django, and
              Node.js. Building reliable web architectures, type-safe APIs, and
              responsive interfaces.
            </p>

            {/* Location & Timezone Indicator (Replaces freelance badge) */}
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-background/50 px-3.5 py-1.5 text-xs font-mono text-secondary">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span>Kathmandu, Nepal · UTC+5:45</span>
            </div>

            {/* Direct Email Link with Roll hover */}
            <div className="mt-6">
              <a
                href={`mailto:${personal.email}`}
                className="group/roll inline-flex items-center gap-2 font-display text-base font-semibold text-primary transition-colors duration-200 hover:text-accent sm:text-lg"
                data-track="social_click"
                data-track-network="email"
                data-track-location="footer"
              >
                <Roll>{personal.email}</Roll>
                <LuArrowUpRight
                  className="size-4 text-muted transition-[translate,color] duration-300 ease-standard group-hover/roll:-translate-y-0.5 group-hover/roll:translate-x-0.5 group-hover/roll:text-accent"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* ---------- Navigation Column ---------- */}
          <nav aria-label="Footer navigation">
            <ColumnHeading>Navigation</ColumnHeading>

            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={navHref(item.id)}
                    className="group/roll inline-block text-sm text-secondary/80 transition-colors hover:text-primary sm:text-[14.5px]"
                  >
                    <Roll>{item.label}</Roll>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Connect Column ---------- */}
          <div>
            <ColumnHeading>Connect</ColumnHeading>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-secondary/80 sm:text-[14.5px]">
              Have a project, opportunity, or technical discussion in mind? Feel free to reach out.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {github && (
                <IconButton
                  href={github}
                  label="GitHub"
                  data-track="social_click"
                  data-track-network="github"
                  data-track-location="footer"
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
                  data-track-location="footer"
                >
                  <LinkedinIcon className="size-5" />
                </IconButton>
              )}

              <IconButton
                href={`mailto:${personal.email}`}
                label="Email"
                data-track="social_click"
                data-track-network="email"
                data-track-location="footer"
              >
                <LuMail className="size-5" aria-hidden="true" />
              </IconButton>

              {personal.resumeUrl && (
                <IconButton
                  href={personal.resumeUrl}
                  label="Resume"
                  data-track="resume_click"
                  data-track-location="footer"
                >
                  <LuFileText className="size-5" aria-hidden="true" />
                </IconButton>
              )}
            </div>
          </div>
        </div>

        {/* ---------- Sub-Footer Bar ---------- */}
        <div className="relative mt-14 flex flex-col gap-4 border-t border-border/70 pt-6 pb-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>
              &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
            <span className="hidden text-border sm:inline" aria-hidden="true">
              •
            </span>
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="group inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-accent underline underline-offset-4 decoration-border hover:decoration-accent cursor-pointer"
            >
              <LuShieldCheck className="size-3.5 text-accent/70 transition-transform group-hover:scale-110" aria-hidden="true" />
              <span>Privacy Policy</span>
            </button>
          </div>

          <div className="flex items-center gap-5 self-start sm:self-auto">
            <span className="hidden font-mono text-[11px] text-muted/60 lg:inline-block">
              Built with Next.js 16 & TailwindCSS
            </span>

            <Link
              href={navHref("home")}
              className="group/roll inline-flex items-center gap-2.5 font-medium text-secondary transition-colors hover:text-primary"
            >
              <Roll>Back to top</Roll>
              <span
                aria-hidden="true"
                className="relative flex size-8 items-center justify-center overflow-hidden rounded-full border border-border bg-surface text-muted transition-[border-color,background-color,color,box-shadow] duration-300 ease-standard group-hover/roll:border-accent group-hover/roll:bg-accent group-hover/roll:text-background group-hover/roll:shadow-glow"
              >
                <LuArrowUp className="size-3.5 transition-transform duration-300 ease-standard group-hover/roll:-translate-y-6" />
                <LuArrowUp className="absolute size-3.5 translate-y-6 transition-transform duration-300 ease-standard group-hover/roll:translate-y-0" />
              </span>
            </Link>
          </div>
        </div>
      </PageContainer>

      {/* Accessible Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </footer>
  );
}