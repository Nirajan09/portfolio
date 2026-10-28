"use client";

import { useState } from "react";
import {
  LuAward,
  LuBadgeCheck,
  LuCalendarDays,
  LuExpand,
  LuExternalLink,
  LuGraduationCap,
  LuShieldCheck,
} from "react-icons/lu";
import { Card } from "@/components/ui/Card";
import type { Certification } from "@/types";
import { CertificatePreview } from "./CertificatePreview";

export function CertificationCard({ certification }: { certification: Certification }) {
  const { title, issuer, date, description, credentialUrl, image } = certification;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const openPreview = () => {
    if (image) {
      setIsPreviewOpen(true);
    }
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <>
      <Card
        padding="none"
        onClick={openPreview}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPreview();
          }
        }}
        tabIndex={image ? 0 : undefined}
        role={image ? "button" : undefined}
        aria-haspopup={image ? "dialog" : undefined}
        aria-label={image ? `View certificate preview for ${title}` : undefined}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface/75 backdrop-blur-md transform-gpu will-change-transform transition-all duration-300 ease-standard hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-glow ${
          image ? "cursor-pointer focus-visible:outline-accent" : ""
        }`}
      >
        {/* Top accent hairline that draws across on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-transform duration-500 ease-standard group-hover:scale-x-100"
        />

        {/* Ambient corner glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-accent/10 opacity-30 blur-3xl transition-opacity duration-500 ease-standard group-hover:opacity-75"
        />

        {/* Decorative certificate seal watermark */}
        <LuAward
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-6 size-40 rotate-12 text-accent/[0.03] transition-all duration-500 ease-standard group-hover:rotate-6 group-hover:text-accent/[0.08]"
        />

        <div className="relative flex flex-1 flex-col p-6 sm:p-7">
          {/* Certificate Header: Status & Preview Indicator */}
          <div className="flex items-start justify-between gap-3">
            {/* Verified credential badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <LuShieldCheck className="size-3.5" aria-hidden="true" />
              <span>Verified Credential</span>
            </div>

            {/* Click to Preview Indicator Badge */}
            {image && (
              <div
                aria-hidden="true"
                className="flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent transition-all duration-200 group-hover:border-accent/60 group-hover:bg-accent group-hover:text-background group-hover:shadow-[0_0_14px_rgba(34,211,238,0.3)]"
              >
                <LuExpand className="size-3.5" />
                <span>Preview</span>
              </div>
            )}
          </div>

          {/* Issuer row */}
          <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            <LuGraduationCap className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{issuer}</span>
          </div>

          {/* Certificate Title */}
          <h3 className="mt-2 font-display text-lg font-bold leading-snug text-primary transition-colors duration-200 group-hover:text-accent">
            {title}
          </h3>

          {/* Metadata chip: Issue date */}
          <div className="mt-3 flex items-center gap-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-background-secondary/60 px-2.5 py-1 font-medium text-secondary/90">
              <LuCalendarDays className="size-3.5 text-accent/80" aria-hidden="true" />
              <span>Issued {date}</span>
            </span>
            <span className="text-muted/60">•</span>
            <span className="font-mono text-[11px] text-muted">Digital Credential</span>
          </div>

          {/* Description / Accreditation details */}
          {description && (
            <p className="mt-4 flex-1 text-sm leading-relaxed text-secondary/85">
              {description}
            </p>
          )}

          {/* Footer Actions: Click hint + External verification */}
          <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between gap-3">
            {image ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                <LuExpand className="size-3.5" aria-hidden="true" />
                <span>Click card to view certificate</span>
              </span>
            ) : (
              <span />
            )}

            {credentialUrl && (
              <a
                href={credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group/cta inline-flex items-center gap-1.5 rounded-lg border border-border/90 bg-background-secondary/80 px-3 py-1.5 text-xs font-medium text-secondary transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-xs"
                aria-label={`Verify authenticity of ${title} (opens in new tab)`}
              >
                <LuBadgeCheck className="size-3.5 text-emerald-400 transition-colors group-hover/cta:text-accent" />
                <span>Verify</span>
                <LuExternalLink className="size-3" />
              </a>
            )}
          </div>
        </div>
      </Card>

      {/* Modal Dialog via Portal */}
      {image && (
        <CertificatePreview
          isOpen={isPreviewOpen}
          src={image.src}
          alt={image.alt}
          title={title}
          issuer={issuer}
          date={date}
          credentialUrl={credentialUrl}
          onClose={closePreview}
        />
      )}
    </>
  );
}