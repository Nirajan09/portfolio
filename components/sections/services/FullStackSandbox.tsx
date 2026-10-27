"use client";

import { useState } from "react";
import { LuPlay } from "react-icons/lu";

export function FullStackSandbox() {
  const [selectedNode, setSelectedNode] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const nodes = [
    {
      name: "Client UI",
      role: "Next.js / SSR",
      stat: "60 FPS Fluid",
      detail: "Server-rendered React frontend with zero layout shift and instant client hydration.",
    },
    {
      name: "API & Auth",
      role: "REST / JWT",
      stat: "< 35ms Latency",
      detail: "Authenticated endpoint layer with Bearer token validation, rate limiting, and CORS.",
    },
    {
      name: "Data Layer",
      role: "PostgreSQL & Redis",
      stat: "ACID Safe",
      detail: "Relational tables with indexed queries, connection pooling, and in-memory cache.",
    },
  ];

  function runSimulation() {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);
    setSelectedNode(0);

    setTimeout(() => {
      setActiveStep(1);
      setSelectedNode(1);
    }, 600);

    setTimeout(() => {
      setActiveStep(2);
      setSelectedNode(2);
    }, 1200);

    setTimeout(() => {
      setIsSimulating(false);
      setActiveStep(null);
    }, 1800);
  }

  return (
    <div className="rounded-xl border border-border/70 bg-background-secondary/60 p-4 sm:p-5 transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Architecture Pipeline Simulator
          </span>
        </div>
        <button
          type="button"
          onClick={runSimulation}
          disabled={isSimulating}
          className="group/btn inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transform-gpu will-change-transform transition-[background-color,border-color,transform,box-shadow,color] duration-200 ease-standard hover:-translate-y-0.5 hover:scale-105 hover:bg-accent hover:text-background hover:shadow-[0_0_14px_rgba(34,211,238,0.35)] active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <LuPlay
            className={`size-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 ${
              isSimulating ? "animate-spin" : ""
            }`}
          />
          <span>{isSimulating ? "Simulating..." : "Test Flow"}</span>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {nodes.map((node, i) => {
          const isCurrent = selectedNode === i;
          const isStepActive = activeStep === i;
          return (
            <button
              key={node.name}
              type="button"
              onClick={() => setSelectedNode(i)}
              className={`group/node relative flex flex-col items-center rounded-xl border p-3 text-center cursor-pointer transform-gpu will-change-transform transition-[border-color,background-color,transform,box-shadow] duration-200 ease-standard hover:-translate-y-1 hover:shadow-glow ${
                isStepActive || isCurrent
                  ? "border-accent/70 bg-surface shadow-glow"
                  : "border-border/70 bg-background/60 hover:border-accent/40 hover:bg-surface/70"
              }`}
            >
              <span
                className={`text-xs font-bold transition-colors duration-200 ${
                  isCurrent ? "text-accent" : "text-primary group-hover/node:text-accent"
                }`}
              >
                {node.name}
              </span>
              <span className="text-[10px] text-muted font-mono mt-0.5 group-hover/node:text-secondary transition-colors duration-200">
                {node.role}
              </span>
              <span className="mt-2.5 inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-semibold bg-surface-elevated border border-border text-secondary transition-[border-color,background-color,color] duration-200 group-hover/node:border-accent/30 group-hover/node:text-primary">
                {node.stat}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3.5 rounded-lg border border-border/60 bg-surface/50 p-3 text-xs leading-relaxed text-secondary/90 transform-gpu will-change-transform transition-[border-color,background-color,box-shadow] duration-200 hover:border-accent/40 hover:bg-surface/80 hover:shadow-xs">
        <span className="font-semibold text-accent">{nodes[selectedNode].name}:</span>{" "}
        {nodes[selectedNode].detail}
      </div>
    </div>
  );
}
