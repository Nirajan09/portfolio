import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getAllPostsMeta } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const posts = getAllPostsMeta();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [absoluteUrl("/profile.png")],
    },
    {
      url: absoluteUrl("/blog"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: project.cover ? [absoluteUrl(project.cover.src)] : undefined,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.75,
      images: post.cover ? [absoluteUrl(post.cover.src)] : undefined,
    })),
  ];
}