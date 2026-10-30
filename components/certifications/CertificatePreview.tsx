"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LuExternalLink, LuX } from "react-icons/lu";

type CertificatePreviewProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title: string;
  issuer?: string;
  date?: string;
  credentialUrl?: string;
};

/** Full certificate image modal dialog rendered via React Portal. */
export function CertificatePreview({
  isOpen,
  onClose,
  src,
  alt,
  title,
  issuer,
  date,
  credentialUrl,
}: CertificatePreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key press and scroll locking when open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate preview for ${title}`}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-3 sm:p-4 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative my-auto flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient top highlight hairline */}
        <span
          aria-hidden="true"
          className="block h-[2px] bg-linear-to-r from-accent via-blue to-violet"
        />

        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border/70 bg-surface px-4 sm:px-6 py-3.5 sm:py-4">
          <div className="min-w-0">
            <h3 className="font-display text-base sm:text-lg font-bold text-primary truncate max-w-[calc(100vw-8rem)] sm:max-w-none">
              {title}
            </h3>
            {(issuer || date) && (
              <p className="text-xs text-muted mt-0.5 truncate">
                {issuer} {issuer && date && "•"} {date && `Issued ${date}`}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate preview"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent cursor-pointer active:scale-95"
          >
            <LuX className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Image Body with background shimmer */}
        <div className="relative bg-background-secondary/80 p-3 sm:p-6 flex min-h-[260px] sm:min-h-[380px] items-center justify-center max-h-[68vh] overflow-auto">
          {/* Shimmer skeleton sweep behind the certificate */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/[0.06] to-transparent animate-shimmer"
          />

          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1200}
            sizes="(min-width: 1024px) 896px, 100vw"
            className="relative z-10 h-auto max-h-[64vh] w-auto max-w-full rounded-xl border border-border/80 object-contain shadow-lg"
          />
        </div>

        {/* Modal Footer with Verification Link */}
        {credentialUrl && (
          <div className="flex shrink-0 flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-border/70 bg-surface/90 px-4 sm:px-6 py-3 text-xs text-muted">
            <span className="font-medium text-emerald-400">Verified Credential</span>
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
            >
              <span>Verify on official portal</span>
              <LuExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}