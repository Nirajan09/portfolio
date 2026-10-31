import { memo, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiAxios,
  SiCelery,
  SiClerk,
  SiCloudinary,
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
  SiJsonwebtokens,
  SiLinux,
  SiLucide,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiRadixui,
  SiReact,
  SiReacthookform,
  SiReactrouter,
  SiRedis,
  SiScikitlearn,
  SiScipy,
  SiShadcnui,
  SiSqlite,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiZod,
} from "react-icons/si";

type TechMeta = { icon: IconType; color: string };

/* Keys are normalised names (lowercase, letters and digits only).
   Dark brand colours use a light tone so they stay visible on dark surfaces. */
const techMeta: Record<string, TechMeta> = {
  react: { icon: SiReact, color: "#61dafb" },
  nextjs: { icon: SiNextdotjs, color: "#e2e8f0" },
  typescript: { icon: SiTypescript, color: "#3b82f6" },
  javascript: { icon: SiJavascript, color: "#facc15" },
  tailwindcss: { icon: SiTailwindcss, color: "#38bdf8" },
  tailwind: { icon: SiTailwindcss, color: "#38bdf8" },
  shadcnui: { icon: SiShadcnui, color: "#e2e8f0" },
  shadcn: { icon: SiShadcnui, color: "#e2e8f0" },
  radixui: { icon: SiRadixui, color: "#e2e8f0" },
  radix: { icon: SiRadixui, color: "#e2e8f0" },
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
  mongoose: { icon: SiMongoose, color: "#e11d48" },
  mysql: { icon: SiMysql, color: "#38bdf8" },
  sqlite: { icon: SiSqlite, color: "#38bdf8" },
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
  scipy: { icon: SiScipy, color: "#8caae6" },
  vite: { icon: SiVite, color: "#646cff" },
  clerk: { icon: SiClerk, color: "#6c47ff" },
  cloudinary: { icon: SiCloudinary, color: "#3448c5" },
  jwt: { icon: SiJsonwebtokens, color: "#d63aff" },
  jsonwebtokens: { icon: SiJsonwebtokens, color: "#d63aff" },
  axios: { icon: SiAxios, color: "#5a29e4" },
  reactrouter: { icon: SiReactrouter, color: "#f44250" },
  reactrouterdom: { icon: SiReactrouter, color: "#f44250" },
  reacthookform: { icon: SiReacthookform, color: "#ec5990" },
  zod: { icon: SiZod, color: "#3e67b1" },
  lucide: { icon: SiLucide, color: "#f97316" },
  lucidereact: { icon: SiLucide, color: "#f97316" },
};

const FALLBACK_COLOR = "#22d3ee";

function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Resolves the matching icon and brand color for any tech name,
 * tolerating version suffixes ("React 19", "Next.js 16", "Express 5"),
 * parenthetical scopes ("Next.js 16 (App Router)"), and compound names.
 */
function resolveTechMeta(rawName: string): TechMeta | undefined {
  if (!rawName) return undefined;

  // 1. Direct normalized match
  const norm = normalize(rawName);
  if (techMeta[norm]) return techMeta[norm];

  // 2. Strip parenthetical content ("Next.js 16 (App Router)" -> "Next.js 16")
  const strippedParens = rawName.replace(/\(.*?\)/g, "").trim();
  const normParens = normalize(strippedParens);
  if (techMeta[normParens]) return techMeta[normParens];

  // 3. Strip trailing version numbers ("react19" -> "react", "nextjs16" -> "nextjs", "express5" -> "express")
  const withoutVersion = normParens.replace(/(?:v)?\d+[\d.]*\+?$/, "").trim();
  if (withoutVersion && techMeta[withoutVersion]) {
    return techMeta[withoutVersion];
  }

  // Also strip version words before normalizing ("Django 5.2.8" -> "Django" -> "django")
  const beforeVersion = strippedParens.replace(/\b(?:v)?\d+(?:\.\d+)*\+?\b/gi, "").trim();
  const normBeforeVersion = normalize(beforeVersion);
  if (normBeforeVersion && techMeta[normBeforeVersion]) {
    return techMeta[normBeforeVersion];
  }

  // 4. Keyword and compound string matching
  const lower = rawName.toLowerCase();
  if (lower.includes("next.js") || lower.includes("nextjs") || lower.includes("server action")) {
    return techMeta.nextjs;
  }
  if (lower.includes("react-router") || lower.includes("react router")) {
    return techMeta.reactrouter;
  }
  if (lower.includes("react-hook-form") || lower.includes("react hook form")) {
    return techMeta.reacthookform;
  }
  if (lower.includes("toastify")) {
    return techMeta.react;
  }
  if (lower.includes("next-themes")) {
    return techMeta.nextjs;
  }
  if (lower.includes("cors")) {
    return techMeta.express;
  }
  if (lower.includes("multer")) {
    return techMeta.nodejs;
  }
  if (lower.includes("yup")) {
    return techMeta.zod;
  }
  if (lower.includes("react") && !lower.includes("lucide")) {
    return techMeta.react;
  }
  if (lower.includes("django")) {
    return techMeta.django;
  }
  if (lower.includes("tailwind")) {
    return techMeta.tailwindcss;
  }
  if (lower.includes("node")) {
    return techMeta.nodejs;
  }
  if (lower.includes("express")) {
    return techMeta.express;
  }
  if (lower.includes("mongoose")) {
    return techMeta.mongoose;
  }
  if (lower.includes("mongo")) {
    return techMeta.mongodb;
  }
  if (lower.includes("clerk")) {
    return techMeta.clerk;
  }
  if (lower.includes("cloudinary")) {
    return techMeta.cloudinary;
  }
  if (lower.includes("radix")) {
    return techMeta.radixui;
  }
  if (lower.includes("shadcn")) {
    return techMeta.shadcnui;
  }
  if (lower.includes("stripe")) {
    return techMeta.stripe;
  }
  if (lower.includes("supabase")) {
    return techMeta.supabase;
  }
  if (lower.includes("jwt") || lower.includes("jsonwebtoken") || lower.includes("jwt-decode")) {
    return techMeta.jwt;
  }
  if (lower.includes("sqlite")) {
    return techMeta.sqlite;
  }
  if (lower.includes("postgres")) {
    return techMeta.postgresql;
  }
  if (lower.includes("lucide")) {
    return techMeta.lucide;
  }
  if (lower.includes("zod")) {
    return techMeta.zod;
  }
  if (lower.includes("scipy")) {
    return techMeta.scipy;
  }
  if (lower.includes("scikit") || lower.includes("sklearn")) {
    return techMeta.scikitlearn;
  }
  if (lower.includes("axios")) {
    return techMeta.axios;
  }
  if (lower.includes("vite")) {
    return techMeta.vite;
  }
  if (lower.includes("docker")) {
    return techMeta.docker;
  }
  if (lower.includes("git")) {
    return techMeta.git;
  }

  return undefined;
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
  const meta = resolveTechMeta(name);
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