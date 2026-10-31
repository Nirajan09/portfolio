import type { Metadata } from "next";
import { personal } from "@/data/personal";
import type { Project } from "@/types";

export const siteConfig = {
  name: personal.name,
  url: personal.siteUrl,
  title: `${personal.name} | ${personal.role}`,
  description:
    "Nirajan Tiwari is a Full Stack Developer based in Kathmandu, Nepal, building web applications with React, Next.js, Django and Node.js.",
  locale: "en_US",
} as const;

export const absoluteUrl = (path = "/") =>
  new URL(path, siteConfig.url).toString();

/**
 * Only the production deployment should be indexed. Vercel preview
 * deployments set VERCEL_ENV=preview; development environments are unindexed.
 */
export const allowIndexing =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" ||
  (process.env.NODE_ENV === "production" &&
    (process.env.VERCEL_ENV ?? "production") === "production");

/** Canonical + Open Graph + Twitter metadata for one page. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

export function personJsonLd() {
  const sameAs = [personal.socials.github, personal.socials.linkedin].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: personal.name,
    url: absoluteUrl("/"),
    jobTitle: personal.role,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    knowsAbout: ["React", "Next.js", "Django", "Node.js", "TypeScript", "PostgreSQL"],
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": absoluteUrl("/#person") },
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.overview ?? project.summary,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    author: {
      "@type": "Person",
      name: personal.name,
      url: absoluteUrl("/"),
    },
    ...(project.links?.repo && { codeRepository: project.links.repo }),
    ...(project.links?.live && { url: project.links.live }),
    keywords: project.stack.join(", "),
  };
}