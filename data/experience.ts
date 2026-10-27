import type { Experience } from "@/types";

// Newest first. Dates follow the spec; verify against the final resume.
export const experience: readonly Experience[] = [
  {
    id: "cherdung-full-stack",
    company: "Cherdung Info Tech Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "Apr 2026 - Present",
    current: true,
    location: "Kathmandu, Nepal",
    highlights: [
      "Architect and maintain scalable web applications utilizing Next.js App Router, React 19, TypeScript, and Django REST framework.",
      "Design normalized database schemas in PostgreSQL, optimizing query execution plans and integrating Redis caching layers.",
      "Build secure RESTful APIs with strict payload validation, token authentication, and automated CI/CD pipeline deployments.",
    ],
  },
  {
    id: "vyomite-associate",
    company: "Vyomite IT Services",
    role: "Associate Full-Stack Developer",
    period: "Oct 2025 - Mar 2026",
    location: "Kathmandu, Nepal",
    mode: "Hybrid",
    highlights: [
      "Developed responsive, accessible user interfaces using React, Next.js, and Tailwind CSS adhering to WCAG 2.2 AA standards.",
      "Integrated third-party REST APIs, webhooks, and asynchronous background queues for high-reliability data processing.",
      "Refactored relational queries and database indexes, reducing median endpoint response latency across core client portals.",
    ],
  },
  {
    id: "vyomite-intern",
    company: "Vyomite IT Services",
    role: "Frontend Developer Intern",
    period: "Jul 2025 - Sep 2025",
    location: "Kathmandu, Nepal",
    mode: "Hybrid",
    highlights: [
      "Translated Figma design specifications into pixel-perfect, responsive component libraries using React and modern CSS.",
      "Collaborated in agile sprint cycles, daily standups, and rigorous pull request code reviews to uphold software quality.",
      "Identified and resolved cross-browser rendering inconsistencies and layout shifts across mobile and desktop viewports.",
    ],
  },
];