import { Award, CalendarDays, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Certification } from "@/types";
import { CertificatePreview } from "./CertificatePreview";

export function CertificationCard({ certification }: { certification: Certification }) {
  const { title, issuer, date, description, credentialUrl, image } = certification;

  return (
    <Card
      padding="none"
      className="group relative flex h-full flex-col overflow-hidden transition-[border-color,translate,box-shadow] duration-300 ease-standard hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow"
    >
      {/* Gradient hairline that draws across the top on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-linear-to-r from-accent via-blue to-violet transition-[scale] duration-500 ease-standard group-hover:scale-x-100"
      />

      {image && (
        <CertificatePreview src={image.src} alt={image.alt} title={title} />
      )}

      <div className="relative flex flex-1 flex-col p-6">
        {/* Soft corner glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 ease-standard group-hover:opacity-100"
        />

        {!image && (
          <div className="relative mb-5 flex size-11 items-center justify-center rounded-lg border border-border bg-background-secondary text-accent transition-[border-color,background-color,box-shadow,scale] duration-300 ease-standard group-hover:scale-105 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:shadow-glow">
            <Award className="size-5" aria-hidden="true" />
          </div>
        )}

        <h3 className="relative font-display text-lg font-semibold leading-snug text-primary">
          {title}
        </h3>
        <p className="relative mt-1 text-sm font-medium text-accent">{issuer}</p>

        <p className="relative mt-3 inline-flex items-center gap-1.5 self-start rounded-md border border-border bg-background-secondary/70 px-2.5 py-1 text-xs font-medium text-secondary transition-colors duration-300 group-hover:border-accent/30">
          <CalendarDays className="size-3.5 text-muted" aria-hidden="true" />
          {date}
        </p>

        {description && (
          <p className="relative mt-4 flex-1 text-sm leading-relaxed text-secondary">
            {description}
          </p>
        )}

        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta relative mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-medium text-secondary transition-colors duration-200 hover:text-accent"
          >
            View credential
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-full border border-border text-muted transition-[border-color,background-color,color] duration-300 ease-standard group-hover/cta:border-accent/50 group-hover/cta:bg-accent group-hover/cta:text-background"
            >
              <ExternalLink className="size-3.5" />
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </Card>
  );
}