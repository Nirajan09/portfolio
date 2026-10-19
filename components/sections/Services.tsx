"use client";

import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuCheck,
  LuCopy,
  LuGlobe,
  LuLayers,
  LuMonitor,
  LuPanelsTopLeft,
  LuPlay,
  LuServer,
  LuSmartphone,
  LuSparkles,
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

/* ---------------- Interactive Sandboxes ---------------- */

function FullStackSandbox() {
  const [selectedNode, setSelectedNode] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const nodes = [
    {
      name: "Client UI",
      role: "Next.js / SSR",
      stat: "60 FPS Fluid",
      detail: "Server-rendered React frontend with zero layout shift and instant client hydration.",
    },
    {
      name: "API & Auth",
      role: "REST / JWT",
      stat: "< 35ms Latency",
      detail: "Authenticated endpoint layer with Bearer token validation, rate limiting, and CORS.",
    },
    {
      name: "Data Layer",
      role: "PostgreSQL & Redis",
      stat: "ACID Safe",
      detail: "Relational tables with indexed queries, connection pooling, and in-memory cache.",
    },
  ];

  function runSimulation() {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);
    setSelectedNode(0);

    setTimeout(() => {
      setActiveStep(1);
      setSelectedNode(1);
    }, 600);

    setTimeout(() => {
      setActiveStep(2);
      setSelectedNode(2);
    }, 1200);

    setTimeout(() => {
      setIsSimulating(false);
      setActiveStep(null);
    }, 1800);
  }

  return (
    <div className="rounded-xl border border-border/70 bg-background-secondary/60 p-4 sm:p-5 transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Architecture Pipeline Simulator
          </span>
        </div>
        <button
          type="button"
          onClick={runSimulation}
          disabled={isSimulating}
          className="group/btn inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transform-gpu will-change-transform transition-[background-color,border-color,transform,box-shadow,color] duration-200 ease-standard hover:-translate-y-0.5 hover:scale-105 hover:bg-accent hover:text-background hover:shadow-[0_0_14px_rgba(34,211,238,0.35)] active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <LuPlay
            className={`size-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 ${
              isSimulating ? "animate-spin" : ""
            }`}
          />
          <span>{isSimulating ? "Simulating..." : "Test Flow"}</span>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {nodes.map((node, i) => {
          const isCurrent = selectedNode === i;
          const isStepActive = activeStep === i;
          return (
            <button
              key={node.name}
              type="button"
              onClick={() => setSelectedNode(i)}
              className={`group/node relative flex flex-col items-center rounded-xl border p-3 text-center cursor-pointer transform-gpu will-change-transform transition-[border-color,background-color,transform,box-shadow] duration-200 ease-standard hover:-translate-y-1 hover:shadow-glow ${
                isStepActive || isCurrent
                  ? "border-accent/70 bg-surface shadow-glow"
                  : "border-border/70 bg-background/60 hover:border-accent/40 hover:bg-surface/70"
              }`}
            >
              <span
                className={`text-xs font-bold transition-colors duration-200 ${
                  isCurrent ? "text-accent" : "text-primary group-hover/node:text-accent"
                }`}
              >
                {node.name}
              </span>
              <span className="text-[10px] text-muted font-mono mt-0.5 group-hover/node:text-secondary transition-colors duration-200">
                {node.role}
              </span>
              <span className="mt-2.5 inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-semibold bg-surface-elevated border border-border text-secondary transition-[border-color,background-color,color] duration-200 group-hover/node:border-accent/30 group-hover/node:text-primary">
                {node.stat}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3.5 rounded-lg border border-border/60 bg-surface/50 p-3 text-xs leading-relaxed text-secondary/90 transform-gpu will-change-transform transition-[border-color,background-color,box-shadow] duration-200 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs">
        <span className="font-semibold text-accent">{nodes[selectedNode].name}:</span>{" "}
        {nodes[selectedNode].detail}
      </div>
    </div>
  );
}

function BackendSandbox() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/auth/jwt",
      latency: "28ms",
      response: {
        status: 200,
        token_type: "Bearer",
        access_token: "eyJhbGciOi...",
        user: { role: "admin", verified: true },
      },
    },
    {
      method: "POST",
      path: "/api/v1/checkout",
      latency: "42ms",
      response: {
        status: 200,
        payment_intent: "pi_3Mv79e...",
        amount: 25000,
        currency: "usd",
        webhook: "dispatched",
      },
    },
    {
      method: "GET",
      path: "/api/v1/metrics",
      latency: "19ms",
      response: {
        status: 200,
        uptime: "99.98%",
        db_pool: "healthy",
        cache_hit_ratio: "94.6%",
      },
    },
  ];

  const current = endpoints[selectedEndpoint];

  function copyJson() {
    navigator.clipboard.writeText(JSON.stringify(current.response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-border/70 bg-background-secondary/60 p-4 sm:p-5 font-mono transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
            Live API Console Sandbox
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted font-sans">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            200 OK
          </span>
          <span>•</span>
          <span className="text-accent font-mono">{current.latency}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {endpoints.map((ep, i) => (
          <button
            key={ep.path}
            type="button"
            onClick={() => setSelectedEndpoint(i)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] cursor-pointer transform-gpu will-change-transform transition-[border-color,background-color,transform,box-shadow,color] duration-200 ease-standard hover:-translate-y-0.5 hover:shadow-xs border ${
              selectedEndpoint === i
                ? "border-accent/60 bg-accent/20 text-accent shadow-sm"
                : "border-border/70 bg-surface/40 text-muted hover:border-accent/40 hover:bg-surface/80 hover:text-secondary"
            }`}
          >
            <span className="font-bold text-[10px] text-accent/90">{ep.method}</span>
            <span>{ep.path}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-3 rounded-lg border border-border/70 bg-background/80 p-3 text-xs overflow-x-auto text-secondary/90 transition-[border-color,background-color] duration-200 hover:border-accent/40 hover:bg-background">
        <button
          type="button"
          onClick={copyJson}
          className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-[10px] text-muted hover:text-accent hover:border-accent/50 hover:bg-accent/10 border border-border/80 transition-all duration-200 cursor-pointer active:scale-95"
          title="Copy JSON response"
        >
          {copied ? <LuCheck className="size-3 text-emerald-400" /> : <LuCopy className="size-3" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
        <pre className="text-[11px] leading-relaxed text-secondary/90">
          {JSON.stringify(current.response, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function FrontendSandbox() {
  const [activeTheme, setActiveTheme] = useState<"cyan" | "violet" | "emerald">("cyan");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [counter, setCounter] = useState(42);

  const themeColors = {
    cyan: "text-accent border-accent/40 bg-accent/10",
    violet: "text-violet border-violet/40 bg-violet/10",
    emerald: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  };

  return (
    <div className="rounded-xl border border-border/70 bg-background-secondary/60 p-4 sm:p-5 transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            UI Playground & Live Inspector
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-md border border-border/60 bg-surface/60 p-0.5">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`p-1.5 rounded-md text-xs cursor-pointer transform-gpu will-change-transform transition-[transform,background-color,color] duration-200 ${
              device === "desktop"
                ? "bg-accent/20 text-accent scale-105"
                : "text-muted hover:text-primary hover:scale-105"
            }`}
            title="Desktop view"
          >
            <LuMonitor className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`p-1.5 rounded-md text-xs cursor-pointer transform-gpu will-change-transform transition-[transform,background-color,color] duration-200 ${
              device === "mobile"
                ? "bg-accent/20 text-accent scale-105"
                : "text-muted hover:text-primary hover:scale-105"
            }`}
            title="Mobile view"
          >
            <LuSmartphone className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span>Live Accent Color Tint:</span>
        <div className="flex items-center gap-2">
          {(["cyan", "violet", "emerald"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTheme(t)}
              className={`size-4.5 rounded-full cursor-pointer transform-gpu will-change-transform transition-all duration-200 ${
                t === "cyan" ? "bg-accent" : t === "violet" ? "bg-violet" : "bg-emerald-400"
              } ${
                activeTheme === t
                  ? "scale-125 ring-2 ring-white/70 shadow-sm"
                  : "opacity-60 hover:opacity-100 hover:scale-115"
              }`}
            />
          ))}
        </div>
      </div>

      <div
        className={`mt-3.5 mx-auto transition-all duration-300 ${
          device === "mobile" ? "max-w-[240px]" : "w-full"
        }`}
      >
        <div
          className={`rounded-xl border p-3.5 bg-surface/70 transform-gpu will-change-transform transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-glow ${themeColors[activeTheme]}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary">Interactive Component</span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface/80 border border-border">
              {device}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-secondary/80">
            Click counter to test reactive state & fluid animation:
          </p>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-primary">
              State: <span className="tabular-nums">{counter}</span>
            </span>
            <button
              type="button"
              onClick={() => setCounter((c) => c + 1)}
              className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold text-primary transform-gpu will-change-transform transition-[border-color,color,transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-sm active:scale-95 cursor-pointer"
            >
              + Increment
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between pt-2 border-t border-border/50 text-[11px] text-muted">
        <span>Lighthouse Score:</span>
        <span className="font-mono font-semibold text-emerald-400">99 Performance • 100 A11y</span>
      </div>
    </div>
  );
}

function BusinessSandbox() {
  const [toggles, setToggles] = useState({
    seo: true,
    cdn: true,
    speed: true,
  });

  const score = (toggles.seo ? 35 : 0) + (toggles.cdn ? 35 : 0) + (toggles.speed ? 30 : 0);

  return (
    <div className="rounded-xl border border-border/70 bg-background-secondary/60 p-4 sm:p-5 transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Site Health & Conversion Score
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted">Score:</span>
          <span
            className={`text-xs font-mono font-bold ${
              score >= 90 ? "text-emerald-400" : score >= 60 ? "text-warning" : "text-error"
            }`}
          >
            {score}/100
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <label className="group/toggle flex items-center justify-between rounded-lg border border-border/60 bg-surface/40 p-2.5 text-xs cursor-pointer transform-gpu will-change-transform transition-[border-color,background-color,transform,box-shadow] duration-200 ease-standard hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs">
          <span className="text-secondary/90 group-hover/toggle:text-primary transition-colors duration-200">
            Technical SEO Schemas & OpenGraph
          </span>
          <input
            type="checkbox"
            checked={toggles.seo}
            onChange={(e) => setToggles((t) => ({ ...t, seo: e.target.checked }))}
            className="size-4 accent-cyan-400 cursor-pointer"
          />
        </label>
        <label className="group/toggle flex items-center justify-between rounded-lg border border-border/60 bg-surface/40 p-2.5 text-xs cursor-pointer transform-gpu will-change-transform transition-[border-color,background-color,transform,box-shadow] duration-200 ease-standard hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs">
          <span className="text-secondary/90 group-hover/toggle:text-primary transition-colors duration-200">
            Global Edge CDN & Asset Compression
          </span>
          <input
            type="checkbox"
            checked={toggles.cdn}
            onChange={(e) => setToggles((t) => ({ ...t, cdn: e.target.checked }))}
            className="size-4 accent-cyan-400 cursor-pointer"
          />
        </label>
        <label className="group/toggle flex items-center justify-between rounded-lg border border-border/60 bg-surface/40 p-2.5 text-xs cursor-pointer transform-gpu will-change-transform transition-[border-color,background-color,transform,box-shadow] duration-200 ease-standard hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs">
          <span className="text-secondary/90 group-hover/toggle:text-primary transition-colors duration-200">
            Sub-Second First Contentful Paint
          </span>
          <input
            type="checkbox"
            checked={toggles.speed}
            onChange={(e) => setToggles((t) => ({ ...t, speed: e.target.checked }))}
            className="size-4 accent-cyan-400 cursor-pointer"
          />
        </label>
      </div>

      <div className="mt-3.5 rounded-lg border border-border/60 bg-surface/50 p-2.5 text-xs flex items-center justify-between transform-gpu will-change-transform transition-[border-color,background-color] duration-200 hover:border-accent/40 hover:bg-surface/80">
        <span className="text-muted">Estimated Load Time:</span>
        <span className="font-mono font-semibold text-accent">
          {score === 100
            ? "< 0.65s (Ultra Fast)"
            : score >= 70
            ? "~ 1.1s (Good)"
            : "~ 2.4s (Needs Optimization)"}
        </span>
      </div>
    </div>
  );
}

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