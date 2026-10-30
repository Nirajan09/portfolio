"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type ImageWithSkeletonProps = ImageProps & {
  containerClassName?: string;
  skeletonClassName?: string;
};

/**
 * Image wrapper with an integrated background shimmer skeleton.
 * Safe against cached-image onLoad bugs, zero latency, zero layout shift.
 * Automatically stops and unmounts shimmer once the image renders.
 */
export function ImageWithSkeleton({
  className,
  containerClassName,
  skeletonClassName,
  alt,
  fill,
  onLoad,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface/70",
        fill ? "size-full" : "inline-flex items-center justify-center",
        containerClassName,
      )}
    >
      {!isLoaded && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/[0.08] to-transparent animate-shimmer",
            skeletonClassName,
          )}
        />
      )}
      <Image
        alt={alt}
        fill={fill}
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        className={cn("relative z-10", className)}
        {...props}
      />
    </div>
  );
}
