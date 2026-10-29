"use client";

import { memo, type ReactNode } from "react";
import { motion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT_CONFIG = { once: true, margin: "0px 0px -80px 0px" } as const;

/** Fade/slide into place once when scrolled into view. Memoized to avoid unnecessary motion tree updates. */
export const Reveal = memo(function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
});