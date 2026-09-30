"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Global Motion defaults. reducedMotion="user" honours prefers-reduced-motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionConfig>
  );
}