"use client";

import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuCheck,
  LuCodeXml,
  LuDatabase,
  LuGlobe,
  LuPanelsTopLeft,
} from "react-icons/lu";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, type ServiceId } from "@/data/services";

const serviceIcons: Record<ServiceId, IconType> = {
  "full-stack": LuCodeXml,
  backend: LuDatabase,
  frontend: LuPanelsTopLeft,
  "business-websites": LuGlobe,
};

const arrowSteps: Record<string, number> = {
  ArrowDown: 1,
  ArrowRight: 1,
  ArrowUp: -1,
  ArrowLeft: -1,
};

/** How long each service stays open while auto-rotating. */
const ROTATE_MS = 7000;

export function Services() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  // Start as true so SSR/first paint never autoplays; real value set on mount
  const [reduceMotion, setReduceMotion] = useState(true);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const selected = services[active];
  const SelectedIcon = serviceIcons[selected.id];
  const isRotating = autoplay && !reduceMotion;

  function select(index: number) {
    setAutoplay(false); // user took control, stop auto-rotating
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

  // Cursor-following spotlight on the detail panel
  function handlePanelMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          eyebrow="Services"
          title="How I can help"
          description="Open to freelance and collaboration work. These are the areas where I can be most useful."
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
          className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:gap-10"
        >
          {/* ---------- Selector ---------- */}
          <div
            role="tablist"
            aria-label="Services"
            aria-orientation="vertical"
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
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
                    "group relative flex shrink-0 items-center gap-4 overflow-hidden rounded-xl border px-5 py-4 text-left",
                    "transition-[background-color,border-color,color,translate] duration-300 ease-standard",
                    "lg:shrink",
                    isActive
                      ? "border-border bg-surface text-primary"
                      : "border-transparent text-muted hover:bg-surface/50 hover:text-secondary lg:hover:translate-x-1",
                  ].join(" ")}
                >
                  {/* Active indicator bar */}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute inset-y-3 left-0 hidden w-0.5 rounded-full bg-accent transition-[scale,opacity] duration-300 ease-standard lg:block",
                      isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
                    ].join(" ")}
                  />

                  <Icon
                    className={[
                      "size-5 shrink-0 transition-[color,scale] duration-300 ease-standard",
                      isActive
                        ? "text-accent"
                        : "text-muted group-hover:scale-110 group-hover:text-accent",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                  <span className="whitespace-nowrap font-display text-base font-semibold sm:text-lg lg:whitespace-normal">
                    {service.title}
                  </span>

                  {/* Auto-rotate progress line; its end advances to the next service */}
                  {isActive && isRotating && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-border/60"
                    >
                      <span
                        key={selected.id}
                        onAnimationEnd={() =>
                          setActive((current) => (current + 1) % services.length)
                        }
                        className="block h-full origin-left bg-linear-to-r from-accent via-blue to-violet"
                        style={{
                          animation: `service-progress ${ROTATE_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ---------- Detail panel ---------- */}
          <div
            key={selected.id}
            role="tabpanel"
            id={`service-panel-${selected.id}`}
            aria-labelledby={`service-tab-${selected.id}`}
            tabIndex={0}
            onMouseMove={handlePanelMove}
            className="group/panel relative animate-[fade-up_0.45s_var(--ease-standard)_both] overflow-hidden rounded-2xl border border-border bg-linear-to-br from-surface to-background-secondary p-6 transition-[border-color] duration-300 hover:border-accent/30 sm:p-10"
          >
            {/* Hairline + ambient glow */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent/10 blur-3xl"
            />

            {/* Cursor spotlight */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/panel:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(34 211 238 / 0.10), transparent 60%)",
              }}
            />

            {/* Watermark icon */}
            <SelectedIcon
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -right-6 size-48 text-primary/4 transition-[scale,color] duration-500 ease-standard group-hover/panel:scale-110 group-hover/panel:text-accent/[0.07]"
              strokeWidth={1}
            />

            <div className="relative">
              <div className="flex size-14 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent transition-[scale,box-shadow] duration-300 ease-standard group-hover/panel:scale-105 group-hover/panel:shadow-glow">
                <SelectedIcon className="size-7" aria-hidden="true" />
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-primary sm:text-3xl">
                {selected.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
                {selected.description}
              </p>

              <div className="mt-8 border-t border-border pt-6">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">
                  What you get
                </p>
                <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {selected.tags.map((tag, index) => (
                    <li
                      key={tag}
                      style={{ animationDelay: `${150 + index * 80}ms` }}
                      className="flex animate-[fade-up_0.45s_var(--ease-standard)_both] items-center gap-3 text-sm text-primary sm:text-base"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <LuCheck className="size-3" aria-hidden="true" />
                      </span>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/#contact"
                className="group/cta mt-10 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-[background-color,box-shadow,translate] duration-300 ease-standard hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
              >
                Discuss this project
                <LuArrowUpRight
                  className="size-4 transition-transform duration-300 ease-standard group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}