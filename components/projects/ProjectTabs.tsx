"use client";

import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuCheck,
  LuRotateCcw,
  LuZap,
} from "react-icons/lu";
import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { TechChip } from "@/components/ui/TechChip";
import type { Project } from "@/types";

type TabId = "overview" | "features" | "how-it-works" | "stack";

type Tab = { id: TabId; label: string; count?: number };

const enter = "animate-[fade-up_0.5s_var(--ease-standard)_both]";

const delay = (index: number, base = 0): CSSProperties => ({
  animationDelay: `${base + Math.min(index, 9) * 60}ms`,
});

const spotlightStyle: CSSProperties = {
  background:
    "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgb(34 211 238 / 0.12), transparent 70%)",
};

let spotRafId: number | null = null;

/** Writes the cursor position into every [data-spot] child, throttled via
    requestAnimationFrame to prevent layout thrashing. */
function trackSpotlight(event: MouseEvent<HTMLElement>) {
  const target = event.currentTarget;
  const clientX = event.clientX;
  const clientY = event.clientY;

  if (spotRafId !== null) return;

  spotRafId = requestAnimationFrame(() => {
    spotRafId = null;
    const items = target.querySelectorAll<HTMLElement>("[data-spot]");
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      item.style.setProperty("--mx", `${clientX - rect.left}px`);
      item.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  });
}

function Spotlight() {
  return (
    <span
      aria-hidden="true"
      style={spotlightStyle}
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/grid:opacity-100"
    />
  );
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce) {
      node.textContent = String(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [value, reduce]);

  return <span ref={ref}>{value}</span>;
}

/* ---------------------------------------------------------------- */
/*  Overview                                                         */
/* ---------------------------------------------------------------- */

function Overview({
  project,
  stats,
  onJump,
}: {
  project: Project;
  stats: { id: TabId; label: string; value: number }[];
  onJump: (id: TabId) => void;
}) {
  const highlights = project.highlights ?? [];
  const twoCol = highlights.length > 0;

  return (
    <div
      className={
        twoCol ? "grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16" : "max-w-3xl"
      }
    >
      <div>
        {project.overview && (
          <p className="text-lg leading-8 text-primary sm:text-xl sm:leading-9">
            {project.overview}
          </p>
        )}

        {stats.length > 0 && (
          <ul
            className={`${project.overview ? "mt-10" : ""} grid gap-3 sm:grid-cols-3`}
          >
            {stats.map((stat, index) => (
              <li key={stat.id} style={delay(index, 100)} className={enter}>
                <button
                  type="button"
                  onClick={() => onJump(stat.id)}
                  className="group/stat relative block w-full overflow-hidden rounded-xl border border-border bg-surface/40 p-4 text-left transform-gpu will-change-transform transition-[transform,translate,border-color,background-color,box-shadow] duration-300 ease-standard hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-elevated/60 hover:shadow-glow"
                >
                  <LuArrowUpRight
                    className="absolute right-3 top-3 size-4 text-muted opacity-0 transition-[opacity,translate,color] duration-300 ease-standard group-hover/stat:-translate-y-0.5 group-hover/stat:translate-x-0.5 group-hover/stat:text-accent group-hover/stat:opacity-100"
                    aria-hidden="true"
                  />
                  <span className="block font-display text-4xl font-bold tabular-nums text-primary transition-colors duration-300 group-hover/stat:text-accent">
                    <CountUp value={stat.value} />
                  </span>
                  <span className="mt-1 block text-xs font-medium uppercase tracking-widest text-muted">
                    {stat.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {twoCol && (
        <div>
          <h3 className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-muted">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]"
            />
            Technical highlights
          </h3>
          <ul
            onMouseMove={trackSpotlight}
            className="group/grid mt-5 space-y-2.5"
          >
            {highlights.map((item, index) => (
              <li
                key={item}
                data-spot
                style={delay(index, 150)}
                className={`${enter} group/card relative overflow-hidden rounded-xl border border-border bg-surface/40 transition-[translate,border-color] duration-300 ease-standard hover:translate-x-1 hover:border-accent/40`}
              >
                <Spotlight />
                <div className="relative flex items-start gap-4 p-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background-secondary text-accent transition-[scale,border-color,background-color] duration-300 ease-standard group-hover/card:scale-110 group-hover/card:border-accent/40 group-hover/card:bg-accent/10">
                    <LuZap className="size-4" aria-hidden="true" />
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-secondary transition-colors duration-200 group-hover/card:text-primary sm:text-base">
                    {item}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Key features                                                     */
/* ---------------------------------------------------------------- */

function Features({ features }: { features: readonly string[] }) {
  return (
    <ul
      onMouseMove={trackSpotlight}
      className="group/grid grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {features.map((feature, index) => (
        <li
          key={feature}
          data-spot
          style={delay(index)}
          className={`${enter} group/card relative overflow-hidden rounded-xl border border-border bg-surface/40 transform-gpu will-change-transform transition-[transform,translate,border-color] duration-300 ease-standard hover:-translate-y-1 hover:border-accent/40`}
        >
          <Spotlight />
          <div className="relative flex h-full flex-col gap-4 p-5">
            <span className="flex size-9 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-[color,background-color,border-color,box-shadow] duration-300 group-hover/card:border-accent group-hover/card:bg-accent group-hover/card:text-background group-hover/card:shadow-glow">
              <LuCheck className="size-4" aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-secondary transition-colors duration-200 group-hover/card:text-primary sm:text-base">
              {feature}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------- */
/*  How it works: interactive stepper                                */
/* ---------------------------------------------------------------- */

function Stepper({ steps }: { steps: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const last = steps.length - 1;
  const progress = last <= 0 ? 1 : index / last;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setIndex((i) => Math.min(i + 1, last));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    }
  }

  const atEnd = index === last;

  return (
    <div onKeyDown={onKeyDown} className="max-w-4xl">
      {/* Track */}
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute left-5 right-5 top-5 h-px bg-border"
        />
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ scaleX: progress }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-5 right-5 top-5 h-px origin-left bg-linear-to-r from-accent via-blue to-violet"
        />
        <ol className="relative flex justify-between">
          {steps.map((step, i) => {
            const isCurrent = i === index;
            const isDone = i < index;
            return (
              <li key={step}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Step ${i + 1}`}
                  aria-current={isCurrent ? "step" : undefined}
                  className={[
                    "grid size-10 place-items-center rounded-full border font-display text-sm font-semibold",
                    "transition-[color,background-color,border-color,box-shadow,scale] duration-300 ease-standard",
                    isCurrent
                      ? "scale-110 border-accent bg-accent text-background shadow-glow"
                      : isDone
                        ? "border-accent/60 bg-background-secondary text-accent hover:scale-105"
                        : "border-border bg-background-secondary text-muted hover:scale-105 hover:border-accent/40 hover:text-primary",
                  ].join(" ")}
                >
                  {isDone ? (
                    <LuCheck className="size-4" aria-hidden="true" />
                  ) : (
                    i + 1
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Current step */}
      <div className="relative mt-8 overflow-hidden rounded-2xl border border-border bg-linear-to-br from-surface to-background-secondary p-6 sm:p-8">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative flex items-center justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Step {index + 1}
            <span className="text-muted"> / {steps.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIndex((i) => Math.max(i - 1, 0))}
              disabled={index === 0}
              aria-label="Previous step"
              className="grid size-9 place-items-center rounded-full border border-border text-secondary transition-[color,border-color,background-color,opacity] duration-200 hover:border-accent/50 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
            >
              <LuArrowLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setIndex(atEnd ? 0 : index + 1)}
              aria-label={atEnd ? "Restart" : "Next step"}
              className="grid size-9 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent transition-[color,background-color] duration-200 hover:bg-accent hover:text-background"
            >
              {atEnd ? (
                <LuRotateCcw className="size-4" aria-hidden="true" />
              ) : (
                <LuArrowRight className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div className="relative mt-6 min-h-28" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="max-w-2xl text-lg leading-8 text-primary sm:text-xl sm:leading-9"
            >
              {steps[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Tech stack                                                       */
/* ---------------------------------------------------------------- */

function Stack({ project }: { project: Project }) {
  const groups = project.stackGroups ?? [];

  if (groups.length === 0) {
    return (
      <ul className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <TechChip key={tech} name={tech} />
        ))}
      </ul>
    );
  }

  return (
    <dl className="group/stack divide-y divide-border border-y border-border">
      {groups.map((group, index) => (
        <div
          key={group.label}
          style={delay(index)}
          className={`${enter} flex flex-col gap-4 py-6 transition-opacity duration-300 focus-within:opacity-100! group-hover/stack:opacity-40 hover:opacity-100! sm:flex-row sm:items-start sm:gap-10`}
        >
          <dt className="flex items-center gap-2.5 sm:w-44 sm:shrink-0 sm:pt-2">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-linear-to-br from-accent to-violet shadow-[0_0_8px_var(--accent)]"
            />
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              {group.label}
            </span>
            <span className="text-xs tabular-nums text-muted/60">
              {group.items.length}
            </span>
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((tech) => (
                <TechChip key={tech} name={tech} />
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------------- */
/*  Tabs shell                                                       */
/* ---------------------------------------------------------------- */

export function ProjectTabs({ project }: { project: Project }) {
  const stackGroups = project.stackGroups ?? [];
  const steps = project.howItWorks ?? [];
  const highlights = project.highlights ?? [];

  const techCount =
    stackGroups.length > 0
      ? stackGroups.reduce((total, group) => total + group.items.length, 0)
      : project.stack.length;

  const tabs: Tab[] = [];
  if (project.overview || highlights.length > 0)
    tabs.push({ id: "overview", label: "Overview" });
  if (project.features.length > 0)
    tabs.push({
      id: "features",
      label: "Key features",
      count: project.features.length,
    });
  if (steps.length > 0)
    tabs.push({ id: "how-it-works", label: "How it works", count: steps.length });
  if (techCount > 0)
    tabs.push({ id: "stack", label: "Tech stack", count: techCount });

  const [active, setActive] = useState<TabId>(tabs[0]?.id ?? "overview");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (tabs.length === 0) return null;

  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === active),
  );
  const prev = tabs[activeIndex - 1];
  const next = tabs[activeIndex + 1];

  const stats: { id: TabId; label: string; value: number }[] = [];
  if (project.features.length > 0)
    stats.push({
      id: "features",
      label: "Key features",
      value: project.features.length,
    });
  if (steps.length > 0)
    stats.push({ id: "how-it-works", label: "Process steps", value: steps.length });
  if (techCount > 0)
    stats.push({ id: "stack", label: "Technologies", value: techCount });

  function goTo(id: TabId) {
    setActive(id);
    // Keep the tab bar in view when jumping from the bottom of a long panel
    const node = tabRefs.current[tabs.findIndex((tab) => tab.id === id)];
    node?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    setActive(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div>
      {/* ---------- Pill tab bar ---------- */}
      <div className="-mx-1 overflow-x-auto px-1 py-1">
        <div
          role="tablist"
          aria-label="Project details"
          className="inline-flex gap-0.5 rounded-full border border-border bg-surface/60 p-1 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.6)] backdrop-blur-md"
        >
          {tabs.map((tab, index) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`project-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`project-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={[
                  "relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium",
                  "transition-colors duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted hover:bg-primary/5 hover:text-primary",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-tab-capsule"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-accent/30 bg-accent/10 shadow-[0_0_16px_-4px_rgb(34_211_238/0.5)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={[
                      "relative rounded-full px-1.5 text-xs tabular-nums transition-colors duration-200",
                      isActive
                        ? "bg-accent/20 text-accent"
                        : "bg-primary/5 text-muted",
                    ].join(" ")}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- Panel ---------- */}
      <div
        key={active}
        role="tabpanel"
        id={`project-panel-${active}`}
        aria-labelledby={`project-tab-${active}`}
        tabIndex={0}
        className="mt-10 min-h-72 animate-[fade-up_0.4s_var(--ease-standard)_both]"
      >
        {active === "overview" && (
          <Overview project={project} stats={stats} onJump={goTo} />
        )}
        {active === "features" && <Features features={project.features} />}
        {active === "how-it-works" && <Stepper steps={steps} />}
        {active === "stack" && <Stack project={project} />}
      </div>

      {/* ---------- Previous / next tab ---------- */}
      {(prev || next) && (
        <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
          {prev ? (
            <button
              type="button"
              onClick={() => goTo(prev.id)}
              className="group/nav inline-flex items-center gap-3 text-sm font-medium text-muted transition-colors duration-200 hover:text-primary"
            >
              <span className="grid size-9 place-items-center rounded-full border border-border transition-[border-color,background-color,color] duration-300 group-hover/nav:border-accent group-hover/nav:bg-accent group-hover/nav:text-background">
                <LuArrowLeft
                  className="size-4 transition-transform duration-300 ease-standard group-hover/nav:-translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
              <span className="text-left">
                <span className="block text-xs uppercase tracking-widest text-muted/70">
                  Previous
                </span>
                {prev.label}
              </span>
            </button>
          ) : (
            <span />
          )}
          {next && (
            <button
              type="button"
              onClick={() => goTo(next.id)}
              className="group/nav inline-flex items-center gap-3 text-sm font-medium text-muted transition-colors duration-200 hover:text-primary"
            >
              <span className="text-right">
                <span className="block text-xs uppercase tracking-widest text-muted/70">
                  Next
                </span>
                {next.label}
              </span>
              <span className="grid size-9 place-items-center rounded-full border border-border transition-[border-color,background-color,color] duration-300 group-hover/nav:border-accent group-hover/nav:bg-accent group-hover/nav:text-background">
                <LuArrowRight
                  className="size-4 transition-transform duration-300 ease-standard group-hover/nav:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}