"use client";

import { useRef, type CSSProperties, type MouseEvent } from "react";
import type { IconType } from "react-icons";
import { LuLayoutTemplate, LuServerCog, LuWrench } from "react-icons/lu";
import {
  SiDjango,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Card } from "@/components/ui/Card";
import type { SkillGroup, SkillGroupId, SkillName } from "@/data/skills";

/* Group icons */
const groupIcons: Record<SkillGroupId, IconType> = {
  frontend: LuLayoutTemplate,
  backend: LuServerCog,
  tools: LuWrench,
};

/* Skill icons + brand colour shown on hover.
   Brands whose official colour is black/dark use a light tone so they stay
   visible on the dark surface. Record<SkillName, ...> makes TypeScript fail
   if a skill is added to data/skills.ts without an icon. */
const skillMeta: Record<SkillName, { icon: IconType; color: string }> = {
  React: { icon: SiReact, color: "#61dafb" },
  "Next.js": { icon: SiNextdotjs, color: "#e2e8f0" },
  TypeScript: { icon: SiTypescript, color: "#3b82f6" },
  TailwindCSS: { icon: SiTailwindcss, color: "#38bdf8" },
  "ShadCN UI": { icon: SiShadcnui, color: "#e2e8f0" },
  Django: { icon: SiDjango, color: "#34d399" },
  PostgreSQL: { icon: SiPostgresql, color: "#60a5fa" },
  "Node.js": { icon: SiNodedotjs, color: "#84cc16" },
  MongoDB: { icon: SiMongodb, color: "#22c55e" },
  "Express.js": { icon: SiExpress, color: "#e2e8f0" },
  Docker: { icon: SiDocker, color: "#38bdf8" },
  Linux: { icon: SiLinux, color: "#fbbf24" },
  Git: { icon: SiGit, color: "#f97316" },
  GitHub: { icon: SiGithub, color: "#e2e8f0" },
  Postman: { icon: SiPostman, color: "#fb923c" },
};

type SkillCardProps = {
  group: SkillGroup;
  /** 0-based position, shown as "01", "02", ... */
  index: number;
};

export function SkillCard({ group, index }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const GroupIcon = groupIcons[group.id];

  // Cursor-follow spotlight: only writes two CSS variables, so React never
  // re-renders while the pointer moves.
  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="group h-full">
      <Card className="relative h-full overflow-hidden transition-[border-color,translate,box-shadow] duration-300 ease-standard hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
        {/* Spotlight that follows the cursor (hidden until hover) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), rgb(34 211 238 / 0.10), transparent 70%)",
          }}
        />

        {/* Accent line draws across the top edge on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-[scale] duration-500 ease-standard group-hover:scale-x-100"
        />

        {/* Oversized index number as a quiet decorative detail */}
        {/* <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-7xl font-bold leading-none text-primary/4 transition-colors duration-300 group-hover:text-accent/10"
        >
          {String(index + 1).padStart(2, "0")}
        </span> */}

        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background-secondary text-accent transition-[scale,rotate,border-color,background-color] duration-300 ease-standard group-hover:-rotate-3 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10">
              <GroupIcon className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold text-primary">
                {group.title}
              </h3>
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted">
                <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                {group.skills.length} technologies
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {group.description}
          </p>

          <div
            aria-hidden="true"
            className="my-5 h-px bg-linear-to-r from-border via-border/60 to-transparent"
          />

          <ul className="flex flex-wrap gap-2">
            {group.skills.map((skill) => {
              const { icon: SkillIcon, color } = skillMeta[skill];
              return (
                // The li is the stable hover target; only the inner pill moves,
                // so there is no flicker at its edges.
                <li
                  key={skill}
                  className="group/chip"
                  style={{ "--brand": color } as CSSProperties}
                >
                  <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background-secondary/70 px-3 py-2 text-sm font-medium text-secondary transition-[translate,border-color,background-color,color,box-shadow] duration-200 ease-standard group-hover/chip:-translate-y-0.5 group-hover/chip:border-(--brand)/50 group-hover/chip:bg-(--brand)/10 group-hover/chip:text-primary group-hover/chip:shadow-[0_6px_20px_-8px_var(--brand)]">
                    <SkillIcon
                      className="size-4 text-muted transition-[color,scale] duration-200 ease-standard group-hover/chip:scale-125 group-hover/chip:text-(--brand)"
                      aria-hidden="true"
                    />
                    {skill}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Card>
    </div>
  );
}