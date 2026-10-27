"use client";

import { useState } from "react";
import { LuMonitor, LuSmartphone } from "react-icons/lu";

export function FrontendSandbox() {
  const [activeTheme, setActiveTheme] = useState<"cyan" | "violet" | "emerald">("cyan");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [counter, setCounter] = useState(42);

  const themeColors = {
    cyan: "text-accent border-accent/40 bg-accent/10",
    violet: "text-violet border-violet/40 bg-violet/10",
    emerald: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  };

  return (
    <div className="rounded-xl border border-border/70 bg-background-secondary/60 p-4 sm:p-5 transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            UI Playground & Live Inspector
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-md border border-border/60 bg-surface/60 p-0.5">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`p-1.5 rounded-md text-xs cursor-pointer transform-gpu will-change-transform transition-[transform,background-color,color] duration-200 ${
              device === "desktop"
                ? "bg-accent/20 text-accent scale-105"
                : "text-muted hover:text-primary hover:scale-105"
            }`}
            title="Desktop view"
          >
            <LuMonitor className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`p-1.5 rounded-md text-xs cursor-pointer transform-gpu will-change-transform transition-[transform,background-color,color] duration-200 ${
              device === "mobile"
                ? "bg-accent/20 text-accent scale-105"
                : "text-muted hover:text-primary hover:scale-105"
            }`}
            title="Mobile view"
          >
            <LuSmartphone className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span>Live Accent Color Tint:</span>
        <div className="flex items-center gap-2">
          {(["cyan", "violet", "emerald"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTheme(t)}
              className={`size-4.5 rounded-full cursor-pointer transform-gpu will-change-transform transition-all duration-200 ${
                t === "cyan" ? "bg-accent" : t === "violet" ? "bg-violet" : "bg-emerald-400"
              } ${
                activeTheme === t
                  ? "scale-125 ring-2 ring-white/70 shadow-sm"
                  : "opacity-60 hover:opacity-100 hover:scale-115"
              }`}
            />
          ))}
        </div>
      </div>

      <div
        className={`mt-3.5 mx-auto transition-all duration-300 ${
          device === "mobile" ? "max-w-[240px]" : "w-full"
        }`}
      >
        <div
          className={`rounded-xl border p-3.5 bg-surface/70 transform-gpu will-change-transform transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-glow ${themeColors[activeTheme]}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary">Interactive Component</span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface/80 border border-border">
              {device}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-secondary/80">
            Click counter to test reactive state & fluid animation:
          </p>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-primary">
              State: <span className="tabular-nums">{counter}</span>
            </span>
            <button
              type="button"
              onClick={() => setCounter((c) => c + 1)}
              className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold text-primary transform-gpu will-change-transform transition-[border-color,color,transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-sm active:scale-95 cursor-pointer"
            >
              + Increment
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between pt-2 border-t border-border/50 text-[11px] text-muted">
        <span>Lighthouse Score:</span>
        <span className="font-mono font-semibold text-emerald-400">99 Performance • 100 A11y</span>
      </div>
    </div>
  );
}
