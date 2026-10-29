"use client";

import { memo, useCallback, useState } from "react";
import {
  LuArrowUpRight,
  LuCheck,
  LuCopy,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";

import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { personal } from "@/data/personal";

export const Contact = memo(function Contact() {
  const [copied, setCopied] = useState(false);
  const { github, linkedin } = personal.socials;

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <Section id="contact" className="relative">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1.3fr] lg:gap-14">
        {/* ================= Left Column: Contact Hub ================= */}
        <div className="flex flex-col justify-between">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Get In Touch"
                title="Let's build something exceptional"
                description="Have a project in mind, an engineering role to discuss, or a technical challenge to solve? Send a message or connect directly."
              />
            </Reveal>

            {/* Primary Email Hero Card */}
            <Reveal delay={0.1}>
              <div className="group relative mt-8 overflow-hidden rounded-2xl border border-border/80 bg-linear-to-b from-surface/90 via-surface/60 to-background-secondary/90 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:shadow-[0_16px_40px_-15px_rgba(0,0,0,0.85),0_0_25px_-5px_rgba(34,211,238,0.18)]">
                {/* Hairline top gradient */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-[scale] duration-500 ease-standard group-hover:scale-x-100"
                />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background-secondary text-accent transition-all duration-300 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent/15 group-hover:shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)]">
                      <LuMail className="size-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                        Primary Inbox
                      </span>
                      <a
                        href={`mailto:${personal.email}`}
                        className="block truncate font-mono text-sm sm:text-base font-medium text-primary hover:text-accent transition-colors"
                        title="Click to email directly"
                      >
                        {personal.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex shrink-0 items-center justify-center gap-1.5 self-start sm:self-auto rounded-xl border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-medium text-secondary transition-all hover:border-accent/40 hover:bg-accent/15 hover:text-accent cursor-pointer active:scale-95"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <LuCheck className="size-3.5 text-emerald-400 stroke-3 animate-in zoom-in-75 duration-200" />
                        <span className="text-emerald-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <LuCopy className="size-3.5 text-muted" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Status Bar */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3.5 text-xs text-muted">
                  <div className="inline-flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                    <span className="text-secondary/90 font-medium">Available for opportunities</span>
                  </div>
                  <span className="font-mono text-[11px] text-muted">Response &lt; 24h</span>
                </div>
              </div>
            </Reveal>

            {/* Secondary Direct Channels: Balanced 2x2 Grid */}
            <Reveal delay={0.15}>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Direct Phone */}
                <a
                  href={`tel:${personal.phone.replace(/-/g, "")}`}
                  className="group flex items-center justify-between rounded-xl border border-border/80 bg-surface/50 p-3.5 backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface/80 hover:text-primary"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background-secondary text-muted transition-colors group-hover:text-accent group-hover:border-accent/40">
                      <LuPhone className="size-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">Phone</span>
                      <span className="block truncate text-xs sm:text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                        {personal.phone}
                      </span>
                    </div>
                  </div>
                  <LuArrowUpRight className="size-4 text-muted shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-surface/50 p-3.5 backdrop-blur-xs">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background-secondary text-muted">
                    <LuMapPin className="size-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">Location</span>
                    <span className="block truncate text-xs sm:text-sm font-medium text-secondary">
                      {personal.location}
                    </span>
                  </div>
                </div>

                {/* GitHub */}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="social_click"
                    data-track-network="github"
                    data-track-location="contact"
                    className="group flex items-center justify-between rounded-xl border border-border/80 bg-surface/50 p-3.5 backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-surface/80 hover:text-primary"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background-secondary text-muted transition-colors group-hover:text-primary group-hover:border-white/40">
                        <GithubIcon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">Code</span>
                        <span className="block truncate text-xs sm:text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                          GitHub Profile
                        </span>
                      </div>
                    </div>
                    <LuArrowUpRight className="size-4 text-muted shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                )}

                {/* LinkedIn */}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="social_click"
                    data-track-network="linkedin"
                    data-track-location="contact"
                    className="group flex items-center justify-between rounded-xl border border-border/80 bg-surface/50 p-3.5 backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-surface/80 hover:text-blue-400"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background-secondary text-muted transition-colors group-hover:text-blue-400 group-hover:border-blue-500/40">
                        <LinkedinIcon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">Network</span>
                        <span className="block truncate text-xs sm:text-sm font-medium text-secondary group-hover:text-blue-400 transition-colors">
                          LinkedIn Profile
                        </span>
                      </div>
                    </div>
                    <LuArrowUpRight className="size-4 text-muted shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-400" />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ================= Right Column: Elevated Contact Form Card ================= */}
        <Reveal delay={0.2}>
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-linear-to-b from-surface/90 via-surface/60 to-background-secondary/90 p-5 sm:p-8 backdrop-blur-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85),0_0_25px_-5px_rgba(34,211,238,0.12)]">
            {/* Top hairline gradient */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-accent via-blue to-violet"
            />

            {/* Soft ambient corner glow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-accent/8 blur-3xl"
            />

            <div className="relative">
              <ContactForm fallbackEmail={personal.email} />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
});