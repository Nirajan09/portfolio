import { memo, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiCelery,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiShadcnui,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

type TechMeta = { icon: IconType; color: string };

/* Keys are normalised names (lowercase, letters and digits only), so
   "Next.js", "NextJS" and "next.js" all resolve to the same entry.
   Dark brand colours use a light tone so they stay visible on the surface. */
const techMeta: Record<string, TechMeta> = {
  react: { icon: SiReact, color: "#61dafb" },
  nextjs: { icon: SiNextdotjs, color: "#e2e8f0" },
  typescript: { icon: SiTypescript, color: "#3b82f6" },
  javascript: { icon: SiJavascript, color: "#facc15" },
  tailwindcss: { icon: SiTailwindcss, color: "#38bdf8" },
  tailwind: { icon: SiTailwindcss, color: "#38bdf8" },
  shadcnui: { icon: SiShadcnui, color: "#e2e8f0" },
  django: { icon: SiDjango, color: "#34d399" },
  djangorest: { icon: SiDjango, color: "#34d399" },
  djangorestframework: { icon: SiDjango, color: "#34d399" },
  drf: { icon: SiDjango, color: "#34d399" },
  nodejs: { icon: SiNodedotjs, color: "#84cc16" },
  node: { icon: SiNodedotjs, color: "#84cc16" },
  expressjs: { icon: SiExpress, color: "#e2e8f0" },
  express: { icon: SiExpress, color: "#e2e8f0" },
  postgresql: { icon: SiPostgresql, color: "#60a5fa" },
  postgres: { icon: SiPostgresql, color: "#60a5fa" },
  mongodb: { icon: SiMongodb, color: "#22c55e" },
  mysql: { icon: SiMysql, color: "#38bdf8" },
  prisma: { icon: SiPrisma, color: "#e2e8f0" },
  supabase: { icon: SiSupabase, color: "#34d399" },
  firebase: { icon: SiFirebase, color: "#fbbf24" },
  redis: { icon: SiRedis, color: "#f87171" },
  celery: { icon: SiCelery, color: "#84cc16" },
  stripe: { icon: SiStripe, color: "#818cf8" },
  docker: { icon: SiDocker, color: "#38bdf8" },
  linux: { icon: SiLinux, color: "#fbbf24" },
  git: { icon: SiGit, color: "#f97316" },
  github: { icon: SiGithub, color: "#e2e8f0" },
  githubactions: { icon: SiGithubactions, color: "#60a5fa" },
  vercel: { icon: SiVercel, color: "#e2e8f0" },
  postman: { icon: SiPostman, color: "#fb923c" },
  python: { icon: SiPython, color: "#60a5fa" },
  fastapi: { icon: SiFastapi, color: "#2dd4bf" },
  flask: { icon: SiFlask, color: "#e2e8f0" },
  scikitlearn: { icon: SiScikitlearn, color: "#fb923c" },
  pandas: { icon: SiPandas, color: "#a78bfa" },
  numpy: { icon: SiNumpy, color: "#38bdf8" },
};

const FALLBACK_COLOR = "#22d3ee";

function normalize(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Technology tag with a brand-coloured hover. Unknown names still render:
 * they just have no icon and use the site's accent colour.
 *
 * Put it inside any element; the <li> is the stable hover target and only the
 * inner pill moves, so there is no flicker at the edges.
 */
type TechChipProps = {
  name: string;
  as?: "li" | "span";
};

export const TechChip = memo(function TechChip({
  name,
  as: Component = "li",
}: TechChipProps) {
  const meta = techMeta[normalize(name)];
  const Icon = meta?.icon;
  const color = meta?.color ?? FALLBACK_COLOR;

  return (
    <Component
      className="group/chip"
      style={{ "--brand": color } as CSSProperties}
    >
      <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background-secondary/70 px-3 py-1.5 text-sm font-medium text-secondary transition-[translate,border-color,background-color,color,box-shadow] duration-200 ease-standard group-hover/chip:-translate-y-0.5 group-hover/chip:border-(--brand)/50 group-hover/chip:bg-(--brand)/10 group-hover/chip:text-primary group-hover/chip:shadow-[0_6px_20px_-8px_var(--brand)]">
        {Icon && (
          <Icon
            className="size-4 text-muted transition-[color,scale] duration-200 ease-standard group-hover/chip:scale-125 group-hover/chip:text-(--brand)"
            aria-hidden="true"
          />
        )}
        {name}
      </span>
    </Component>
  );
});