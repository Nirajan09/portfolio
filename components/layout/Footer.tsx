"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { memo, useCallback, useEffect, useState, type ReactNode } from "react";
import {
  LuArrowUp,
  LuCheck,
  LuClock,
  LuCopy,
  LuFileText,
  LuMail,
  LuShieldCheck,
} from "react-icons/lu";

import { navHref } from "@/data/navigation";
import { personal } from "@/data/personal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { PageContainer } from "./PageContainer";

// Lazy-load the heavy Privacy Modal only when requested by the user
const PrivacyModal = dynamic(
  () => import("@/components/ui/PrivacyModal").then((mod) => mod.PrivacyModal),
  { ssr: false }
);

// Cache formatter to avoid instantiating Intl.DateTimeFormat every second
const kathmanduTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kathmandu",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
      {children}
    </h2>
  );
}

export const Footer = memo(function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState<string>("");
  const [showTimeDetails, setShowTimeDetails] = useState(false);
  const [userOffsetMsg, setUserOffsetMsg] = useState<string>("");

  const { github, linkedin } = personal.socials;

  useEffect(() => {
    const updateTime = () => {
      setTimeString(kathmanduTimeFormatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Calculate relative timezone difference compared to visitor's device
    try {
      const visitorOffsetMinutes = -new Date().getTimezoneOffset();
      const nepalOffsetMinutes = 345; // UTC+5:45
      const diffMinutes = nepalOffsetMinutes - visitorOffsetMinutes;
      if (diffMinutes === 0) {
        setUserOffsetMsg("Same timezone as you");
      } else if (diffMinutes > 0) {
        const hours = Math.floor(diffMinutes / 60);
        const mins = diffMinutes % 60;
        setUserOffsetMsg(`+${hours}h ${mins ? `${mins}m ` : ""}ahead of you`);
      } else {
        const hours = Math.floor(Math.abs(diffMinutes) / 60);
        const mins = Math.abs(diffMinutes) % 60;
        setUserOffsetMsg(`-${hours}h ${mins ? `${mins}m ` : ""}behind you`);
      }
    } catch {
      setUserOffsetMsg("Nepal Standard Time (UTC+5:45)");
    }

    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleHomeClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (window.location.pathname === "/") {
        e.preventDefault();
        scrollToTop();
      }
    },
    [scrollToTop]
  );

  return (
    <footer className="relative overflow-hidden border-t border-border/80 bg-linear-to-b from-surface/90 via-background-secondary to-background pt-12 pb-8 md:pt-14 md:pb-9">
      {/* Top Hairline Accent Gradient Beam */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
      />

      {/* Atmospheric Ambient Glows */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-accent/6 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-24 size-80 rounded-full bg-violet/6 blur-3xl"
      />

      <PageContainer className="relative">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-14">
          {/* ================= Brand & Overview Column ================= */}
          <div className="w-full md:max-w-xl">
            <Link
              href={navHref("home")}
              aria-label={`${personal.name}, back to top`}
              onClick={handleHomeClick}
              className="group inline-flex items-baseline gap-1"
            >
              <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-primary transition-all duration-300 group-hover:text-accent">
                {personal.name}
              </span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-accent">.</span>
            </Link>

            <p className="mt-3 text-sm sm:text-[14.5px] leading-relaxed text-secondary/90">
              Building scalable web applications, secure backend APIs, and modern user interfaces with React, Next.js, Django, and Node.js.
            </p>

            {/* Interactive Location & Live Kathmandu Time Badge */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowTimeDetails((prev) => !prev)}
                title="Click to toggle timezone & relative offset"
                className="group/time inline-flex max-w-full min-w-0 items-center gap-2 rounded-xl border border-border/80 bg-surface/60 px-3.5 py-1.5 text-xs font-mono text-secondary backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:text-primary hover:shadow-[0_0_16px_-3px_rgba(52,211,153,0.25)] cursor-pointer active:scale-95"
              >
                {/* Radar Pulse Beacon */}
                <span className="relative flex size-2 shrink-0">
                  <span
                    aria-hidden="true"
                    className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60"
                  />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>

                <LuClock
                  className="size-3.5 shrink-0 text-muted transition-transform duration-300 group-hover/time:rotate-45 group-hover/time:text-emerald-400"
                  aria-hidden="true"
                />

                {!showTimeDetails ? (
                  <span className="truncate max-w-[calc(100vw-6.5rem)] sm:max-w-none text-left">
                    Kathmandu, Nepal ·{" "}
                    <span className="text-primary font-medium tabular-nums">
                      {timeString ? `${timeString} NPT` : "UTC+5:45"}
                    </span>
                  </span>
                ) : (
                  <span className="truncate max-w-[calc(100vw-6.5rem)] sm:max-w-none text-left text-emerald-400 font-medium">
                    UTC+5:45 (NPT) · {userOffsetMsg || "Nepal Standard Time"}
                  </span>
                )}
              </button>
            </div>

            {/* Direct Email with Quick-Copy */}
            <div className="mt-4 flex max-w-md min-w-0 items-center justify-between gap-2.5 rounded-xl border border-border/80 bg-surface/60 p-1.5 pl-3 text-xs font-mono text-secondary transition-all hover:border-accent/40">
              <a
                href={`mailto:${personal.email}`}
                className="min-w-0 flex-1 truncate font-medium text-primary hover:text-accent transition-colors"
                title="Send email directly"
              >
                {personal.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex shrink-0 items-center gap-1 rounded-lg border border-border/80 bg-background/80 px-2.5 py-1 text-[11px] font-sans font-medium text-muted hover:border-accent/40 hover:bg-accent/10 hover:text-accent transition-all cursor-pointer active:scale-95"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <LuCheck className="size-3 text-emerald-400 stroke-3 animate-in zoom-in-75 duration-200" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <LuCopy className="size-3 transition-transform duration-200" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ================= Connect Column (Icon-Only Buttons) ================= */}
          <div className="md:max-w-xs">
            <ColumnHeading>Connect</ColumnHeading>

            <p className="mt-3.5 text-sm sm:text-[14.5px] leading-relaxed text-secondary/80">
              Have a project, engineering opportunity, or technical discussion in mind? Connect directly:
            </p>

            {/* Horizontal Row of Interactive Icon Buttons */}
            <div className="mt-4 flex items-center gap-2.5">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  title="GitHub"
                  className="group flex size-10 items-center justify-center rounded-xl border border-border/80 bg-surface/60 text-secondary transition-all duration-200 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:text-primary hover:shadow-[0_4px_16px_rgba(255,255,255,0.1)]"
                >
                  <GithubIcon className="size-4.5 transition-transform duration-200 group-hover:scale-110" />
                </a>
              )}

              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                  className="group flex size-10 items-center justify-center rounded-xl border border-border/80 bg-surface/60 text-secondary transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_4px_16px_rgba(59,130,246,0.2)]"
                >
                  <LinkedinIcon className="size-4.5 transition-transform duration-200 group-hover:scale-110" />
                </a>
              )}

              {personal.resumeUrl && (
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download or view Resume"
                  title="Resume (PDF)"
                  className="group flex size-10 items-center justify-center rounded-xl border border-border/80 bg-surface/60 text-secondary transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400 hover:shadow-[0_4px_16px_rgba(52,211,153,0.2)]"
                >
                  <LuFileText className="size-4.5 transition-transform duration-200 group-hover:scale-110" />
                </a>
              )}

              <a
                href={`mailto:${personal.email}`}
                aria-label="Send direct email"
                title="Send Email"
                className="group flex size-10 items-center justify-center rounded-xl border border-border/80 bg-surface/60 text-secondary transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-[0_4px_16px_rgba(34,211,238,0.2)]"
              >
                <LuMail className="size-4.5 transition-transform duration-200 group-hover:scale-110" />
              </a>
            </div>

            <p className="mt-3.5 font-mono text-[11px] text-muted">
              Response time: &lt; 24 hours
            </p>
          </div>
        </div>

        {/* ================= Sub-Footer Bar ================= */}
        <div className="relative mt-10 md:mt-12 flex flex-col gap-3.5 border-t border-border/70 pt-5 text-xs sm:text-sm text-secondary sm:flex-row sm:items-center sm:justify-between min-w-0">
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 min-w-0">
            <p className="font-medium text-secondary/90 break-words">
              &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
            <span className="hidden text-border sm:inline" aria-hidden="true">
              •
            </span>
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="group inline-flex items-center gap-1.5 font-medium text-secondary/80 hover:text-accent transition-colors underline underline-offset-4 decoration-border/80 hover:decoration-accent cursor-pointer"
            >
              <LuShieldCheck className="size-3.5 text-accent transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
              <span>Privacy Policy</span>
            </button>
          </div>

          <div className="flex items-center gap-4 self-start sm:self-auto">
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/60 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface hover:text-primary hover:shadow-xs cursor-pointer active:scale-95"
            >
              <span>Back to top</span>
              <LuArrowUp className="size-3.5 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-accent" />
            </button>
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
});