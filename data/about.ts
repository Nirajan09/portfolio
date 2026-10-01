import { personal } from "./personal";

export const about = {
  paragraphs: [
    "I'm a Full Stack Developer based in Kathmandu, Nepal. I started as a Frontend Developer Intern at Vyomite IT Services, moved into an Associate Full-Stack Developer role there, and now build web applications across the whole stack at Cherdung Info Tech.",
    "My day-to-day stack is React, Next.js and TypeScript on the frontend, with Django REST Framework and Node.js/Express on the backend, backed by PostgreSQL and MongoDB.",
    "I like keeping data, logic and interface clearly separated so features stay easy to change, and I care about the details people actually notice: responsive layouts, accessible interactions and pages that load quickly.",
  ],
  highlights: [
    {
      id: "full-stack",
      title: "Full Stack Development",
      description:
        "End-to-end features, from database schema and APIs to the interface people use.",
    },
    {
      id: "backend",
      title: "Backend APIs",
      description:
        "REST APIs with Django REST Framework and Node.js/Express: authentication, authorization and database-backed data.",
    },
    {
      id: "frontend",
      title: "Frontend Applications",
      description:
        "Responsive React and Next.js interfaces built with TypeScript and Tailwind CSS.",
    },
    {
      id: "production",
      title: "Production Systems",
      description:
        "Payment integrations, Docker containers and CI/CD pipelines with GitHub Actions.",
    },
  ],
  facts: [
    { label: "Based in", value: personal.location },
    {
      label: "Education",
      value: "BSc in Computer Science, Orchid International College",
    },
    {
      label: "Currently",
      value: "Full Stack Developer at Cherdung Info Tech Pvt. Ltd.",
    },
    { label: "Outside of code", value: "Strength training and gaming" },
  ],
} as const;

export type AboutHighlightId = (typeof about.highlights)[number]["id"];