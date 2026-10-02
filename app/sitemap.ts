import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
    })),
  ];
}