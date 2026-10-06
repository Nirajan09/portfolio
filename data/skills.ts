export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Interfaces that are fast, accessible and polished.",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "ShadCN UI"],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "APIs and data layers built to scale and stay reliable.",
    skills: ["Django", "PostgreSQL", "Node.js", "MongoDB", "Express.js"],
  },
  {
    id: "tools",
    title: "Development Tools",
    description: "The workflow that keeps shipping smooth and repeatable.",
    skills: ["Docker", "Linux", "Git", "GitHub", "Postman"],
  },
] as const;

export type SkillGroup = (typeof skillGroups)[number];
export type SkillGroupId = SkillGroup["id"];
export type SkillName = SkillGroup["skills"][number];