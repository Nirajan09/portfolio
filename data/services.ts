export const services = [
  {
    id: "full-stack",
    index: "01",
    title: "Full-Stack Web Development",
    tagline: "End-to-End Architecture",
    description:
      "I develop complete web applications, from database design and backend logic to responsive frontend interfaces.",
    deliverables: [
      "Custom web applications",
      "Admin dashboards and management systems",
      "Database design and integration",
      "Deployment and application maintenance",
    ],
    outcome: "Turnkey web systems built to scale seamlessly from day one.",
  },
  {
    id: "backend",
    index: "02",
    title: "Backend Development & APIs",
    tagline: "APIs & Data Layers",
    description:
      "I build secure, maintainable backend systems that handle application logic, data processing, authentication, and integrations.",
    deliverables: [
      "REST API development",
      "Authentication and authorization",
      "Database modeling and optimization",
      "Third-party API integrations",
    ],
    outcome: "High-performance APIs with strict data integrity and security.",
  },
  {
    id: "frontend",
    index: "03",
    title: "Frontend Development",
    tagline: "Modern UI / UX",
    description:
      "I create responsive, accessible, and user-friendly interfaces using modern frontend technologies.",
    deliverables: [
      "React and Next.js applications",
      "Responsive layouts and reusable components",
      "UI performance and accessibility improvements",
      "Frontend and backend integration",
    ],
    outcome: "Fluid micro-interactions, responsive design, and WCAG accessibility.",
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];
export type ServiceItem = (typeof services)[number];