export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend Development",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "ShadCN UI"],
  },
  {
    id: "backend",
    title: "Backend Development",
    skills: ["Django", "PostgreSQL", "Node.js", "MongoDB", "Express.js"],
  },
  {
    id: "tools",
    title: "Development Tools",
    skills: ["Docker", "Linux", "Git", "GitHub", "Postman"],
  },
] as const;

export type SkillGroupId = (typeof skillGroups)[number]["id"];