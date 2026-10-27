"use client";

import { useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";

export function BackendSandbox() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/auth/jwt",
      latency: "28ms",
      response: {
        status: 200,
        token_type: "Bearer",
        access_token: "eyJhbGciOi...",
        user: { role: "admin", verified: true },
      },
    },
    {
      method: "POST",
      path: "/api/v1/checkout",
      latency: "42ms",
      response: {
        status: 200,
        payment_intent: "pi_3Mv79e...",
        amount: 25000,
        currency: "usd",
        webhook: "dispatched",
      },
    },
    {
      method: "GET",
      path: "/api/v1/metrics",
      latency: "19ms",
      response: {
        status: 200,
        uptime: "99.98%",
        db_pool: "healthy",
        cache_hit_ratio: "94.6%",
      },
    },
  ];

  const current = endpoints[selectedEndpoint];

  function copyJson() {
    navigator.clipboard.writeText(JSON.stringify(current.response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-border/70 bg-background-secondary/60 p-4 sm:p-5 font-mono transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
            Live API Console Sandbox
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted font-sans">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            200 OK
          </span>
          <span>•</span>
          <span className="text-accent font-mono">{current.latency}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {endpoints.map((ep, i) => (
          <button
            key={ep.path}
            type="button"
            onClick={() => setSelectedEndpoint(i)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] cursor-pointer transform-gpu will-change-transform transition-[border-color,background-color,transform,box-shadow,color] duration-200 ease-standard hover:-translate-y-0.5 hover:shadow-xs border ${
              selectedEndpoint === i
                ? "border-accent/60 bg-accent/20 text-accent shadow-sm"
                : "border-border/70 bg-surface/40 text-muted hover:border-accent/40 hover:bg-surface/80 hover:text-secondary"
            }`}
          >
            <span className="font-bold text-[10px] text-accent/90">{ep.method}</span>
            <span>{ep.path}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-3 rounded-lg border border-border/70 bg-background/80 p-3 text-xs overflow-x-auto text-secondary/90 transition-[border-color,background-color] duration-200 hover:border-accent/40 hover:bg-background">
        <button
          type="button"
          onClick={copyJson}
          className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-[10px] text-muted hover:text-accent hover:border-accent/50 hover:bg-accent/10 border border-border/80 transition-all duration-200 cursor-pointer active:scale-95"
          title="Copy JSON response"
        >
          {copied ? <LuCheck className="size-3 text-emerald-400" /> : <LuCopy className="size-3" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
        <pre className="text-[11px] leading-relaxed text-secondary/90">
          {JSON.stringify(current.response, null, 2)}
        </pre>
      </div>
    </div>
  );
}
