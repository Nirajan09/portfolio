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
import type { SkillGroup, SkillGroupId, SkillName } from "@/data/skills";

/* Group icons */
const groupIcons: Record<SkillGroupId, IconType> = {
  frontend: LuLayoutTemplate,
  backend: LuServerCog,
  tools: LuWrench,
};

/* Skill icons + brand colors */
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
};

export function SkillCard({ group }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const GroupIcon = groupIcons[group.id];

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
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-linear-to-b from-surface/90 via-surface/60 to-background-secondary/90 p-5 sm:p-6 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300 ease-standard group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-[0_16px_40px_-15px_rgba(0,0,0,0.85),0_0_25px_-5px_rgba(34,211,238,0.18)]">
        {/* Dynamic Spotlight that follows the cursor on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(350px circle at var(--mx, 50%) var(--my, 0%), rgb(34 211 238 / 0.12), transparent 70%)",
          }}
        />

        {/* Top hairline accent line that sweeps across on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-[scale] duration-500 ease-standard group-hover:scale-x-100"
        />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background-secondary text-accent transition-all duration-300 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent/15 group-hover:shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)]">
              <GroupIcon className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-semibold text-primary">
                {group.title}
              </h3>
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] font-mono text-muted">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span>{group.skills.length} Technologies</span>
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-secondary/85">
            {group.description}
          </p>

          <div
            aria-hidden="true"
            className="my-4 h-px bg-linear-to-r from-border/90 via-border/50 to-transparent"
          />

          {/* Interactive Technology Pills (Preserved UI layout with elevated visual polish) */}
          <ul className="flex flex-wrap gap-2 sm:gap-2.5">
            {group.skills.map((skill) => {
              const { icon: SkillIcon, color } = skillMeta[skill];
              return (
                <li
                  key={skill}
                  className="group/chip"
                  style={{ "--brand": color } as CSSProperties}
                >
                  <span className="inline-flex transform-gpu will-change-transform items-center gap-2 rounded-xl border border-border/70 bg-background/60 px-3 py-1.5 text-xs sm:text-sm font-medium text-secondary transition-all duration-200 ease-standard group-hover/chip:-translate-y-0.5 group-hover/chip:border-(--brand)/50 group-hover/chip:bg-(--brand)/10 group-hover/chip:text-primary group-hover/chip:shadow-[0_4px_16px_-4px_var(--brand)]">
                    <SkillIcon
                      className="size-4 shrink-0 text-muted transition-all duration-200 ease-standard group-hover/chip:scale-115 group-hover/chip:text-(--brand)"
                      aria-hidden="true"
                    />
                    <span>{skill}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}