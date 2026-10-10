export const services = [
  {
    id: "full-stack",
    title: "Full-Stack Web Development",
    description:
      "End-to-end web applications, from database and API design to a polished interface, ready to deploy.",
    tags: ["Web Apps", "Admin Dashboards", "Deployment"],
  },
  {
    id: "backend",
    title: "Backend & API Development",
    description:
      "Secure, well-structured APIs and data layers that your product can grow on.",
    tags: ["REST APIs", "Auth & Roles", "Payments", "Integrations"],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Fast, accessible and responsive interfaces that look sharp on every screen.",
    tags: ["Responsive UI", "Accessibility", "Performance"],
  },
  {
    id: "business-websites",
    title: "Business Websites",
    description:
      "Professional websites for businesses and organizations that are easy to find and easy to trust.",
    tags: ["Responsive", "SEO-ready", "Fast"],
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];