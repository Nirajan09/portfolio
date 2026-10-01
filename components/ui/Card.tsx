import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  /** Adds the standard hover treatment (lift, border, glow) for clickable cards. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
};

export function Card({ interactive = false, className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface/60 p-6",
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-200 ease-standard hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow",
        className,
      )}
    >
      {children}
    </div>
  );
}