import { ImageResponse } from "next/og";
import { projects, getProject } from "@/data/projects";
import { OgCard } from "@/lib/brand";

export const alt = "Project by Nirajan Tiwari";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow="Project"
        title={project?.title ?? "Project"}
        subtitle={project?.summary ?? "Selected work by Nirajan Tiwari"}
        footer={project ? project.stack.slice(0, 4).join(" · ") : "nirajantiwari.com.np"}
      />
    ),
    size,
  );
}