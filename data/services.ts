export const services = [
  {
    id: "full-stack",
    title: "Full-Stack Web Development",
    shortTitle: "Full-Stack",
    badge: "End-to-End",
    summary:
      "Turnkey web applications built from database architecture to a polished, high-performance interface.",
    features: [
      "Custom SaaS & web applications",
      "Interactive dashboards & data portals",
      "Database schema & migration modeling",
      "Dockerized deployment & automated CI/CD",
    ],
  },
  {
    id: "backend",
    title: "Backend & API Systems",
    shortTitle: "Backend & APIs",
    badge: "High Concurrency",
    summary:
      "Secure, scalable backend services with high-throughput REST APIs, database integrity, and payment workflows.",
    features: [
      "RESTful API design & OpenAPI specs",
      "PostgreSQL, MySQL & MongoDB data layers",
      "Payment integrations (Stripe, eSewa, Khalti)",
      "JWT auth, role-based access & webhooks",
    ],
  },
  {
    id: "frontend",
    title: "Modern Frontend Engineering",
    shortTitle: "Frontend UI/UX",
    badge: "Fluid & Fast",
    summary:
      "Sub-second page loads, clean design systems, and responsive layouts engineered for peak user engagement.",
    features: [
      "Next.js & React component architectures",
      "Core Web Vitals & 95+ Lighthouse scores",
      "Accessible (WCAG 2.1) & mobile-first UI",
      "Smooth micro-interactions & GPU animations",
    ],
  },
  {
    id: "business-websites",
    title: "High-Impact Business Websites",
    shortTitle: "Business Sites",
    badge: "SEO & Growth",
    summary:
      "Conversion-focused websites built for modern brands, optimized to rank high on search engines and turn visitors into leads.",
    features: [
      "Technical SEO & schema metadata",
      "Global CDN caching & sub-second first paint",
      "Lead capture forms with spam protection",
      "Analytics tracking & conversion tuning",
    ],
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];