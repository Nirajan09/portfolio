import { BookOpen, Briefcase, Folder, ImageIcon, type LucideIcon } from "lucide-react";
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
const covers: Record<string, { icon: LucideIcon; tone: Tone }> = {
  "book-recommendation-system": { icon: BookOpen, tone: "cyan" },
  "image-sharing-platform": { icon: ImageIcon, tone: "blue" },
  "job-portal": { icon: Briefcase, tone: "violet" },
};

type ProjectCoverProps = {
  project: Project;
  /** Scale up on parent `group` hover (cards only). */
  zoom?: boolean;
  className?: string;
};

export function ProjectCover({ project, zoom = false, className }: ProjectCoverProps) {
  const art = covers[project.slug] ?? { icon: Folder, tone: "cyan" as Tone };
  const Icon = art.icon;
  const motion = zoom
    ? "transition-transform duration-500 ease-standard group-hover:scale-105"
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
          {/* Subtle ambient matching backdrop fill */}
          <Image
            src={project.cover.src}
            alt=""
            fill
            aria-hidden="true"
            className="scale-110 object-cover blur-2xl opacity-40 brightness-50"
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
            "absolute inset-0 bg-linear-to-br via-surface to-background-secondary",
            toneClasses[art.tone],
            motion,
          )}
        >
          {/* Faint grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(148_163_184/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.07)_1px,transparent_1px)] bg-size-[28px_28px]" />

          {/* Mini browser window */}
          <div className="absolute inset-x-[12%] inset-y-[15%] flex flex-col overflow-hidden rounded-lg border border-border bg-background/70 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
              <span className="size-2 rounded-full bg-border" />
              <span className="size-2 rounded-full bg-border" />
              <span className="size-2 rounded-full bg-border" />
            </div>
            <div className="flex flex-1 items-center gap-4 px-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                <Icon className="size-6" />
              </div>
              <div className="flex-1 space-y-2.5">
                <div className="h-2 w-3/4 rounded-full bg-border" />
                <div className="h-2 w-1/2 rounded-full bg-border/70" />
                <div className="h-2 w-2/3 rounded-full bg-border/50" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}