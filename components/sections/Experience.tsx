import { Reveal } from "@/components/animation/Reveal";
import { CareerTimeline } from "@/components/experience/CareerTimeline";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              eyebrow="Career Timeline"
              title="Experience & Education"
              description="My professional work experience as a developer and my academic background in computer science."
            />
          </Reveal>
        </div>

        <CareerTimeline experience={experience} education={education} />
      </div>
    </Section>
  );
}