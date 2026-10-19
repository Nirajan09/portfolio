import { LuMapPin } from "react-icons/lu";
import Image from "next/image";
import type { ReactNode } from "react";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

// Floating chips around the portrait. Decorative: the same facts are in the
// hero copy, so screen readers skip them. Negative delays desync the drift.
const chips = [
  { label: "React", dot: "bg-accent", place: "-left-2 top-10 sm:-left-8", delay: "[animation-delay:0s]", hideOnMobile: false },
  { label: "Next.js", dot: "bg-blue", place: "-right-2 top-24 sm:-right-8", delay: "[animation-delay:-2s]", hideOnMobile: false },
  { label: "Django", dot: "bg-violet", place: "-left-2 bottom-32 sm:-left-10", delay: "[animation-delay:-4s]", hideOnMobile: true },
  { label: "Node.js", dot: "bg-accent", place: "-right-2 bottom-20 sm:-right-6", delay: "[animation-delay:-5.5s]", hideOnMobile: true },
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
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-border bg-surface/80 px-3 py-2 text-sm font-medium text-primary shadow-lg backdrop-blur-md",
        "animate-float transition-[scale,border-color,box-shadow] duration-300 ease-standard",
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

  return (
    <div className="relative isolate">
      {/* Soft colour glow behind the frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-4xl bg-linear-to-br from-accent/25 via-blue/10 to-violet/25 blur-3xl"
      />
      {/* Offset outline for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-xl border border-accent/30"
      />

      <div className="relative aspect-4/5 overflow-hidden rounded-xl border border-border bg-surface">
        {photo ? (
          <>
            {/* Ambient matching backdrop fill */}
            <Image
              src={photo.src}
              alt=""
              fill
              aria-hidden="true"
              className="scale-110 object-cover blur-2xl opacity-40 brightness-75"
            />
            {/* Full uncropped photo */}
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 280px"
              className="object-contain object-center"
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

      {/* Outer div positions + plays the pop-in; inner chip floats and reacts to hover */}
      <div aria-hidden="true">
        {chips.map((chip, index) => (
          <div
            key={chip.label}
            className={cn(
              "absolute animate-chip-in",
              chip.place,
              chip.hideOnMobile && "hidden sm:block",
            )}
            style={{ animationDelay: `${0.75 + index * 0.12}s` }}
          >
            <Chip floatDelay={chip.delay}>
              <span
                className={cn(
                  "size-2 rounded-full transition-[scale] duration-300 group-hover:scale-150",
                  chip.dot,
                )}
              />
              {chip.label}
            </Chip>
          </div>
        ))}

        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 animate-chip-in"
          style={{ animationDelay: `${0.75 + chips.length * 0.12}s` }}
        >
          <Chip floatDelay="[animation-delay:-3s]" className="whitespace-nowrap">
            <LuMapPin className="size-4 text-accent" />
            {personal.location}
          </Chip>
        </div>
      </div>
    </div>
  );
}