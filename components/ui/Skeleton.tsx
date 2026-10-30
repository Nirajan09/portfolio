import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  shimmer?: boolean;
};

/**
 * Modern dark-mode shimmering skeleton primitive.
 * Emits a sweeping light beam across a subtle elevated surface.
 */
export function Skeleton({
  className,
  shimmer = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate overflow-hidden rounded-lg bg-surface/70 border border-border/50",
        className,
      )}
      {...props}
    >
      {shimmer && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/[0.08] to-transparent animate-shimmer"
        />
      )}
    </div>
  );
}

/**
 * Multi-line skeleton text generator for paragraphs and descriptions.
 */
export function SkeletonText({
  lines = 3,
  className,
  lastLineWidth = "w-3/5",
}: {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 rounded-md",
            i === lines - 1 ? lastLineWidth : "w-full",
          )}
        />
      ))}
    </div>
  );
}
