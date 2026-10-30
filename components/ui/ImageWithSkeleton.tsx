import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export type ImageWithSkeletonProps = ImageProps & {
  containerClassName?: string;
  skeletonClassName?: string;
};

/**
 * Image wrapper with an integrated background shimmer skeleton.
 * Safe against cached-image onLoad bugs, zero latency, zero layout shift.
 */
export function ImageWithSkeleton({
  className,
  containerClassName,
  skeletonClassName,
  alt,
  fill,
  ...props
}: ImageWithSkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface/70",
        fill ? "size-full" : "inline-flex items-center justify-center",
        containerClassName,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/[0.08] to-transparent animate-shimmer",
          skeletonClassName,
        )}
      />
      <Image
        alt={alt}
        fill={fill}
        className={cn("relative z-10", className)}
        {...props}
      />
    </div>
  );
}
