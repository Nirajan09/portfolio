import { Award, CalendarDays, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Certification } from "@/types";
import { CertificatePreview } from "./CertificatePreview";

export function CertificationCard({ certification }: { certification: Certification }) {
  const { title, issuer, date, description, credentialUrl, image } = certification;

  return (
    <Card padding="none" className="flex h-full flex-col overflow-hidden">
      {image && (
        <CertificatePreview src={image.src} alt={image.alt} title={title} />
      )}

      <div className="flex flex-1 flex-col p-6">
        {!image && (
          <div className="mb-5 flex size-10 items-center justify-center rounded-md border border-border bg-background-secondary text-accent">
            <Award className="size-5" aria-hidden="true" />
          </div>
        )}

        <h3 className="font-display text-lg font-semibold text-primary">{title}</h3>
        <p className="mt-1 text-sm font-medium text-secondary">{issuer}</p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
          <CalendarDays className="size-4" aria-hidden="true" />
          {date}
        </p>

        {description && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {description}
          </p>
        )}

        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-secondary transition-colors duration-200 hover:text-accent"
          >
            View credential
            <ExternalLink
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </Card>
  );
}