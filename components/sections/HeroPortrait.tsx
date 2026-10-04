import { MapPin } from "lucide-react";
import Image from "next/image";
import { personal } from "@/data/personal";

// Floating chips around the portrait. Decorative: the same facts are in the
// hero copy, so screen readers skip them. Negative delays desync the drift.
const chips = [
  { label: "React", dot: "bg-accent", place: "-left-2 top-10 sm:-left-8", delay: "[animation-delay:0s]", hideOnMobile: false },
  { label: "Next.js", dot: "bg-blue", place: "-right-2 top-24 sm:-right-8", delay: "[animation-delay:-2s]", hideOnMobile: false },
  { label: "Django", dot: "bg-violet", place: "-left-2 bottom-32 sm:-left-10", delay: "[animation-delay:-4s]", hideOnMobile: true },
  { label: "Node.js", dot: "bg-accent", place: "-right-2 bottom-20 sm:-right-6", delay: "[animation-delay:-5.5s]", hideOnMobile: true },
] as const;

const chipStyle =
  "inline-flex items-center gap-2 rounded-lg border border-border bg-surface/80 px-3 py-2 text-sm font-medium text-primary shadow-lg shadow-black/25 backdrop-blur-md";

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
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 280px"
            className="object-cover object-top"
          />
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
        {/* Gentle fade so the bottom chip stays legible over any photo */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background/60 to-transparent"
        />
      </div>

      {/* Chips: outer div positions, inner span floats (separate transforms) */}
      <div aria-hidden="true">
        {chips.map((chip) => (
          <div
            key={chip.label}
            className={`absolute ${chip.place} ${chip.hideOnMobile ? "hidden sm:block" : ""}`}
          >
            <span className={`${chipStyle} animate-float ${chip.delay}`}>
              <span className={`size-2 rounded-full ${chip.dot}`} />
              {chip.label}
            </span>
          </div>
        ))}

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
          <span className={`${chipStyle} animate-float whitespace-nowrap [animation-delay:-3s]`}>
            <MapPin className="size-4 text-accent" />
            {personal.location}
          </span>
        </div>
      </div>
    </div>
  );
}