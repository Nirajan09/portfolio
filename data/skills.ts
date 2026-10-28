export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Interfaces that are fast, accessible, responsive, and polished.",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "ShadCN UI"],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "APIs and data layers built to scale, stay secure, and remain reliable.",
    skills: ["Django", "PostgreSQL", "Node.js", "MongoDB", "Express.js"],
  },
  {
    id: "tools",
    title: "Development Tools",
    description: "The automated workflow that keeps shipping smooth and repeatable.",
    skills: ["Docker", "Linux", "Git", "GitHub", "Postman"],
  },
] as const;

export type SkillGroup = (typeof skillGroups)[number];
export type SkillGroupId = SkillGroup["id"];
export type SkillName = SkillGroup["skills"][number];