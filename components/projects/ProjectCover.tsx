import type { IconType } from "react-icons";
import { LuBookOpen, LuBriefcase, LuFolder, LuImage } from "react-icons/lu";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type Tone = "cyan" | "blue" | "violet";

const toneClasses: Record<Tone, string> = {
  cyan: "from-accent/25",
  blue: "from-blue/25",
  violet: "from-violet/25",
};

// Generated cover art, used until a real screenshot is set on `project.cover`.
const covers: Record<string, { icon: IconType; tone: Tone }> = {
  "book-recommendation-system": { icon: LuBookOpen, tone: "cyan" },
  "image-sharing-platform": { icon: LuImage, tone: "blue" },
  "job-portal": { icon: LuBriefcase, tone: "violet" },
};

type ProjectCoverProps = {
  project: Project;
  /** Scale up on parent `group` hover (cards only). */
  zoom?: boolean;
  className?: string;
};

export function ProjectCover({ project, zoom = false, className }: ProjectCoverProps) {
  const art = covers[project.slug] ?? { icon: LuFolder, tone: "cyan" as Tone };
  const Icon = art.icon;
  const motion = zoom
    ? "transform-gpu will-change-transform transition-transform duration-700 ease-standard group-hover:scale-[1.04]"
    : "";

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden bg-background-secondary",
        className,
      )}
    >
      {project.cover ? (
        <>
          {/* Subtle ambient matching backdrop fill that blooms on hover */}
          <Image
            src={project.cover.src}
            alt=""
            fill
            aria-hidden="true"
            className="scale-110 object-cover blur-2xl opacity-40 brightness-50 transform-gpu transition-all duration-700 ease-standard group-hover:scale-125 group-hover:opacity-70 group-hover:brightness-75"
          />
          {/* Full uncropped application screenshot */}
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={cn("object-contain object-center", motion)}
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-linear-to-br via-surface to-background-secondary transition-[background] duration-500",
            toneClasses[art.tone],
            motion,
          )}
        >
          {/* Ambient radial glow */}
          <span
            className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-accent/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
          />

          {/* Faint grid with subtle opacity shift */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(148_163_184/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.07)_1px,transparent_1px)] bg-size-[28px_28px] transition-opacity duration-500 group-hover:opacity-90" />

          {/* Mini browser window with smooth lift & colored traffic dots */}
          <div className="absolute inset-x-[10%] inset-y-[12%] flex flex-col overflow-hidden rounded-xl border border-border/80 bg-background/80 shadow-2xl backdrop-blur-md transform-gpu will-change-transform transition-[transform,border-color,box-shadow] duration-500 ease-standard group-hover:scale-[1.02] group-hover:border-accent/40 group-hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-1.5 border-b border-border/70 bg-background-secondary/60 px-3.5 py-2.5">
              <span className="size-2 rounded-full bg-rose-500/80 transition-all duration-300 group-hover:bg-rose-500 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
              <span className="size-2 rounded-full bg-amber-400/80 transition-all duration-300 group-hover:bg-amber-400 group-hover:shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
              <span className="size-2 rounded-full bg-emerald-400/80 transition-all duration-300 group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
              <span className="ml-2 h-1.5 w-16 rounded-full bg-border/60 transition-colors duration-300 group-hover:bg-border" />
            </div>
            <div className="flex flex-1 items-center gap-5 px-6">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-border bg-surface/90 text-accent transform-gpu will-change-transform transition-[transform,border-color,background-color,box-shadow] duration-500 ease-standard group-hover:scale-110 group-hover:border-accent/60 group-hover:bg-accent/15 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]">
                <Icon className="size-7 transition-transform duration-500 group-hover:rotate-6" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="h-2.5 w-3/4 rounded-full bg-linear-to-r from-accent/40 to-blue/40 transition-all duration-500 group-hover:from-accent/70 group-hover:to-blue/70" />
                <div className="h-2 w-1/2 rounded-full bg-border/80 transition-colors duration-300 group-hover:bg-border" />
                <div className="h-2 w-2/3 rounded-full bg-border/50 transition-colors duration-300 group-hover:bg-border/70" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}