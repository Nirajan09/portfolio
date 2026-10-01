import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A few things I've built, from recommendation systems to payment workflows."
        />
      </Reveal>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={index * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}