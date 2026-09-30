import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "accent" | "success";

const variants: Record<Variant, string> = {
  default: "border-border bg-surface text-secondary",
  accent: "border-accent/30 bg-accent/10 text-accent",
  success: "border-success/30 bg-success/10 text-success",
};

type BadgeProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}