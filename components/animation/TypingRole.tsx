"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type TypingRoleProps = {
  roles: string[];
  /** ms per character while typing */
  typeMs?: number;
  /** ms per character while deleting */
  deleteMs?: number;
  /** how long a finished statement stays on screen (cursor blinks) */
  holdMs?: number;
  /** pause on an empty line before the next statement (cursor blinks) */
  gapMs?: number;
  className?: string;
};

type Phase = "typing" | "hold" | "deleting" | "gap";

/**
 * Time-driven typewriter (requestAnimationFrame), so the speed is even and
 * doesn't stutter like chained setTimeouts can.
 *
 * - Cursor is solid while typing/deleting.
 * - Cursor blinks once a statement is finished, and during the gap before the next.
 * - The blink keyframes live inside this component, so nothing needs to be
 *   added to globals.css.
 * - Screen readers get the first role as static text; reduced motion shows it
 *   with no typing and no blink.
 */
export function TypingRole({
  roles,
  typeMs = 75,
  deleteMs = 40,
  holdMs = 2600,
  gapMs = 500,
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
        case "deleting":
          len = Math.max(0, full.length - Math.floor(elapsed / deleteMs));
          if (len <= 0) {
            index = (index + 1) % roles.length;
            go("gap", now);
          }
          break;
      }

      if (len !== shownLen) {
        shownLen = len;
        setText(roles[index].slice(0, len));
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, rolesKey, typeMs, deleteMs, holdMs, gapMs]);

  const shown = reduce ? roles[0] : text;

  return (
    <p className={`flex h-[1.4em] items-center ${className}`}>
      <span className="sr-only">{roles[0]}</span>
      <span aria-hidden="true" className="flex items-center">
        <span className="whitespace-pre">{shown}</span>
        <span
          className="ml-1 inline-block h-[1em] w-[3px] rounded-full bg-accent"
          style={
            !reduce && blink
              ? { animation: "typing-role-caret 1s linear infinite" }
              : undefined
          }
        />
      </span>
    </p>
  );
}