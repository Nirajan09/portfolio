import { Reveal } from "@/components/animation/Reveal";
import { CertificationCard } from "@/components/certifications/CertificationCard";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";

export function Certifications() {
  // No certificates yet: render nothing (navigation hides the link too).
  if (certifications.length === 0) return null;

  return (
    <Section id="certifications">
      <Reveal>
        <SectionHeading
          eyebrow="Certifications"
          title="Certifications"
          description="Courses and credentials I've completed."
        />
      </Reveal>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certification, index) => (
          <li key={certification.id}>
            <Reveal delay={index * 0.08} className="h-full">
              <CertificationCard certification={certification} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}