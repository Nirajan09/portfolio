export const services = [
  {
    id: "full-stack",
    title: "Full-Stack Web Development",
    description:
      "Modern web applications using React, Next.js, Django and Node.js.",
    tags: ["React", "Next.js", "Django", "Node.js"],
  },
  {
    id: "backend",
    title: "Backend & API Development",
    description:
      "REST APIs, authentication, authorization, database-backed systems and integrations.",
    tags: ["REST APIs", "Auth", "Databases", "Integrations"],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Responsive interfaces using React, Next.js, TypeScript and Tailwind CSS.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "business-websites",
    title: "Business Website Development",
    description: "Modern responsive websites for businesses and organizations.",
    tags: ["Responsive", "SEO-ready", "Fast"],
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];