import { PageContainer } from "@/components/layout/PageContainer";
import { getProjectNav } from "@/data/projects";
import type { Project } from "@/types";
import { ProjectArchitectureSection } from "./ProjectArchitectureSection";
import { ProjectChallengesSection } from "./ProjectChallengesSection";
import { ProjectFeaturesSection } from "./ProjectFeaturesSection";
import { ProjectHero } from "./ProjectHero";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectOverviewSection } from "./ProjectOverviewSection";
import { ProjectSectionNav } from "./ProjectSectionNav";
import { ProjectStackSection } from "./ProjectStackSection";

type ProjectDetailProps = {
  project: Project;
  related: readonly Project[];
  prevProject?: Project | null;
  nextProject?: Project | null;
};

export function ProjectDetail({
  project,
  related,
  prevProject,
  nextProject,
}: ProjectDetailProps) {
  const nav = getProjectNav(project.slug);
  const resolvedPrev = prevProject !== undefined ? prevProject : nav.prev;
  const resolvedNext = nextProject !== undefined ? nextProject : nav.next;

  return (
    <article className="min-h-screen overflow-x-clip">
      <PageContainer>
        {/* Section A: Hero Showcase */}
        <ProjectHero project={project} />

        {/* In-page sticky quick-jump navigation */}
        <ProjectSectionNav />

        {/* Section B: Project Overview, Problem & Solution Matrix */}
        <ProjectOverviewSection project={project} />

        {/* Section E: Architecture & System Flow */}
        <ProjectArchitectureSection project={project} />

        {/* Section C: Key Features & Capabilities */}
        <ProjectFeaturesSection project={project} />

        {/* Section D: Grouped Technology Stack */}
        <ProjectStackSection project={project} />

        {/* Section F: Engineering Challenges & Technical Outcomes */}
        <ProjectChallengesSection project={project} />

        {/* Section G: Navigation, Previous/Next, and Related Case Studies */}
        <ProjectNavigation
          currentProject={project}
          prevProject={resolvedPrev}
          nextProject={resolvedNext}
          relatedProjects={related}
        />
      </PageContainer>
    </article>
  );
}