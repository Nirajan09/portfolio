import {
  LuAward,
  LuBadgeCheck,
  LuCalendarDays,
  LuExternalLink,
  LuGraduationCap,
  LuShieldCheck,
} from "react-icons/lu";
import { Card } from "@/components/ui/Card";
import type { Certification } from "@/types";

export function CertificationCard({ certification }: { certification: Certification }) {
  const { title, issuer, date, description, credentialUrl } = certification;

  return (
    <Card
      padding="none"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface/75 backdrop-blur-md transform-gpu will-change-transform transition-[transform,translate,border-color,box-shadow] duration-300 ease-standard hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
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
        {/* Certificate Header: Status & Official Badge */}
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

          {/* Official Seal Emblem */}
          <div
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-xl border border-accent/25 bg-linear-to-br from-accent/15 via-blue/10 to-transparent text-accent shadow-sm transition-[border-color,background-color,transform,box-shadow] duration-300 ease-standard group-hover:scale-110 group-hover:border-accent/50 group-hover:shadow-[0_0_16px_rgba(34,211,238,0.25)]"
          >
            <LuAward className="size-5 transition-transform duration-300 ease-standard group-hover:rotate-12" />
          </div>
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

        {/* Credential Verification Action */}
        {credentialUrl && (
          <div className="mt-6 pt-4 border-t border-border/70">
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta relative flex items-center justify-between rounded-lg border border-border/90 bg-background-secondary/70 px-4 py-2.5 text-sm font-medium text-secondary transition-[border-color,background-color,color,box-shadow] duration-200 ease-standard hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-sm"
            >
              <span className="flex items-center gap-2">
                <LuBadgeCheck className="size-4 text-emerald-400 transition-colors duration-200 group-hover/cta:text-accent" />
                <span>Verify Authenticity</span>
              </span>
              <span
                aria-hidden="true"
                className="flex size-6 items-center justify-center rounded-full bg-surface text-muted transition-[background-color,color,transform] duration-200 ease-standard group-hover/cta:bg-accent group-hover/cta:text-background group-hover/cta:translate-x-0.5"
              >
                <LuExternalLink className="size-3" />
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}