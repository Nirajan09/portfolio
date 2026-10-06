import Link from "next/link";
import { ArrowUp, ArrowUpRight, FileText, Mail } from "lucide-react";

import { navHref, navItems } from "@/data/navigation";
import { personal } from "@/data/personal";
import { IconButton } from "@/components/ui/IconButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { PageContainer } from "./PageContainer";

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

      <PageContainer className="relative py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1.2fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Link
              href={navHref("home")}
              className="inline-flex items-center font-display text-xl font-bold tracking-tight text-primary transition-colors duration-200 hover:text-accent"
              aria-label={`${personal.name} — Home`}
            >
              {personal.initials}
              <span className="text-accent">.</span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-muted">
              Full-stack developer focused on building scalable, reliable, and
              user-focused web applications with modern technologies.
            </p>

            <Link
              href={navHref("contact")}
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-[border-color,background-color,color,box-shadow] duration-300 ease-standard hover:border-accent hover:bg-accent hover:text-background hover:shadow-glow"
            >
              Let&apos;s work together
              <ArrowUpRight
                className="size-4 transition-transform duration-300 ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h2 className="font-display text-sm font-semibold text-primary">
              Navigation
            </h2>

            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={navHref(item.id)}
                    className="group inline-flex items-center text-sm text-muted transition-colors duration-200 hover:text-primary focus-visible:text-primary"
                  >
                    {/* Accent dash that slides in on hover */}
                    <span
                      aria-hidden="true"
                      className="mr-0 h-px w-0 bg-linear-to-r from-accent to-blue transition-[width,margin] duration-300 ease-standard group-hover:mr-2 group-hover:w-3 group-focus-visible:mr-2 group-focus-visible:w-3"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h2 className="font-display text-sm font-semibold text-primary">
              Let&apos;s connect
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
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
                <Mail className="size-5" aria-hidden="true" />
              </IconButton>

              {personal.resumeUrl && (
                <IconButton
                  href={personal.resumeUrl}
                  label="Resume"
                  data-track="resume_click"
                  data-track-location="footer"
                >
                  <FileText className="size-5" aria-hidden="true" />
                </IconButton>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {personal.name}. All rights
            reserved.
          </p>

          <Link
            href={navHref("home")}
            className="group inline-flex items-center gap-2 self-start font-medium text-secondary transition-colors duration-200 hover:text-accent sm:self-auto"
          >
            Back to top
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-full border border-border text-muted transition-[border-color,background-color,color] duration-300 ease-standard group-hover:border-accent/50 group-hover:bg-accent group-hover:text-background"
            >
              <ArrowUp className="size-4 transition-transform duration-300 ease-standard group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </PageContainer>
    </footer>
  );
}