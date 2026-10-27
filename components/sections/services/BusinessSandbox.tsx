"use client";

import { useState } from "react";

export function BusinessSandbox() {
  const [toggles, setToggles] = useState({
    seo: true,
    cdn: true,
    speed: true,
  });

  const score = (toggles.seo ? 35 : 0) + (toggles.cdn ? 35 : 0) + (toggles.speed ? 30 : 0);

  return (
    <div className="rounded-xl border border-border/70 bg-background-secondary/60 p-4 sm:p-5 transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Site Health & Conversion Score
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted">Score:</span>
          <span
            className={`text-xs font-mono font-bold ${
              score >= 90 ? "text-emerald-400" : score >= 60 ? "text-warning" : "text-error"
            }`}
          >
            {score}/100
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <label className="group/toggle flex items-center justify-between rounded-lg border border-border/60 bg-surface/40 p-2.5 text-xs cursor-pointer transform-gpu will-change-transform transition-[border-color,background-color,transform,box-shadow] duration-200 ease-standard hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs">
          <span className="text-secondary/90 group-hover/toggle:text-primary transition-colors duration-200">
            Technical SEO Schemas & OpenGraph
          </span>
          <input
            type="checkbox"
            checked={toggles.seo}
            onChange={(e) => setToggles((t) => ({ ...t, seo: e.target.checked }))}
            className="size-4 accent-cyan-400 cursor-pointer"
          />
        </label>
        <label className="group/toggle flex items-center justify-between rounded-lg border border-border/60 bg-surface/40 p-2.5 text-xs cursor-pointer transform-gpu will-change-transform transition-[border-color,background-color,transform,box-shadow] duration-200 ease-standard hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs">
          <span className="text-secondary/90 group-hover/toggle:text-primary transition-colors duration-200">
            Global Edge CDN & Asset Compression
          </span>
          <input
            type="checkbox"
            checked={toggles.cdn}
            onChange={(e) => setToggles((t) => ({ ...t, cdn: e.target.checked }))}
            className="size-4 accent-cyan-400 cursor-pointer"
          />
        </label>
        <label className="group/toggle flex items-center justify-between rounded-lg border border-border/60 bg-surface/40 p-2.5 text-xs cursor-pointer transform-gpu will-change-transform transition-[border-color,background-color,transform,box-shadow] duration-200 ease-standard hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs">
          <span className="text-secondary/90 group-hover/toggle:text-primary transition-colors duration-200">
            Sub-Second First Contentful Paint
          </span>
          <input
            type="checkbox"
            checked={toggles.speed}
            onChange={(e) => setToggles((t) => ({ ...t, speed: e.target.checked }))}
            className="size-4 accent-cyan-400 cursor-pointer"
          />
        </label>
      </div>

      <div className="mt-3.5 rounded-lg border border-border/60 bg-surface/50 p-2.5 text-xs flex items-center justify-between transform-gpu will-change-transform transition-[border-color,background-color] duration-200 hover:border-accent/40 hover:bg-surface/80">
        <span className="text-muted">Estimated Load Time:</span>
        <span className="font-mono font-semibold text-accent">
          {score === 100
            ? "< 0.65s (Ultra Fast)"
            : score >= 70
            ? "~ 1.1s (Good)"
            : "~ 2.4s (Needs Optimization)"}
        </span>
      </div>
    </div>
  );
}
