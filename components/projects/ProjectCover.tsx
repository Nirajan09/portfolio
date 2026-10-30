"use client";

import { memo, useMemo, useState } from "react";
import type { IconType } from "react-icons";
import { LuBookOpen, LuBriefcase, LuFolder, LuImage, LuLock } from "react-icons/lu";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type Tone = "cyan" | "blue" | "violet";

const toneClasses: Record<Tone, { from: string; border: string; glow: string }> = {
  cyan: {
    from: "from-accent/20",
    border:
      "group-hover:border-accent/70 group-hover/preview:border-accent group-hover/btn:border-accent hover:border-accent group-hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.4)] group-hover/preview:shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)] group-hover/btn:shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)]",
    glow: "rgba(34, 211, 238, 0.25)",
  },
  blue: {
    from: "from-blue/20",
    border:
      "group-hover:border-blue/70 group-hover/preview:border-blue group-hover/btn:border-blue hover:border-blue group-hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.4)] group-hover/preview:shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)] group-hover/btn:shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)]",
    glow: "rgba(59, 130, 246, 0.25)",
  },
  violet: {
    from: "from-violet/20",
    border:
      "group-hover:border-violet/70 group-hover/preview:border-violet group-hover/btn:border-violet hover:border-violet group-hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.4)] group-hover/preview:shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)] group-hover/btn:shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)]",
    glow: "rgba(139, 92, 246, 0.25)",
  },
};

const projectDisplayMeta: Record<string, { icon: IconType; tone: Tone; domain: string }> = {
  "book-recommendation-system": {
    icon: LuBookOpen,
    tone: "cyan",
    domain: "bookhub.app / django-api",
  },
  "job-portal": {
    icon: LuBriefcase,
    tone: "violet",
    domain: "job-portal-liard-one.vercel.app",
  },
  "image-sharing-platform": {
    icon: LuImage,
    tone: "blue",
    domain: "pixify.cloud / express-api",
  },
};

type ProjectCoverProps = {
  project: Project;
  /** Scale up on parent `group` hover (cards only). */
  zoom?: boolean;
  /** Show the browser window header bar. Defaults to true. */
  showWindowBar?: boolean;
  className?: string;
  priority?: boolean;
};

export const ProjectCover = memo(function ProjectCover({
  project,
  zoom = false,
  showWindowBar = true,
  className,
  priority = false,
}: ProjectCoverProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const meta = projectDisplayMeta[project.slug] ?? {
    icon: LuFolder,
    tone: "cyan" as Tone,
    domain: `${project.slug}.local`,
  };
  const Icon = meta.icon;
  const tone = toneClasses[meta.tone];

  const hostname = useMemo(() => {
    if (!project.links?.live) return meta.domain;
    try {
      return new URL(project.links.live).hostname;
    } catch {
      return meta.domain;
    }
  }, [project.links?.live, meta.domain]);

  const motion = zoom
    ? "transform-gpu will-change-transform transition-transform duration-700 ease-standard group-hover:scale-[1.04]"
    : "";

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border border-border/80 bg-background-secondary shadow-2xl transition-[border-color,box-shadow] duration-500 isolate [transform:translateZ(0)]",
        tone.border,
        className,
      )}
    >
      {/* ---------- Window Title Bar ---------- */}
      {showWindowBar && (
        <div className="relative z-10 flex h-9 shrink-0 items-center justify-between overflow-hidden rounded-t-xl rounded-t-[calc(var(--radius-xl)-1px)] border-b border-border/70 bg-surface/90 px-2.5 sm:px-3.5 backdrop-blur-md transition-colors duration-300 group-hover:bg-surface">
          {/* Traffic light dots with glowing hover states */}
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="size-2 sm:size-2.5 rounded-full bg-rose-500/80 transition-all duration-300 group-hover:bg-rose-500 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
            <span className="size-2 sm:size-2.5 rounded-full bg-amber-400/80 transition-all duration-300 group-hover:bg-amber-400 group-hover:shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
            <span className="size-2 sm:size-2.5 rounded-full bg-emerald-400/80 transition-all duration-300 group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          </div>

          {/* Browser Address Bar with hover highlights */}
          <div className="mx-1.5 sm:mx-2 flex min-w-0 max-w-[150px] min-[380px]:max-w-[220px] sm:max-w-[320px] flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-border/50 bg-background/70 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono text-muted/80 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-background/90 group-hover:text-primary">
            <LuLock className="size-2.5 shrink-0 text-accent/70 transition-colors duration-300 group-hover:text-accent" aria-hidden="true" />
            <span className="truncate">{hostname}</span>
          </div>

          {/* Spacer / live beacon dot */}
          <div className="flex items-center gap-1 text-[10px] text-muted/60 shrink-0" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      )}

      {/* ---------- Main Viewport Frame ---------- */}
      <div
        className={cn(
          "relative aspect-video w-full flex-1 overflow-hidden bg-background",
          showWindowBar
            ? "rounded-b-xl rounded-b-[calc(var(--radius-xl)-1px)]"
            : "rounded-xl rounded-[calc(var(--radius-xl)-1px)]",
        )}
      >
        {project.cover ? (
          <>
            {/* Ambient subtle glow beneath screenshot */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 bg-linear-to-br via-surface/40 to-background opacity-60 transition-opacity duration-700 group-hover:opacity-100",
                tone.from,
              )}
            />

            {/* Uncropped screenshot inside styled viewport */}
            <div className="relative size-full p-1.5 sm:p-2.5">
              <div className="relative size-full overflow-hidden rounded-lg border border-border/40 bg-surface/80 shadow-inner [transform:translateZ(0)] transition-colors duration-300 group-hover:border-border/70">
                {/* Background shimmer skeleton: visible while screenshot loads */}
                {!isLoaded && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/[0.08] to-transparent animate-shimmer"
                  />
                )}

                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  priority={priority}
                  onLoad={() => setIsLoaded(true)}
                  sizes="(min-width: 1280px) 680px, (min-width: 1024px) 50vw, (min-width: 640px) 90vw, 100vw"
                  className={cn("relative z-10 object-cover object-top", motion)}
                />
              </div>
            </div>

            {/* Diagonal glass light sweep on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/8 to-transparent transition-transform duration-1000 ease-standard group-hover:translate-x-full"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-linear-to-br via-surface to-background-secondary p-8",
              tone.from,
            )}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 text-accent shadow-glow transition-transform duration-300 group-hover:scale-110">
                <Icon className="size-7" />
              </div>
              <p className="font-display text-base font-semibold text-primary">{project.title}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});