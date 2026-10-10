import { personal } from "./personal";

export const about = {
  paragraphs: [
    "I'm a Full Stack Developer based in Kathmandu, Nepal. I started as a Frontend Developer Intern at Vyomite IT Services, moved into an Associate Full-Stack Developer role there, and now build web applications across the whole stack at Cherdung Info Tech.",
    "My day-to-day stack is React, Next.js and TypeScript on the frontend, with Django REST Framework and Node.js/Express on the backend, backed by PostgreSQL and MongoDB.",
    "I like keeping data, logic and interface clearly separated so features stay easy to change, and I care about the details people actually notice: responsive layouts, accessible interactions and pages that load quickly.",
  ],
  status: "Open to freelance and collaboration",
  facts: [
    {
      id: "current",
      label: "Currently",
      value: "Full Stack Developer at Cherdung Info Tech Pvt. Ltd.",
      wide: true,
    },
    {
      id: "education",
      label: "Education",
      value: "BSc in Computer Science, Orchid International College",
      wide: true,
    },
    { id: "location", label: "Based in", value: personal.location, wide: false },
    {
      id: "outside",
      label: "Outside of code",
      value: "Strength training and gaming",
      wide: false,
    },
  ],
} as const;

export type AboutFactId = (typeof about.facts)[number]["id"];