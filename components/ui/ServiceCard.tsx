"use client";

import { useRef, type MouseEvent } from "react";
import type { IconType } from "react-icons";
import {
  LuCheck,
  LuLayers,
  LuPanelsTopLeft,
  LuServer,
  LuSparkles,
} from "react-icons/lu";
import type { ServiceId, ServiceItem } from "@/data/services";

type ServiceBrandMeta = {
  icon: IconType;
  colorRgb: string;
  glowClass: string;
  badgeStyle: string;
  iconStyle: string;
  sweepGradient: string;
  accentText: string;
};

const serviceBrands: Record<ServiceId, ServiceBrandMeta> = {
  "full-stack": {
    icon: LuLayers,
    colorRgb: "34, 211, 238",
    glowClass:
      "group-hover:border-cyan-400/40 group-hover:shadow-[0_16px_40px_-15px_rgba(0,0,0,0.85),0_0_30px_-5px_rgba(34,211,238,0.22)]",
    badgeStyle: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    iconStyle:
      "group-hover:border-cyan-400/40 group-hover:bg-cyan-400/15 group-hover:shadow-[0_0_20px_-2px_rgba(34,211,238,0.35)] text-cyan-400",
    sweepGradient: "from-cyan-400 via-blue-500 to-indigo-500",
    accentText: "text-cyan-400",
  },
  backend: {
    icon: LuServer,
    colorRgb: "52, 211, 153",
    glowClass:
      "group-hover:border-emerald-400/40 group-hover:shadow-[0_16px_40px_-15px_rgba(0,0,0,0.85),0_0_30px_-5px_rgba(52,211,153,0.22)]",
    badgeStyle: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    iconStyle:
      "group-hover:border-emerald-400/40 group-hover:bg-emerald-400/15 group-hover:shadow-[0_0_20px_-2px_rgba(52,211,153,0.35)] text-emerald-400",
    sweepGradient: "from-emerald-400 via-teal-500 to-cyan-500",
    accentText: "text-emerald-400",
  },
  frontend: {
    icon: LuPanelsTopLeft,
    colorRgb: "139, 92, 246",
    glowClass:
      "group-hover:border-violet-400/40 group-hover:shadow-[0_16px_40px_-15px_rgba(0,0,0,0.85),0_0_30px_-5px_rgba(139,92,246,0.22)]",
    badgeStyle: "border-violet-500/30 bg-violet-500/10 text-violet-400",
    iconStyle:
      "group-hover:border-violet-400/40 group-hover:bg-violet-400/15 group-hover:shadow-[0_0_20px_-2px_rgba(139,92,246,0.35)] text-violet-400",
    sweepGradient: "from-violet-400 via-purple-500 to-indigo-500",
    accentText: "text-violet-400",
  },
};

type ServiceCardProps = {
  service: ServiceItem;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const brand = serviceBrands[service.id];
  const Icon = brand.icon;

  function handleMouseEnter(event: MouseEvent<HTMLDivElement>) {
    rectRef.current = event.currentTarget.getBoundingClientRect();
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const clientX = event.clientX;
    const clientY = event.clientY;
    const currentTarget = event.currentTarget;

    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!rectRef.current) {
        rectRef.current = currentTarget.getBoundingClientRect();
      }
      currentTarget.style.setProperty(
        "--mx",
        `${clientX - rectRef.current.left}px`,
      );
      currentTarget.style.setProperty(
        "--my",
        `${clientY - rectRef.current.top}px`,
      );
    });
  }

  function handleMouseLeave() {
    rectRef.current = null;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
    >
      <div
        className={`relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-linear-to-b from-surface/90 via-surface/60 to-background-secondary/90 p-5 sm:p-6 lg:p-7 backdrop-blur-md transition-all duration-300 ease-standard hover:-translate-y-1.5 ${brand.glowClass}`}
      >
        {/* Dynamic Cursor Spotlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(${brand.colorRgb}, 0.12), transparent 70%)`,
          }}
        />

        {/* Sweeping top hairline accent gradient */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r ${brand.sweepGradient} transition-[scale] duration-500 ease-standard group-hover:scale-x-100`}
        />

        <div className="relative">
          {/* Top Header: Icon + Tagline Badge + Watermark Index */}
          <div className="flex items-center justify-between gap-3 min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                className={`flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background-secondary transition-all duration-300 group-hover:scale-105 ${brand.iconStyle}`}
              >
                <Icon className="size-5 sm:size-6" aria-hidden="true" />
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-wider min-w-0 ${brand.badgeStyle}`}
              >
                <span className="size-1 shrink-0 rounded-full bg-current" aria-hidden="true" />
                <span className="truncate max-w-[130px] min-[380px]:max-w-none">{service.tagline}</span>
              </span>
            </div>

            {/* Service Index */}
            <span
              className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tighter text-muted/30 transition-colors duration-300 group-hover:text-primary/70 shrink-0"
              aria-label={`Service 0${service.index}`}
            >
              {service.index}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold tracking-tight text-primary transition-colors duration-200 group-hover:text-white">
            {service.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary/90">
            {service.description}
          </p>

          {/* Subtle Hairline Divider */}
          <div
            aria-hidden="true"
            className="my-5 h-px bg-linear-to-r from-border/90 via-border/40 to-transparent"
          />

          {/* Key Deliverables - Structured Capability Rows */}
          <div>
            <div className="mb-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-muted">
              <span className="font-semibold text-secondary/80">Key Deliverables</span>
              <span className="text-muted/60">04 Modules</span>
            </div>

            <ul className="space-y-2.5">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="group/item flex items-center gap-2.5 rounded-xl border border-border/70 bg-background/50 px-3 py-2.5 text-xs sm:text-[13px] text-secondary/90 transition-all duration-200 ease-standard hover:-translate-y-0.5 hover:border-border hover:bg-surface/80 hover:text-primary hover:shadow-xs"
                >
                  <span
                    aria-hidden="true"
                    className={`flex size-5 shrink-0 items-center justify-center rounded-md border ${brand.badgeStyle} transition-transform duration-200 group-hover/item:scale-110`}
                  >
                    <LuCheck className="size-3 stroke-3" />
                  </span>
                  <span className="font-medium leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Practical Target Outcome Ribbon */}
        <div className="relative mt-6 flex items-center gap-3 rounded-xl border border-border/70 bg-surface/50 p-3.5 backdrop-blur-xs transition-colors duration-300 group-hover:border-border/90">
          <div
            className={`flex size-6 shrink-0 items-center justify-center rounded-lg ${brand.badgeStyle}`}
            aria-hidden="true"
          >
            <LuSparkles className="size-3.5" />
          </div>
          <p className="text-xs leading-relaxed text-secondary/90">
            <span className="font-semibold text-primary">Outcome: </span>
            {service.outcome}
          </p>
        </div>
      </div>
    </div>
  );
}
