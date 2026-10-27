"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
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
import { Card } from "@/components/ui/Card";
import type { Education } from "@/data/education";
import type { Experience } from "@/types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* One shape for both tabs, so a single Timeline renders either list. */
type Entry = {
  id: string;
  title: string;
  organization: string;
  period: string;
  current?: boolean;
  location?: string;
  mode?: string;
  highlights?: readonly string[];
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: Math.min(index, 3) * 0.08 },
  }),
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 20, delay: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE, delay: 0.15 },
  },
};

function TimelineItem({
  entry,
  index,
  icon: Icon,
}: {
  entry: Entry;
  index: number;
  icon: IconType;
}) {
  const ref = useRef<HTMLLIElement>(null);

  // 0 -> 1 as this entry's top crosses the "reading line" of the viewport.
  // That moment is what lights the node up, in sync with the progress line.
  const { scrollYProgress: reached } = useScroll({
    target: ref,
    offset: ["start 62%", "start 50%"],
  });

  const glow = useTransform(reached, [0, 1], [0, 1]);
  const glowScale = useTransform(reached, [0, 1], [0.8, 1]);
  // Hex values mirror --text-muted and --accent (motion can't interpolate var()).
  const iconColor = useTransform(reached, [0, 1], ["#9fb0c7", "#22d3ee"]);

  return (
    <motion.li
      ref={ref}
      custom={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group relative pl-16"
    >
      {/* Node */}
      <motion.span
        variants={nodeVariants}
        className="absolute left-0 top-3 z-10 flex size-10 items-center justify-center rounded-full border border-border bg-background-secondary transition-[scale] duration-300 ease-standard group-hover:scale-110"
      >
        {/* Lit state: fades and scales in when the progress line arrives */}
        <motion.span
          aria-hidden="true"
          style={{ opacity: glow, scale: glowScale }}
          className="absolute inset-0 rounded-full border border-accent/60 bg-accent/15 shadow-glow"
        />
        {entry.current && (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-accent/25"
          />
        )}
        <motion.span style={{ color: iconColor }} className="relative flex">
          <Icon className="size-4" aria-hidden="true" />
        </motion.span>
      </motion.span>

      {/* Card */}
      <motion.div variants={cardVariants}>
        <Card className="relative h-full overflow-hidden transform-gpu will-change-transform transition-[transform,translate,border-color,box-shadow] duration-300 ease-standard group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:shadow-glow">
          {/* Accent bar that grows down the left edge on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-linear-to-b from-accent via-blue to-violet transition-[scale] duration-500 ease-standard group-hover:scale-y-100"
          />

          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold text-primary">
                {entry.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-accent">
                {entry.organization}
              </p>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background-secondary/70 px-2.5 py-1 text-xs font-medium text-secondary transition-colors duration-300 group-hover:border-accent/30 group-hover:text-primary">
              <LuCalendar className="size-3.5 text-muted" aria-hidden="true" />
              {entry.period}
            </span>
          </div>

          {(entry.current || entry.location || entry.mode) && (
            <ul className="mt-4 flex flex-wrap items-center gap-2 text-xs text-secondary/90">
              {entry.current && (
                <li className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 font-medium text-success">
                  <span className="relative flex size-1.5">
                    <span
                      aria-hidden="true"
                      className="absolute inline-flex size-full animate-ping rounded-full bg-success/60"
                    />
                    <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                  </span>
                  Current
                </li>
              )}
              {entry.location && (
                <li className="inline-flex items-center gap-1.5">
                  <LuMapPin className="size-3.5" aria-hidden="true" />
                  {entry.location}
                </li>
              )}
              {entry.mode && (
                <li className="inline-flex items-center gap-1.5">
                  <LuLaptop className="size-3.5" aria-hidden="true" />
                  {entry.mode}
                </li>
              )}
            </ul>
          )}

          {entry.highlights && entry.highlights.length > 0 && (
            <ul className="mt-4 space-y-2 border-t border-border/60 pt-4 text-xs sm:text-sm text-secondary/90">
              {entry.highlights.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </motion.div>
    </motion.li>
  );
}

function Timeline({ entries, icon }: { entries: Entry[]; icon: IconType }) {
  const ref = useRef<HTMLDivElement>(null);

  // The rail fills as the list scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 62%", "end 50%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  // Comet head position along the rail, and its fade at both ends.
  const headTop = useTransform(progress, (v) => `${v * 100}%`);
  const headOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative">
      {/* Rail: track + glow + gradient fill + comet head, centred on x = 20px */}
      <div
        aria-hidden="true"
        className="absolute bottom-5 left-5 top-5 w-0.5 -translate-x-1/2"
      >
        <span className="absolute inset-0 rounded-full bg-border" />

        {/* Soft glow behind the fill */}
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
}

type TabId = "experience" | "education";

type CareerTimelineProps = {
  experience: readonly Experience[];
  education: readonly Education[];
};

export function CareerTimeline({ experience, education }: CareerTimelineProps) {
  const [active, setActive] = useState<TabId>("experience");
  const uid = useId();

  const experienceEntries: Entry[] = experience.map((item) => ({
    id: item.id,
    title: item.role,
    organization: item.company,
    period: item.period,
    current: item.current,
    location: item.location,
    mode: item.mode,
    highlights: item.highlights,
  }));

  const educationEntries: Entry[] = education.map((item) => ({
    id: item.id,
    title: item.degree,
    organization: item.institution,
    period: item.period,
  }));

  const tabs: { id: TabId; label: string; icon: IconType; count: number }[] = [
    { id: "experience", label: "Experience", icon: LuBriefcase, count: experienceEntries.length },
    { id: "education", label: "Education", icon: LuGraduationCap, count: educationEntries.length },
  ];

  // Left/Right arrows move between tabs, as in the WAI-ARIA tabs pattern.
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next: TabId = active === "experience" ? "education" : "experience";
    setActive(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Experience and education"
        onKeyDown={handleKeyDown}
        className="relative mb-8 inline-flex rounded-lg border border-border bg-surface/70 p-1 backdrop-blur-sm"
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
              className={`relative flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                selected ? "text-primary" : "text-muted hover:text-secondary"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={`${uid}-pill`}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-md border border-accent/40 bg-accent/15"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <TabIcon className="relative size-4" aria-hidden="true" />
              <span className="relative">{tab.label}</span>
              <span
                className={`relative rounded-full px-1.5 text-xs tabular-nums transition-colors duration-200 ${
                  selected ? "bg-accent/20 text-accent" : "bg-border/60 text-muted"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: EASE }}
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
}