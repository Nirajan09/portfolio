"use client";

import { memo, useCallback, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import type { IconType } from "react-icons";
import {
  LuBriefcase,
  LuCalendar,
  LuGraduationCap,
  LuLaptop,
  LuMapPin,
} from "react-icons/lu";
import type { Education } from "@/data/education";
import type { Experience } from "@/types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Entry = {
  id: string;
  title: string;
  organization: string;
  period: string;
  current?: boolean;
  location?: string;
  mode?: string;
  employmentType?: string;
  department?: string;
  technologies?: readonly string[];
  focus?: string;
  status?: string;
  initials?: string;
  type: "experience" | "education";
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: Math.min(index, 3) * 0.08 },
  }),
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 20, delay: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE, delay: 0.15 },
  },
};

const TimelineItem = memo(function TimelineItem({
  entry,
  index,
  icon: Icon,
}: {
  entry: Entry;
  index: number;
  icon: IconType;
}) {
  const itemRef = useRef<HTMLLIElement>(null);

  // Synchronized rail lighting as entry crosses viewport reading line
  const { scrollYProgress: reached } = useScroll({
    target: itemRef,
    offset: ["start 68%", "start 52%"],
  });

  const glow = useTransform(reached, [0, 1], [0, 1]);
  const glowScale = useTransform(reached, [0, 1], [0.85, 1]);
  const iconColor = useTransform(reached, [0, 1], ["#9fb0c7", "#22d3ee"]);

  return (
    <motion.li
      ref={itemRef}
      custom={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group relative pl-10 sm:pl-16"
    >
      {/* Timeline Node */}
      <motion.span
        variants={nodeVariants}
        className="absolute left-0 top-3.5 z-10 flex size-9 sm:size-10 items-center justify-center rounded-full border border-border bg-background-secondary shadow-md transition-transform duration-300 ease-out group-hover:scale-110"
      >
        {/* Glow when reached by scroll */}
        <motion.span
          aria-hidden="true"
          style={{ opacity: glow, scale: glowScale }}
          className="absolute inset-0 rounded-full border border-accent/60 bg-accent/15 shadow-[0_0_14px_rgba(34,211,238,0.4)]"
        />

        <motion.span style={{ color: iconColor }} className="relative flex">
          <Icon className="size-4" aria-hidden="true" />
        </motion.span>
      </motion.span>

      {/* Card */}
      <motion.div variants={cardVariants}>
        <div className="relative rounded-xl border border-border/80 bg-surface/70 p-4 backdrop-blur-xs transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow sm:p-6">
          <div className="relative">
            {/* Header: Organization Monogram + Role Title + Status & Period Badges */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                {/* Organization Monogram / Emblem */}
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl border text-xs sm:text-sm font-display font-bold tracking-wider transition-all duration-200 ${
                    entry.current
                      ? "border-accent/40 bg-accent/10 text-accent shadow-[0_0_18px_-4px_rgba(34,211,238,0.3)]"
                      : "border-border/80 bg-background-secondary/80 text-primary group-hover:border-accent/30 group-hover:text-accent"
                  }`}
                  aria-hidden="true"
                >
                  {entry.type === "education" ? (
                    <LuGraduationCap className="size-5 text-accent" />
                  ) : entry.initials ? (
                    <span>{entry.initials}</span>
                  ) : (
                    <Icon className="size-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base sm:text-lg font-semibold tracking-tight text-primary transition-colors duration-200 group-hover:text-accent">
                    {entry.title}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                    <span className="font-medium text-secondary/90">
                      {entry.organization}
                    </span>
                    {entry.department && (
                      <>
                        <span className="text-muted/50" aria-hidden="true">
                          •
                        </span>
                        <span className="text-xs text-muted">
                          {entry.department}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Status (Current Role / Graduated) & Date Period Badges */}
              <div className="flex flex-wrap items-center sm:flex-col sm:items-end gap-2 shrink-0">
                {entry.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                    Current Role
                  </span>
                )}

                {entry.status && (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                      entry.status.toLowerCase() === "graduated"
                        ? "border border-emerald-500/35 bg-emerald-500/10 text-emerald-300 shadow-[0_0_12px_-3px_rgba(16,185,129,0.3)]"
                        : "border border-accent/35 bg-accent/10 text-accent"
                    }`}
                  >
                    <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                    {entry.status}
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/60 px-3 py-1 text-xs font-mono text-secondary transition-colors duration-200 group-hover:border-accent/30 group-hover:text-primary">
                  <LuCalendar className="size-3.5 text-muted" aria-hidden="true" />
                  {entry.period}
                </span>
              </div>
            </div>

            {/* Metadata Bar: Employment Type, Mode, Location */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
              {entry.employmentType && (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-background/40 px-2.5 py-0.5 font-medium text-secondary">
                  <span className="size-1.5 rounded-full bg-accent/80" />
                  {entry.employmentType}
                </span>
              )}

              {entry.mode && (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-background/40 px-2.5 py-0.5 text-secondary/80">
                  <LuLaptop className="size-3 text-muted" aria-hidden="true" />
                  {entry.mode}
                </span>
              )}

              {entry.location && (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-background/40 px-2.5 py-0.5 text-secondary/80">
                  <LuMapPin className="size-3 text-muted" aria-hidden="true" />
                  {entry.location}
                </span>
              )}
            </div>

            {/* Core Technologies (Clean Micro-Chips) */}
            {entry.technologies && entry.technologies.length > 0 && (
              <div className="mt-4 border-t border-border/50 pt-3.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 text-[11px] font-mono uppercase tracking-wider text-muted">
                    Stack:
                  </span>
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md border border-border/70 bg-background-secondary/70 px-2.5 py-0.5 text-xs font-medium text-secondary transition-colors duration-200 group-hover:border-accent/25 group-hover:text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Academic Focus / Affiliation */}
            {entry.focus && (
              <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-3.5 text-xs text-secondary/80">
                <LuGraduationCap
                  className="size-3.5 text-accent shrink-0"
                  aria-hidden="true"
                />
                <span>{entry.focus}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.li>
  );
});

const Timeline = memo(function Timeline({ entries, icon }: { entries: Entry[]; icon: IconType }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // The rail fills smoothly as list scrolls through viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 50%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const headTop = useTransform(progress, (v) => `${v * 100}%`);
  const headOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* Rail: track + glow + gradient fill + comet head */}
      <div
        aria-hidden="true"
        className="absolute bottom-5 left-4.5 sm:left-5 top-5 w-0.5 -translate-x-1/2"
      >
        <span className="absolute inset-0 rounded-full bg-border/80" />

        {/* Soft glow behind the rail fill */}
        <motion.span
          style={{ scaleY: progress, transformOrigin: "top" }}
          className="absolute -inset-x-1 inset-y-0 rounded-full bg-accent/40 blur-sm"
        />

        {/* Gradient fill */}
        <motion.span
          style={{ scaleY: progress, transformOrigin: "top" }}
          className="absolute inset-0 rounded-full bg-linear-to-b from-accent via-blue to-violet"
        />

        {/* Comet head */}
        <motion.span
          style={{ top: headTop, opacity: headOpacity }}
          className="absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_3px_rgb(34_211_238/0.25),0_0_16px_4px_rgb(34_211_238/0.6)]"
        />
      </div>

      <ol className="space-y-6">
        {entries.map((entry, index) => (
          <TimelineItem key={entry.id} entry={entry} index={index} icon={icon} />
        ))}
      </ol>
    </div>
  );
});

type TabId = "experience" | "education";

function getOrganizationInitials(name: string): string {
  if (name.includes("Cherdung")) return "CIT";
  if (name.includes("Vyomite")) return "VIT";
  if (name.includes("Orchid")) return "OIC";
  if (name.includes("St. Lawrence")) return "SLC";
  if (name.includes("Centennial")) return "CSS";
  return name.slice(0, 3).toUpperCase();
}

type CareerTimelineProps = {
  experience: readonly Experience[];
  education: readonly Education[];
};

export const CareerTimeline = memo(function CareerTimeline({ experience, education }: CareerTimelineProps) {
  const [active, setActive] = useState<TabId>("experience");
  const uid = useId();

  const experienceEntries = useMemo<Entry[]>(
    () =>
      experience.map((item) => ({
        id: item.id,
        title: item.role,
        organization: item.company,
        period: item.period,
        current: item.current,
        location: item.location,
        mode: item.mode,
        employmentType: item.employmentType,
        department: item.department,
        technologies: item.technologies,
        initials: getOrganizationInitials(item.company),
        type: "experience",
      })),
    [experience],
  );

  const educationEntries = useMemo<Entry[]>(
    () =>
      education.map((item) => ({
        id: item.id,
        title: item.degree,
        organization: item.institution,
        period: item.period,
        location: item.location,
        focus: item.focus,
        status: item.status,
        current: item.current,
        initials: getOrganizationInitials(item.institution),
        type: "education",
      })),
    [education],
  );

  const tabs: { id: TabId; label: string; icon: IconType; count: number }[] = useMemo(
    () => [
      {
        id: "experience",
        label: "Work Experience",
        icon: LuBriefcase,
        count: experienceEntries.length,
      },
      {
        id: "education",
        label: "Education",
        icon: LuGraduationCap,
        count: educationEntries.length,
      },
    ],
    [experienceEntries.length, educationEntries.length],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const next: TabId = active === "experience" ? "education" : "experience";
      setActive(next);
      document.getElementById(`${uid}-tab-${next}`)?.focus();
    },
    [active, uid],
  );

  return (
    <div>
      {/* Tab Switcher */}
      <div
        role="tablist"
        aria-label="Experience and education"
        onKeyDown={handleKeyDown}
        className="relative mb-8 grid w-full grid-cols-2 rounded-xl border border-border/80 bg-surface/75 p-1 backdrop-blur-md sm:inline-flex sm:w-auto"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              id={`${uid}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={`relative flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 rounded-lg px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer ${
                selected ? "text-primary" : "text-muted hover:text-secondary"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={`${uid}-pill`}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg border border-accent/40 bg-accent/15 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <TabIcon className="relative size-3.5 sm:size-4 shrink-0" aria-hidden="true" />
              <span className="relative truncate">
                <span className="sm:hidden">{tab.id === "experience" ? "Experience" : "Education"}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
              <span
                className={`relative rounded-full px-1.5 py-0.2 text-[10px] sm:text-[11px] font-mono tabular-nums transition-colors duration-200 ${
                  selected
                    ? "bg-accent/20 text-accent font-semibold"
                    : "bg-border/60 text-muted"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          {active === "experience" ? (
            <Timeline entries={experienceEntries} icon={LuBriefcase} />
          ) : (
            <Timeline entries={educationEntries} icon={LuGraduationCap} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});