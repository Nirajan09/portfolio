import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProject, getProjectNav, getRelatedProjects, projects } from "@/data/projects";
import { pageMetadata, projectJsonLd } from "@/lib/seo";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: `${project.title} — ${project.category ?? "Case Study"}`,
    description: project.summary ?? project.overview,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getProjectNav(slug);

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <ProjectDetail
        project={project}
        related={getRelatedProjects(slug)}
        prevProject={prev}
        nextProject={next}
      />
    </>
  );
}