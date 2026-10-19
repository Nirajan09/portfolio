import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";
import { SkillCard } from "@/components/ui/SkillCard";

export function Skills() {
  return (
    <Section id="skills">
      <Reveal>
        <SectionHeading
          eyebrow="Technical Stack"
          title="Tools & technologies"
          description="A battle-tested stack of modern frontend frameworks, backend runtimes, databases, and DevOps tools I use to architect performant web applications."
        />
      </Reveal>

      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <li key={group.id}>
            <Reveal delay={index * 0.1} className="h-full">
              <SkillCard group={group} index={index} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}