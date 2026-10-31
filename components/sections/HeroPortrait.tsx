"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

// Floating chips around portrait targeting client & hiring value propositions (at most 2)
const chips = [
  {
    label: "Full-Stack Architecture",
    dot: "bg-accent shadow-[0_0_8px_rgba(34,211,238,0.8)]",
    place: "-left-2 top-10 sm:-left-8",
    delay: "[animation-delay:0s]",
  },
  {
    label: "Production-Grade Web Apps",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    place: "-right-2 bottom-16 sm:-right-8",
    delay: "[animation-delay:-3s]",
  },
] as const;

/** Glass chip: drifts, lifts and glows on hover, with a light sheen sweep. */
function Chip({
  floatDelay,
  className,
  children,
}: {
  floatDelay: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-border/90 bg-surface/85 px-3 py-2 text-xs sm:text-sm font-medium text-primary shadow-xl backdrop-blur-md",
        "animate-float transition-[transform,border-color,box-shadow] duration-300 ease-standard",
        "hover:scale-105 hover:border-accent/50 hover:shadow-glow",
        floatDelay,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-[translate] duration-700 ease-standard group-hover:translate-x-full"
      />
      {children}
    </span>
  );
}

export function HeroPortrait() {
  const { photo } = personal;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative isolate mx-auto w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[340px]">
      {/* Ambient multi-layered luminous backlight */}
      <div
        aria-hidden="true"
        className="absolute -inset-2 sm:-inset-6 -z-10 rounded-4xl bg-linear-to-br from-accent/25 via-blue/15 to-violet/25 blur-3xl opacity-80"
      />

      {/* Main Portrait Card with High-Craft Frame */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-accent/30 bg-surface/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_40px_-10px_rgba(34,211,238,0.25)] backdrop-blur-md group">
        {/* Top hairline accent beam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent z-20"
        />

        {/* Technical Corner Brackets */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-2.5 top-2.5 size-3 border-l-2 border-t-2 border-accent/80 z-20"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 top-2.5 size-3 border-r-2 border-t-2 border-accent/80 z-20"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2.5 left-2.5 size-3 border-b-2 border-l-2 border-accent/80 z-20"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2.5 right-2.5 size-3 border-b-2 border-r-2 border-accent/80 z-20"
        />

        {photo ? (
          <>
            {/* Ambient radial lighting backdrop */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-radial-[at_50%_35%] from-accent/25 via-surface to-background-secondary"
            />

            {/* Subtle technical background grid */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"
            />

            {/* Shimmer skeleton sweep behind the photo while loading */}
            {!isLoaded && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/[0.09] to-transparent animate-shimmer"
              />
            )}

            {/* Photo: covers full card edge-to-edge, perfectly framed */}
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              onLoad={() => setIsLoaded(true)}
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 280px"
              className="relative z-10 object-cover object-[center_65%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            {/* Subtle bottom vignette to blend base seamlessly */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-surface via-surface/40 to-transparent z-20"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-accent/20 via-surface to-violet/20"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(148_163_184/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.07)_1px,transparent_1px)] bg-size-[28px_28px]" />
            <span className="relative font-display text-7xl font-bold tracking-tight text-primary/90">
              {personal.initials}
              <span className="text-accent">.</span>
            </span>
          </div>
        )}
      </div>

      {/* Floating Interactive Chips */}
      <div aria-hidden="true">
        {chips.map((chip, index) => (
          <div
            key={chip.label}
            className={cn(
              "absolute animate-chip-in z-20 hidden md:block",
              chip.place,
            )}
            style={{ animationDelay: `${0.6 + index * 0.12}s` }}
          >
            <Chip floatDelay={chip.delay}>
              <span
                className={cn(
                  "size-2 rounded-full transition-transform duration-300 group-hover:scale-150",
                  chip.dot,
                )}
              />
              <span>{chip.label}</span>
            </Chip>
          </div>
        ))}

        {/* Live Status Pill at Bottom Center */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 animate-chip-in z-20 max-w-[calc(100vw-2rem)]"
          style={{ animationDelay: `${0.6 + chips.length * 0.12}s` }}
        >
          <div className="group relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-border/90 bg-surface/95 px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[9.5px] sm:text-xs font-medium text-primary shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:shadow-glow whitespace-nowrap">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold text-secondary">Full Stack Dev</span>
            <span className="text-muted/50" aria-hidden="true">•</span>
            <span className="text-accent font-medium truncate max-w-[120px] sm:max-w-none">Cherdung Info Tech</span>
          </div>
        </div>
      </div>
    </div>
  );
}