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
          eyebrow="Featured Projects"
          title="Engineered for real-world impact"
          description="A curated selection of full-stack platforms, scalable microservices, and interactive web applications engineered from concept to production."
        />
      </Reveal>

      <ul className="mt-14 space-y-16 sm:space-y-20 lg:space-y-28">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Reveal>
              <ProjectCard project={project} index={index} reversed={index % 2 === 1} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}