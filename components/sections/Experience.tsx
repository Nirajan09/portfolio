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
              eyebrow="Experience & Education"
              title="My journey"
              description="Professional roles in web development, from a frontend internship to full-stack engineering, and the education behind them."
            />
          </Reveal>
        </div>

        <CareerTimeline experience={experience} education={education} />
      </div>
    </Section>
  );
}