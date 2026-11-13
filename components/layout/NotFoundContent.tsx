"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  LuCheck,
  LuCompass,
  LuCopy,
  LuFileCode,
  LuHouse,
  LuLayers,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/PageContainer";
import { personal } from "@/data/personal";

export function NotFoundContent() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Lock viewport to 100vh/100dvh with zero scrollbar
    document.body.classList.add("not-found-active");

    return () => {
      document.body.classList.remove("not-found-active");
    };
  }, []);

  const handleCopyRoute = useCallback(async () => {
    if (typeof window !== "undefined" && pathname) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
      }
    }
  }, [pathname]);

  return (
    <div className="relative flex h-screen h-dvh w-full flex-col justify-between overflow-hidden py-4 sm:py-6 select-none">
      {/* ---------- Ambient Atmospheric Light & Glow Rings ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 size-[360px] sm:size-[540px] md:size-[720px] rounded-full bg-linear-to-tr from-accent/15 via-blue/10 to-violet/15 blur-3xl"
      />

      {/* Cyber radar concentric orbit rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 size-[280px] sm:size-[440px] md:size-[620px] rounded-full border border-border/40 opacity-40 animate-[spin_60s_linear_infinite]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 size-[380px] sm:size-[580px] md:size-[800px] rounded-full border border-dashed border-accent/20 opacity-30 animate-[spin_90s_linear_infinite_reverse]"
      />

      {/* ================= TOP ROW: Matching Navbar Brand Header ================= */}
      <PageContainer className="relative z-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-12 sm:h-14 items-center justify-between"
        >
          {/* Logo matching Navbar identically */}
          <Link
            href="/"
            aria-label={`${personal.name}, back to top`}
            className="group font-display text-xl font-bold tracking-tight text-primary focus-visible:outline-hidden"
            data-track="nav_click"
            data-track-target="home"
            data-track-location="404_logo"
          >
            {personal.firstName}
            <span
              className={cn(
                "ml-2 inline-block origin-bottom text-accent",
                "transition-[scale,filter] duration-300 ease-standard",
                "group-hover:scale-125 group-hover:drop-shadow-[0_0_6px_rgb(34_211_238/0.8)]",
                "group-focus-visible:scale-125 group-focus-visible:drop-shadow-[0_0_6px_rgb(34_211_238/0.8)]",
              )}
            >
              .
            </span>
          </Link>

          {/* Live Diagnostics Beacon */}
          <div className="flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3 py-1 font-mono text-[11px] sm:text-xs text-muted backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
            </span>
            <span className="hidden sm:inline">STATUS:</span>
            <span className="font-semibold text-rose-400">404 // NOT_FOUND</span>
          </div>
        </motion.div>
      </PageContainer>

      {/* ================= CENTER ROW: Holographic 404 Hero ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center justify-center text-center my-auto"
      >
        {/* Monospace Route Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-mono font-medium text-accent shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)] backdrop-blur-md">
          <LuCompass className="size-3.5 text-accent animate-spin [animation-duration:15s]" />
          <span>ROUTE_UNRESOLVED // SIGNAL_LOST</span>
        </div>

        {/* Hero 404 Visual Number Display with Animated Laser Sweep */}
        <div className="relative mt-2 sm:mt-3 flex items-center justify-center">
          <div className="relative select-none font-display text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter leading-none bg-linear-to-b from-primary via-accent to-blue bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(34,211,238,0.3)]">
            404
          </div>

          {/* Interactive Laser Scanning Beam */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent animate-[laser-scan_3.2s_ease-in-out_infinite]"
          />
        </div>

        {/* Title */}
        <h1 className="mt-2 sm:mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary">
          Page Lost in Cyberspace
        </h1>

        {/* Narrative Description */}
        <p className="mt-2 max-w-md text-xs sm:text-sm md:text-base leading-relaxed text-secondary/90">
          The coordinate you attempted to reach doesn&apos;t exist, has been
          relocated, or is temporarily offline. Let&apos;s get you back to safe
          ground.
        </p>

        {/* Interactive Target Diagnostics Chip with Rich Hover & Click-to-Copy */}
        {mounted && pathname && (
          <button
            type="button"
            onClick={handleCopyRoute}
            title="Click to copy route URL"
            className="group/target mt-3.5 inline-flex max-w-full items-center gap-2 rounded-lg border border-border/80 bg-surface/80 px-3.5 py-1.5 font-mono text-[11px] text-muted backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface hover:text-secondary hover:shadow-[0_0_20px_-3px_rgba(34,211,238,0.35)] active:scale-95 cursor-pointer"
          >
            <LuFileCode className="size-3.5 shrink-0 text-accent transition-transform duration-300 group-hover/target:scale-115 group-hover/target:text-accent" />
            <span className="truncate">
              Target:{" "}
              <span className="text-secondary font-medium transition-colors duration-200 group-hover/target:text-primary">
                {pathname}
              </span>
            </span>
            <span className="ml-1 inline-flex items-center gap-1 rounded-md border border-border/50 bg-background/60 px-1.5 py-0.5 text-[10px] text-muted/80 transition-all duration-200 group-hover/target:border-accent/40 group-hover/target:bg-accent/10 group-hover/target:text-accent">
              {copied ? (
                <>
                  <LuCheck className="size-3 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <LuCopy className="size-2.5 transition-transform duration-200 group-hover/target:scale-110" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </span>
          </button>
        )}

        {/* Quick Action Navigation Buttons (Clean, Focused, Non-Redundant) */}
        <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Return Home Button */}
          <Link
            href="/"
            data-track="not_found_home_click"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-accent bg-accent px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-background shadow-[0_0_25px_-5px_rgba(34,211,238,0.4)] transition-all duration-200 hover:scale-[1.03] hover:bg-accent-hover hover:shadow-[0_0_30px_-3px_rgba(34,211,238,0.6)] active:scale-[0.98]"
          >
            <LuHouse className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span>Return Home</span>
          </Link>

          {/* Explore Projects Button */}
          <Link
            href="/?section=projects"
            data-track="not_found_projects_click"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface/80 px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-medium text-primary backdrop-blur-xs transition-all duration-200 hover:scale-[1.03] hover:border-accent/50 hover:bg-surface-elevated hover:text-accent active:scale-[0.98]"
          >
            <LuLayers className="size-4 text-accent transition-transform duration-200 group-hover:scale-110" />
            <span>Explore Projects</span>
          </Link>
        </div>
      </motion.div>

      {/* ================= BOTTOM ROW: Minimal Status Footer ================= */}
      <PageContainer className="relative z-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full flex-col sm:flex-row items-center justify-between gap-1 text-[11px] font-mono text-muted/70 pt-2"
        >
          <p>
            &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>PORTFOLIO // ALL OTHER SYSTEMS NORMAL</span>
          </p>
        </motion.div>
      </PageContainer>
    </div>
  );
}
