import type { ComponentPropsWithoutRef } from "react";
import { LuTerminal } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { CopyCodeButton } from "./CopyCodeButton";

type CodeBlockProps = ComponentPropsWithoutRef<"pre"> & {
  "data-code"?: string;
  "data-lang"?: string;
  "data-title"?: string;
};

export function CodeBlock({
  className,
  children,
  "data-code": rawCode = "",
  "data-lang": lang = "text",
  "data-title": title,
  ...props
}: CodeBlockProps) {
  const displayLabel = title || lang.toUpperCase();

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border/80 bg-[#0b1120] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.75)]">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-surface/80 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <LuTerminal className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
          <span className="truncate font-mono text-xs text-secondary">
            {displayLabel}
          </span>
          {title && lang !== "text" && (
            <span className="rounded-md border border-border/70 bg-background/60 px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted">
              {lang}
            </span>
          )}
        </div>

        {rawCode && <CopyCodeButton code={rawCode} />}
      </div>

      {/* Scrollable Code Surface */}
      <pre
        className={cn(
          "overflow-x-auto p-4 text-[13px] leading-relaxed font-mono [&>code]:block [&>code]:min-w-fit",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
