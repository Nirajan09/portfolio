import { Reveal } from "@/components/animation/Reveal";
import { CertificationCard } from "@/components/certifications/CertificationCard";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";

export function Certifications() {
  // No certificates yet: render nothing (navigation hides the link too).
  if (certifications.length === 0) return null;

  const count = certifications.length;

  return (
    <Section id="certifications">
      <Reveal>
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications & Training"
          description="Completed courses and professional training programs in Python, Django, and web development."
        />
      </Reveal>

      {/* Count chip, same pill style as the timeline tabs and date badges */}
      <Reveal delay={0.05}>
        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-secondary backdrop-blur-sm">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_rgb(34_211_238/0.8)]"
          />
          <span className="tabular-nums">{count}</span>
          {count === 1 ? "credential" : "credentials"}
        </p>
      </Reveal>

      {/* Responsive, balanced grid that supports up to 3 columns if more are added */}
      <ul
        className={`mt-8 grid gap-6 sm:grid-cols-2 ${
          count >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2 max-w-5xl"
        }`}
      >
        {certifications.map((certification, index) => (
          <li key={certification.id} className="h-full">
            <Reveal delay={index * 0.08} className="h-full flex flex-col">
              <CertificationCard certification={certification} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}