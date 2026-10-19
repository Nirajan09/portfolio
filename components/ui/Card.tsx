import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  /** Adds the standard hover treatment (lift, border, glow) for clickable cards. */
  interactive?: boolean;
  /** "none" lets media run edge to edge; the content then pads itself. */
  padding?: "md" | "none";
  className?: string;
  children: ReactNode;
};

export function Card({
  interactive = false,
  padding = "md",
  className,
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/80 bg-surface/70 backdrop-blur-xs",
        padding === "md" && "p-6",
        interactive &&
          "transform-gpu will-change-transform transition-[transform,translate,border-color,box-shadow] duration-200 ease-standard hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow",
        className,
      )}
    >
      {children}
    </div>
  );
}