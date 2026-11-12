import { memo, type CSSProperties } from "react";
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

export const SkillCard = memo(function SkillCard({ group }: SkillCardProps) {
  const GroupIcon = groupIcons[group.id];

  return (
    <div className="group h-full">
      <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-surface/60 p-4 backdrop-blur-xs transition-[transform,border-color,box-shadow] duration-300 ease-standard group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-glow sm:p-6">
        <div>
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background-secondary text-accent transition-colors duration-200 group-hover:border-accent/40 group-hover:bg-accent/10 sm:size-11">
              <GroupIcon className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-primary sm:text-lg">
                {group.title}
              </h3>
              <p className="mt-0.5 font-mono text-[11px] text-muted">
                {group.skills.length} Technologies
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-secondary/85 sm:text-sm">
            {group.description}
          </p>

          <div
            aria-hidden="true"
            className="my-4 h-px bg-border/60"
          />

          {/* Technology Pills */}
          <ul className="flex flex-wrap gap-2 sm:gap-2.5">
            {group.skills.map((skill) => {
              const { icon: SkillIcon, color } = skillMeta[skill];
              return (
                <li
                  key={skill}
                  className="group/chip"
                  style={{ "--brand": color } as CSSProperties}
                >
                  <span className="inline-flex transform-gpu will-change-transform items-center gap-1.5 rounded-xl border border-border/70 bg-background/60 px-2.5 py-1.5 text-xs font-medium text-secondary transition-all duration-200 ease-standard group-hover/chip:-translate-y-0.5 group-hover/chip:border-(--brand)/50 group-hover/chip:bg-(--brand)/10 group-hover/chip:text-primary sm:gap-2 sm:px-3 sm:text-sm">
                    <SkillIcon
                      className="size-4 shrink-0 text-muted transition-all duration-200 ease-standard group-hover/chip:scale-110 group-hover/chip:text-(--brand)"
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
});
