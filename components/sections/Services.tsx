"use client";

import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuCheck,
  LuGlobe,
  LuLayers,
  LuPanelsTopLeft,
  LuServer,
  LuSparkles,
} from "react-icons/lu";
import Link from "next/link";
import {
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, type ServiceId } from "@/data/services";
import { FullStackSandbox } from "./services/FullStackSandbox";
import { BackendSandbox } from "./services/BackendSandbox";
import { FrontendSandbox } from "./services/FrontendSandbox";
import { BusinessSandbox } from "./services/BusinessSandbox";

const serviceIcons: Record<ServiceId, IconType> = {
  "full-stack": LuLayers,
  backend: LuServer,
  frontend: LuPanelsTopLeft,
  "business-websites": LuGlobe,
};

const arrowSteps: Record<string, number> = {
  ArrowDown: 1,
  ArrowRight: 1,
  ArrowUp: -1,
  ArrowLeft: -1,
};

/* ---------------- Main Services Section ---------------- */

export function Services() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selected = services[active];
  const SelectedIcon = serviceIcons[selected.id];

  function select(index: number) {
    setActive(index);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const step = arrowSteps[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + services.length) % services.length;
    select(next);
    tabRefs.current[next]?.focus();
  }

  function handlePanelMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          eyebrow="Services & Solutions"
          title="How I bring value to your team"
          description="From end-to-end web applications and high-throughput APIs to frontend performance engineering, here is how I help turn complex ideas into production-ready software."
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:gap-10">
          {/* Selector Tabs (Left Side) */}
          <div
            role="tablist"
            aria-label="Services"
            aria-orientation="vertical"
            className="-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {services.map((service, index) => {
              const Icon = serviceIcons[service.id];
              const isActive = index === active;
              return (
                <button
                  key={service.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`service-tab-${service.id}`}
                  aria-selected={isActive}
                  aria-controls={`service-panel-${service.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={[
                    "group relative flex shrink-0 items-center gap-3.5 overflow-hidden rounded-xl border p-3.5 sm:p-4 text-left cursor-pointer",
                    "transform-gpu will-change-transform transition-[background-color,border-color,box-shadow,translate] duration-200 ease-standard",
                    "lg:shrink",
                    isActive
                      ? "border-accent/50 bg-surface/95 text-primary shadow-glow -translate-y-0.5 lg:translate-x-1"
                      : "border-border/60 bg-surface/40 text-muted hover:border-accent/30 hover:bg-surface/70 hover:text-secondary hover:-translate-y-0.5 lg:hover:translate-x-1 lg:hover:translate-y-0",
                  ].join(" ")}
                >
                  {/* Left accent bar indicator */}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute inset-y-2 left-0 hidden w-1 rounded-full bg-linear-to-b from-accent via-blue to-violet transition-[scale,opacity] duration-300 ease-standard lg:block",
                      isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
                    ].join(" ")}
                  />

                  {/* Icon badge */}
                  <div
                    className={[
                      "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-[border-color,background-color,transform,color] duration-200 ease-standard",
                      isActive
                        ? "border-accent/50 bg-accent/20 text-accent shadow-sm scale-105"
                        : "border-border/70 bg-background-secondary text-muted group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent group-hover:scale-110",
                    ].join(" ")}
                  >
                    <Icon className="size-4.5" aria-hidden="true" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="whitespace-nowrap font-display text-sm sm:text-base font-semibold text-primary lg:whitespace-normal group-hover:text-accent transition-colors duration-200">
                      {service.title}
                    </span>
                    <span className="hidden text-[11px] text-muted/90 lg:block mt-0.5">
                      {service.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Detail Showcase (Right Side) */}
          <div
            key={selected.id}
            role="tabpanel"
            id={`service-panel-${selected.id}`}
            aria-labelledby={`service-tab-${selected.id}`}
            tabIndex={0}
            onMouseMove={handlePanelMove}
            className="group/panel relative animate-[fade-up_0.35s_var(--ease-standard)_both] overflow-hidden rounded-2xl border border-border/80 bg-surface/85 backdrop-blur-md p-5 sm:p-7 transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-glow"
          >
            {/* Top gradient hairline */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-transparent via-accent/60 to-transparent"
            />

            {/* Ambient corner glow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-accent/10 opacity-35 blur-3xl transition-opacity duration-500 group-hover/panel:opacity-75"
            />

            {/* Cursor spotlight */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/panel:opacity-100"
              style={{
                background:
                  "radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), rgb(34 211 238 / 0.10), transparent 60%)",
              }}
            />

            <div className="relative">
              {/* Header: Title & Badge */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent transition-colors duration-200 hover:border-accent/50 hover:bg-accent/20">
                    <LuSparkles className="size-3" aria-hidden="true" />
                    <span>{selected.badge}</span>
                  </div>
                  <h3 className="mt-2.5 font-display text-xl sm:text-2xl font-bold leading-tight text-primary">
                    {selected.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-secondary/90">
                    {selected.summary}
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-linear-to-br from-accent/15 via-blue/10 to-transparent text-accent shadow-sm transition-[transform,border-color,box-shadow] duration-300 ease-standard group-hover/panel:scale-110 group-hover/panel:border-accent/50 group-hover/panel:shadow-[0_0_16px_rgba(34,211,238,0.25)]"
                >
                  <SelectedIcon className="size-5.5 transition-transform duration-300 ease-standard group-hover/panel:rotate-6" />
                </div>
              </div>

              {/* Punchy Key Highlights with interactive hover cards */}
              <div className="mt-5 border-t border-border/70 pt-4">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {selected.features.map((item) => (
                    <li
                      key={item}
                      className="group/item flex items-center gap-2.5 rounded-lg border border-border/60 bg-surface/40 px-3 py-2 text-xs sm:text-sm text-secondary/90 transform-gpu will-change-transform transition-[border-color,background-color,color,transform,box-shadow] duration-200 ease-standard hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface/80 hover:text-primary hover:shadow-xs cursor-default"
                    >
                      <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 transition-[transform,background-color,border-color] duration-200 ease-standard group-hover/item:scale-110 group-hover/item:bg-emerald-500/25 group-hover/item:border-emerald-500/50">
                        <LuCheck className="size-2.5 stroke-3" aria-hidden="true" />
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Interactive Sandbox */}
              <div className="mt-5">
                {selected.id === "full-stack" && <FullStackSandbox />}
                {selected.id === "backend" && <BackendSandbox />}
                {selected.id === "frontend" && <FrontendSandbox />}
                {selected.id === "business-websites" && <BusinessSandbox />}
              </div>

              {/* Action row */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-border/70">
                <Link
                  href="/#contact"
                  className="group/cta inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-[background-color,box-shadow,translate] duration-300 ease-standard hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
                >
                  <span>Discuss This Project</span>
                  <LuArrowUpRight
                    className="size-4 transition-transform duration-300 ease-standard group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <span className="text-xs text-muted text-center sm:text-right">
                  Open for freelance & contract work
                </span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}