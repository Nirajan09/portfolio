"use client";

import Image from "next/image";
import { useState } from "react";
import { personal } from "@/data/personal";

export function HeroPortrait() {
  const { photo } = personal;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative isolate mx-auto w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[340px]">
      {/* Restrained Portrait Card */}
      <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border/90 bg-surface shadow-[0_24px_56px_-16px_rgba(0,0,0,0.8)] transition-colors duration-300 hover:border-accent/35">
        {photo ? (
          <>
            {/* Subtle radial depth backdrop behind cutout */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-radial-[at_50%_35%] from-accent/15 via-surface to-background-secondary"
            />

            {/* Shimmer skeleton sweep while loading */}
            {!isLoaded && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/[0.08] to-transparent animate-shimmer"
              />
            )}

            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              onLoad={() => setIsLoaded(true)}
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 280px"
              className="relative z-10 object-cover object-[center_65%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Subtle bottom vignette */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-linear-to-t from-surface via-surface/40 to-transparent"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-accent/15 via-surface to-background-secondary"
          >
            <span className="relative font-display text-7xl font-bold tracking-tight text-primary/90">
              {personal.initials}
              <span className="text-accent">.</span>
            </span>
          </div>
        )}
      </div>

      {/* Crisp Role Caption Badge */}
      <div className="absolute -bottom-3.5 left-1/2 z-20 -translate-x-1/2 max-w-[calc(100vw-2rem)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/90 bg-surface/95 px-3.5 py-1.5 text-[11px] sm:text-xs font-medium text-secondary shadow-xl backdrop-blur-md whitespace-nowrap">
          <span className="font-semibold text-primary">Full Stack Dev</span>
          <span className="text-muted/60" aria-hidden="true">·</span>
          <span className="font-mono text-accent truncate max-w-[140px] sm:max-w-none">
            Cherdung Info Tech
          </span>
        </div>
      </div>
    </div>
  );
}
