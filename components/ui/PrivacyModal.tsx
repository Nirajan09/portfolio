"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  LuArrowUpRight,
  LuCheck,
  LuLock,
  LuServer,
  LuShieldCheck,
  LuX,
} from "react-icons/lu";
import { personal } from "@/data/personal";

type PrivacyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Cursor spotlight tracking
  function handleMouseEnter(event: MouseEvent<HTMLDivElement>) {
    rectRef.current = event.currentTarget.getBoundingClientRect();
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const clientX = event.clientX;
    const clientY = event.clientY;
    const currentTarget = event.currentTarget;

    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!rectRef.current) {
        rectRef.current = currentTarget.getBoundingClientRect();
      }
      currentTarget.style.setProperty(
        "--mx",
        `${clientX - rectRef.current.left}px`,
      );
      currentTarget.style.setProperty(
        "--my",
        `${clientY - rectRef.current.top}px`,
      );
    });
  }

  function handleMouseLeave() {
    rectRef.current = null;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        >
          {/* Animated Modal Dialog */}
          <motion.div
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
            aria-describedby="privacy-modal-description"
            tabIndex={-1}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="group relative w-full max-w-[32rem] overflow-hidden rounded-2xl border border-border/80 bg-linear-to-b from-surface via-surface/95 to-background-secondary p-6 sm:p-7 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85),0_0_30px_-5px_rgba(34,211,238,0.14)] outline-none"
          >
            {/* Dynamic Cursor Spotlight */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(380px circle at var(--mx, 50%) var(--my, 0%), rgb(34 211 238 / 0.1), transparent 70%)",
              }}
            />

            {/* Sweeping Top Hairline Accent */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-accent via-blue to-violet"
            />

            {/* Interactive Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close privacy policy"
              className="group/close absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg border border-border/70 bg-background/60 text-muted transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-primary focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent cursor-pointer active:scale-95"
            >
              <LuX className="size-4 transition-transform duration-200 group-hover/close:rotate-90" aria-hidden="true" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 pr-8">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)]">
                <LuShieldCheck className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2
                  id="privacy-modal-title"
                  className="font-display text-xl font-bold tracking-tight text-primary"
                >
                  Privacy Policy
                </h2>
                <p className="font-mono text-xs text-accent">
                  Privacy-First & Confidential Inquiries
                </p>
              </div>
            </div>

            {/* Interactive Content Rows */}
            <div id="privacy-modal-description" className="mt-5 space-y-3">
              {/* Row 1: Zero Tracking */}
              <div className="group/item flex items-start gap-3 rounded-xl border border-border/70 bg-background/40 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:shadow-xs">
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 transition-transform duration-200 group-hover/item:scale-110">
                  <LuCheck className="size-4 stroke-3" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-primary transition-colors group-hover/item:text-emerald-400">
                      Zero Tracking & No Ad Cookies
                    </h3>
                    <span className="font-mono text-[10px] text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.2 rounded-md">
                      Verified
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-secondary/85">
                    This website does not utilize advertising cookies, tracking pixels, or invasive telemetry. Your browsing session is completely private.
                  </p>
                </div>
              </div>

              {/* Row 2: Contact Form Confidentiality */}
              <div className="group/item flex items-start gap-3 rounded-xl border border-border/70 bg-background/40 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:shadow-xs">
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/10 text-cyan-400 transition-transform duration-200 group-hover/item:scale-110">
                  <LuLock className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-primary transition-colors group-hover/item:text-cyan-400">
                      Contact Form Confidentiality
                    </h3>
                    <span className="font-mono text-[10px] text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.2 rounded-md">
                      Encrypted
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-secondary/85">
                    Details submitted through the contact form (name, email, and message) are used exclusively to reply to your inquiry. Your information is never sold or shared.
                  </p>
                </div>
              </div>

              {/* Row 3: Hosting & Infrastructure */}
              <div className="group/item flex items-start gap-3 rounded-xl border border-border/70 bg-background/40 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/40 hover:bg-violet-500/5 hover:shadow-xs">
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-violet-500/25 bg-violet-500/10 text-violet-400 transition-transform duration-200 group-hover/item:scale-110">
                  <LuServer className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-primary transition-colors group-hover/item:text-violet-400">
                      Hosting & Edge Infrastructure
                    </h3>
                    <span className="font-mono text-[10px] text-violet-400/80 bg-violet-500/10 px-1.5 py-0.2 rounded-md">
                      Edge Network
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-secondary/85">
                    Served globally via Vercel&apos;s edge network. Standard server access logs are processed strictly for DDoS mitigation and operational security.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
              <a
                href={`mailto:${personal.email}?subject=Privacy%20Question`}
                className="group/link inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-accent transition-colors"
              >
                <span>Questions? Contact Me</span>
                <LuArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs sm:text-sm font-semibold text-accent transition-all duration-200 hover:border-accent hover:bg-accent hover:text-background hover:shadow-[0_0_20px_-3px_rgba(34,211,238,0.4)] cursor-pointer active:scale-95"
              >
                Understood
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
