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

// Generated cover art, used until a real screenshot is set on the project.
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
    ? "transition-transform duration-500 ease-(--ease-standard) group-hover:scale-105"
    : "";

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden bg-background-secondary",
        className,
      )}
    >
      {project.cover ? (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={cn("object-cover", motion)}
        />
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-linear-to-br via-surface to-background-secondary",
            toneClasses[art.tone],
            motion,
          )}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(148_163_184/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.07)_1px,transparent_1px)] bg-size-[28px_28px]" />
          <div className="relative flex size-16 items-center justify-center rounded-xl border border-border bg-background/60 text-primary backdrop-blur-sm">
            <Icon className="size-8" />
          </div>
        </div>
      )}
    </div>
  );
}