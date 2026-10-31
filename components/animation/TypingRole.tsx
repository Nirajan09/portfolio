"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type TypingRoleProps = {
  roles: string[];
  /** ms per character while typing */
  typeMs?: number;
  /** duration in ms for the deletion sweep */
  deleteDurationMs?: number;
  /** how long a finished statement stays on screen */
  holdMs?: number;
  /** pause on an empty line before the next statement */
  gapMs?: number;
  className?: string;
};

type Phase = "typing" | "hold" | "deleting" | "gap";

/**
 * Butter-smooth RAF-driven typewriter with zero React re-render overhead,
 * natural cadence pacing, silky backspace ease, and calm breathing cyber caret.
 */
export function TypingRole({
  roles,
  typeMs = 52,
  deleteDurationMs = 460,
  holdMs = 2400,
  gapMs = 380,
  className = "",
}: TypingRoleProps) {
  const reduce = useReducedMotion();
  const textRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const raf = useRef<number>(0);

  const rolesKey = roles.join("|");

  useEffect(() => {
    if (reduce || roles.length === 0) return;

    const textEl = textRef.current;
    const caretEl = caretRef.current;
    if (!textEl || !caretEl) return;

    let index = 0;
    let phase: Phase = "hold";
    let phaseStart = performance.now();
    let shownLen = roles[0]?.length ?? 0;

    const setCaretBlinking = (blinking: boolean) => {
      if (blinking) {
        caretEl.style.animation = "typing-role-caret 0.9s ease-in-out infinite";
      } else {
        caretEl.style.animation = "none";
        caretEl.style.opacity = "1";
      }
    };

    const go = (next: Phase, now: number) => {
      phase = next;
      phaseStart = now;
      setCaretBlinking(next === "hold" || next === "gap");
    };

    // Initial state: holding first role
    setCaretBlinking(true);

    const tick = (now: number) => {
      const full = roles[index];
      const elapsed = now - phaseStart;
      let len = shownLen;

      switch (phase) {
        case "gap":
          len = 0;
          if (elapsed >= gapMs) go("typing", now);
          break;

        case "typing": {
          // Smooth progressive typing cadence
          const charIndex = Math.floor(elapsed / typeMs);
          len = Math.min(full.length, charIndex + 1);
          if (len >= full.length) go("hold", now);
          break;
        }

        case "hold":
          len = full.length;
          if (elapsed >= holdMs) go("deleting", now);
          break;

        case "deleting": {
          // Silky smooth sine backspace dissolve
          const progress = Math.min(1, elapsed / deleteDurationMs);
          const eased = 1 - Math.cos((progress * Math.PI) / 2);
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
        textEl.textContent = full.slice(0, len);
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reduce, rolesKey, typeMs, deleteDurationMs, holdMs, gapMs, roles]);

  return (
    <div
      className={`flex items-center min-h-[1.3em] max-w-full overflow-hidden ${className}`}
    >
      <span className="sr-only">{roles[0]}</span>
      <span aria-hidden="true" className="inline-flex items-center max-w-full">
        <span
          ref={textRef}
          className="truncate sm:whitespace-pre bg-linear-to-r from-accent via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]"
        >
          {roles[0]}
        </span>
        <span
          ref={caretRef}
          className="ml-1.5 inline-block shrink-0 h-[0.9em] w-[3px] rounded-full bg-accent shadow-[0_0_8px_rgba(34,211,238,0.9)] transition-opacity duration-150"
          style={
            !reduce
              ? { animation: "typing-role-caret 0.9s ease-in-out infinite" }
              : undefined
          }
        />
      </span>
    </div>
  );
}