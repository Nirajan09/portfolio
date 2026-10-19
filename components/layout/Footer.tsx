import Link from "next/link";
import { LuArrowUp, LuArrowUpRight, LuFileText, LuMail } from "react-icons/lu";
import type { ReactNode } from "react";

import { about } from "@/data/about";
import { navHref, navItems } from "@/data/navigation";
import { personal } from "@/data/personal";
import { IconButton } from "@/components/ui/IconButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { PageContainer } from "./PageContainer";

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xs font-medium uppercase tracking-widest text-muted">
      {children}
    </h2>
  );
}

/**
 * Text-roll hover: the label slides up and an accent copy slides in from
 * below. The parent link must have the `group/roll` class. The duplicate is
 * aria-hidden, so screen readers only read the label once.
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
  const { github, linkedin } = personal.socials;

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background-secondary">
      {/* Gradient hairline along the top edge */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent"
      />

      {/* Soft corner glows */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-accent/10 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 size-72 rounded-full bg-violet/10 blur-3xl"
      />

      <PageContainer className="relative pt-16 md:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_0.7fr_0.9fr] lg:gap-16">
          {/* ---------- Brand ---------- */}
          <div>
            <Link
              href={navHref("home")}
              aria-label={`${personal.name}, back to top`}
              className="group relative inline-block rounded-md py-1"
            >
              <span className="font-display text-2xl font-bold tracking-tight text-primary transition-[color,text-shadow] duration-300 ease-standard group-hover:text-accent group-hover:[text-shadow:0_0_18px_rgb(34_211_238/0.45)]">
                {personal.firstName}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-right scale-x-0 rounded-full bg-linear-to-r from-accent via-blue to-violet transition-[scale] duration-500 ease-standard group-hover:origin-left group-hover:scale-x-100"
              />
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-secondary sm:text-base">
              Full-stack developer focused on building scalable, reliable, and
              user-focused web applications with modern technologies.
            </p>

            {/* Availability */}
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-success/30 bg-success/10 px-3.5 py-1.5">
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

            {/* Email */}
            <a
              href={`mailto:${personal.email}`}
              className="group/roll mt-6 flex w-fit items-center gap-2 font-display text-lg font-semibold text-primary transition-colors duration-200 hover:text-accent sm:text-xl"
              data-track="social_click"
              data-track-network="email"
              data-track-location="footer"
            >
              <Roll>{personal.email}</Roll>
              <LuArrowUpRight
                className="size-5 text-muted transition-[translate,color] duration-300 ease-standard group-hover/roll:-translate-y-0.5 group-hover/roll:translate-x-0.5 group-hover/roll:text-accent"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* ---------- Navigation ---------- */}
          <nav aria-label="Footer navigation">
            <ColumnHeading>Navigation</ColumnHeading>

            <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3.5 sm:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={navHref(item.id)}
                    className="group/roll inline-block text-sm text-muted sm:text-base"
                  >
                    <Roll>{item.label}</Roll>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Connect ---------- */}
          <div>
            <ColumnHeading>Connect</ColumnHeading>

            <p className="mt-6 max-w-xs text-sm leading-6 text-muted sm:text-base">
              Have a project, opportunity, or idea in mind? Feel free to reach
              out.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
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

        {/* ---------- Bottom bar ---------- */}
        <div className="relative mt-14 flex flex-col gap-4 border-t border-border py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <p>
            &copy; {new Date().getFullYear()} {personal.name}. All rights
            reserved.
          </p>

          <Link
            href={navHref("home")}
            className="group/roll inline-flex items-center gap-3 self-start font-medium text-secondary sm:self-auto"
          >
            <Roll>Back to top</Roll>
            <span
              aria-hidden="true"
              className="relative flex size-9 items-center justify-center overflow-hidden rounded-full border border-border text-muted transition-[border-color,background-color,color,box-shadow] duration-300 ease-standard group-hover/roll:border-accent group-hover/roll:bg-accent group-hover/roll:text-background group-hover/roll:shadow-glow"
            >
              {/* Arrow rolls up and out; a new one rolls in from below */}
              <LuArrowUp className="size-4 transition-transform duration-300 ease-standard group-hover/roll:-translate-y-6" />
              <LuArrowUp className="absolute size-4 translate-y-6 transition-transform duration-300 ease-standard group-hover/roll:translate-y-0" />
            </span>
          </Link>
        </div>
      </PageContainer>
    </footer>
  );
}