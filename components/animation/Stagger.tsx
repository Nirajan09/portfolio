import type { ReactNode } from "react";

type StaggerProps = { children: ReactNode; className?: string };

/**
 * Immediate, zero-delay container for above-the-fold hero content.
 * Prevents FOUC and renders text immediately in the initial HTML.
 */
export function Stagger({ children, className }: StaggerProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className }: StaggerProps) {
  return <div className={className}>{children}</div>;
}