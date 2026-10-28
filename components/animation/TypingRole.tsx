"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type TypingRoleProps = {
  roles: string[];
  /** ms per character while typing */
  typeMs?: number;
  /** duration in ms for the accelerated deletion sweep */
  deleteDurationMs?: number;
  /** how long a finished statement stays on screen (cursor breathes) */
  holdMs?: number;
  /** pause on an empty line before the next statement (cursor breathes) */
  gapMs?: number;
  className?: string;
};

type Phase = "typing" | "hold" | "deleting" | "gap";

/**
 * Butter-smooth, RAF-driven typewriter with accelerated deletion sweep
 * and breathing glowing caret.
 */
export function TypingRole({
  roles,
  typeMs = 38,
  deleteDurationMs = 340,
  holdMs = 2200,
  gapMs = 240,
  className = "",
}: TypingRoleProps) {
  const reduce = useReducedMotion();
  const [text, setText] = useState("");
  const [blink, setBlink] = useState(true);

  const rolesKey = roles.join("|");
  const raf = useRef<number>(0);

  useEffect(() => {
    if (reduce || roles.length === 0) return;

    let index = 0;
    let phase: Phase = "gap";
    let phaseStart = performance.now();
    let shownLen = 0;
    let isBlinking = true;

    const setBlinking = (v: boolean) => {
      if (v !== isBlinking) {
        isBlinking = v;
        setBlink(v);
      }
    };

    const go = (next: Phase, now: number) => {
      phase = next;
      phaseStart = now;
      setBlinking(next === "hold" || next === "gap");
    };

    const tick = (now: number) => {
      const full = roles[index];
      const elapsed = now - phaseStart;
      let len = shownLen;

      switch (phase) {
        case "gap":
          len = 0;
          if (elapsed >= gapMs) go("typing", now);
          break;
        case "typing":
          len = Math.min(full.length, Math.floor(elapsed / typeMs) + 1);
          if (len >= full.length) go("hold", now);
          break;
        case "hold":
          len = full.length;
          if (elapsed >= holdMs) go("deleting", now);
          break;
        case "deleting": {
          // Butter-smooth accelerated deletion
          const progress = Math.min(1, elapsed / deleteDurationMs);
          const eased = progress * progress; // ease-in quadratic curve
          len = Math.max(0, Math.round(full.length * (1 - eased)));
          if (progress >= 1 || len <= 0) {
            index = (index + 1) % roles.length;
            go("gap", now);
          }
          break;
        }
      }

      if (len !== shownLen) {
        shownLen = len;
        setText(roles[index].slice(0, len));
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reduce, rolesKey, typeMs, deleteDurationMs, holdMs, gapMs]);

  const shown = reduce ? roles[0] : text;

  return (
    <div className={`flex items-center min-h-[1.3em] ${className}`}>
      <span className="sr-only">{roles[0]}</span>
      <span aria-hidden="true" className="inline-flex items-center">
        <span className="whitespace-pre bg-linear-to-r from-accent via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]">
          {shown}
        </span>
        <span
          className="ml-1.5 inline-block h-[0.9em] w-[3px] rounded-full bg-accent shadow-[0_0_8px_rgba(34,211,238,0.9)]"
          style={
            !reduce && blink
              ? { animation: "typing-role-caret 0.8s ease-in-out infinite" }
              : undefined
          }
        />
      </span>
    </div>
  );
}