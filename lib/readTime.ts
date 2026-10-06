import type { Project } from "@/types";

const WORDS_PER_MINUTE = 200;

const countWords = (text: string) =>
  text.trim().split(/\s+/).filter(Boolean).length;

/** Reading time in whole minutes (minimum 1), based on the visible text of a project. */
export function getReadTimeMinutes(project: Project): number {
  const parts = [
    project.title,
    project.summary,
    project.overview ?? "",
    ...project.features,
    ...(project.howItWorks ?? []),
    ...(project.highlights ?? []),
    ...(project.stackGroups?.flatMap((group) => [group.label, ...group.items]) ??
      project.stack),
  ];

  const words = parts.reduce((total, part) => total + countWords(part), 0);
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export const formatReadTime = (minutes: number) => `${minutes} min read`;