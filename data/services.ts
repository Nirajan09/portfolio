export const services = [
  {
    id: "full-stack",
    index: "01",
    title: "Full-Stack Web Development",
    tagline: "End-to-End Development",
    description:
      "I develop complete web applications, from database schema design and server logic to responsive user interfaces.",
    deliverables: [
      "Custom web application development",
      "Admin dashboards and internal tools",
      "Database schema design and API integration",
      "Production deployment and maintenance",
    ],
    outcome: "Production-ready web applications with unified frontend and backend workflows.",
  },
  {
    id: "backend",
    index: "02",
    title: "Backend Development & APIs",
    tagline: "APIs & Data Persistence",
    description:
      "I build backend services that handle business logic, data persistence, user authentication, and third-party integrations.",
    deliverables: [
      "REST API design and implementation",
      "Authentication and role-based access control",
      "Database modeling and query optimization",
      "Third-party service and webhook integrations",
    ],
    outcome: "Documented REST endpoints with consistent error handling and reliable database persistence.",
  },
  {
    id: "frontend",
    index: "03",
    title: "Frontend Development",
    tagline: "User Interfaces",
    description:
      "I build responsive, accessible, and clean user interfaces using React, Next.js, and TypeScript.",
    deliverables: [
      "React and Next.js client applications",
      "Reusable component architecture and responsive layouts",
      "Form handling, client validation, and state management",
      "API integration and client error handling",
    ],
    outcome: "Fast-loading, accessible interfaces that work reliably across mobile and desktop devices.",
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];
export type ServiceItem = (typeof services)[number];