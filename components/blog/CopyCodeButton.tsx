"use client";

import { useCallback, useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Code copied" : "Copy code snippet"}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/70 px-2.5 py-1 text-[11px] font-medium text-secondary transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-primary cursor-pointer active:scale-95"
    >
      {copied ? (
        <>
          <LuCheck className="size-3.5 text-emerald-400 stroke-3" aria-hidden="true" />
          <span className="text-emerald-400">Copied</span>
        </>
      ) : (
        <>
          <LuCopy className="size-3.5 text-muted" aria-hidden="true" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
