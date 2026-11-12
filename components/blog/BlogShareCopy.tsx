"use client";

import { useCallback, useState } from "react";
import { LuCheck, LuLink, LuShare2 } from "react-icons/lu";
import { trackEvent } from "@/lib/analytics";

type BlogShareCopyProps = {
  slug: string;
  title: string;
};

export function BlogShareCopy({ slug, title }: BlogShareCopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      const url = `${window.location.origin}/blog/${slug}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent("blog_share", { post: slug, method: "copy_link" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [slug]);

  const handleNativeShare = useCallback(async () => {
    const url = `${window.location.origin}/blog/${slug}`;
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        trackEvent("blog_share", { post: slug, method: "native_share" });
      } catch {
        // User cancelled native share sheet; do nothing.
      }
      return;
    }
    await handleCopy();
  }, [slug, title, handleCopy]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface/70 px-3 py-1.5 text-xs font-medium text-secondary transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-primary cursor-pointer active:scale-95"
      >
        {copied ? (
          <>
            <LuCheck className="size-3.5 text-emerald-400 stroke-3" aria-hidden="true" />
            <span className="text-emerald-400">Link copied</span>
          </>
        ) : (
          <>
            <LuLink className="size-3.5 text-muted" aria-hidden="true" />
            <span>Copy link</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleNativeShare}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface/70 px-3 py-1.5 text-xs font-medium text-secondary transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-primary cursor-pointer active:scale-95"
      >
        <LuShare2 className="size-3.5 text-muted" aria-hidden="true" />
        <span>Share</span>
      </button>
    </div>
  );
}
