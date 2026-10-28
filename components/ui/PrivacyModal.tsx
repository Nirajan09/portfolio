"use client";

import { useEffect, useRef } from "react";
import { LuCheck, LuLock, LuShieldCheck, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/Button";

type PrivacyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md transition-all duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
        aria-describedby="privacy-modal-description"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative my-8 w-full max-w-xl overflow-hidden rounded-2xl border border-border/80 bg-linear-to-b from-surface via-surface/95 to-background-secondary p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_-5px_rgba(34,211,238,0.15)] outline-none"
      >
        {/* Top hairline gradient */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close privacy policy"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-xl border border-border/70 bg-background/60 text-muted transition-colors hover:border-accent/40 hover:bg-surface hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
        >
          <LuX className="size-4" aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
            <LuShieldCheck className="size-6" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="privacy-modal-title"
              className="font-display text-xl sm:text-2xl font-bold tracking-tight text-primary"
            >
              Privacy Policy
            </h2>
            <p className="mt-0.5 font-mono text-xs text-muted">
              Privacy-First & Zero Tracking Commitment
            </p>
          </div>
        </div>

        {/* Content */}
        <div
          id="privacy-modal-description"
          className="mt-6 space-y-4 text-xs sm:text-sm leading-relaxed text-secondary/90"
        >
          <div className="rounded-xl border border-border/70 bg-background/40 p-4">
            <div className="flex items-center gap-2 font-medium text-primary">
              <LuCheck className="size-4 text-emerald-400" aria-hidden="true" />
              <span>Zero Tracking & No Advertising Cookies</span>
            </div>
            <p className="mt-1.5 text-xs text-muted leading-normal">
              This portfolio does not utilize advertising cookies, tracking pixels, or invasive telemetry tools. Your browsing activity is strictly private.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/40 p-4">
            <div className="flex items-center gap-2 font-medium text-primary">
              <LuLock className="size-4 text-accent" aria-hidden="true" />
              <span>Contact Form & Communications</span>
            </div>
            <p className="mt-1.5 text-xs text-muted leading-normal">
              When you submit an inquiry through the contact form (name, email, and message), your details are transmitted securely and used exclusively to reply to you directly. Your information is never sold, rented, or shared with third parties.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/40 p-4">
            <div className="flex items-center gap-2 font-medium text-primary">
              <LuShieldCheck className="size-4 text-violet-400" aria-hidden="true" />
              <span>Infrastructure & External Links</span>
            </div>
            <p className="mt-1.5 text-xs text-muted leading-normal">
              This site is statically generated and hosted on Vercel&apos;s edge network. Standard access logs may capture anonymous request metrics for DDoS protection. External project links and social profiles operate under their respective terms.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-7 flex items-center justify-between border-t border-border/70 pt-4">
          <span className="font-mono text-[11px] text-muted/70">
            Last updated: 2026
          </span>
          <Button type="button" size="md" onClick={onClose} className="cursor-pointer">
            Understood
          </Button>
        </div>
      </div>
    </div>
  );
}
