import { Reveal } from "@/components/animation/Reveal";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              eyebrow="Experience"
              title="Where I've worked"
              description="Professional roles in web development, from a frontend internship to full-stack engineering."
            />
          </Reveal>
        </div>

        <ExperienceTimeline items={experience} />
      </div>
    </Section>
  );
}