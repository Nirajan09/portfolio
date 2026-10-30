export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Building accessible, responsive user interfaces with reusable components and predictable state.",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "ShadCN UI"],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Developing REST APIs, database models, authentication workflows, and server-side business logic.",
    skills: ["Django", "PostgreSQL", "Node.js", "MongoDB", "Express.js"],
  },
  {
    id: "tools",
    title: "Development Tools",
    description: "Version control, containerization, environment management, and API testing tools.",
    skills: ["Docker", "Linux", "Git", "GitHub", "Postman"],
  },
] as const;

export type SkillGroup = (typeof skillGroups)[number];
export type SkillGroupId = SkillGroup["id"];
export type SkillName = SkillGroup["skills"][number];