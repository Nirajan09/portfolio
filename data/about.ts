import { personal } from "./personal";

export const about = {
  paragraphs: [
    "I'm a Full Stack Developer based in Kathmandu, Nepal, currently engineering scalable web applications and resilient backend services at Cherdung Info Tech. My journey evolved from frontend engineering into end-to-end full-stack development, delivering turnkey software from database modeling to fluid user interfaces.",
    "My architectural focus centers on building modular systems with clean separation of concerns — pairing high-performance React and Next.js frontends with robust Django and Node.js APIs backed by PostgreSQL and MongoDB.",
    "Beyond system architecture, I care deeply about the craftsman details that define exceptional user experiences: fluid GPU-accelerated micro-interactions, responsive typography, strict accessibility (WCAG), and sub-second page performance.",
  ],
  status: "Open to select freelance & technical collaborations",
  facts: [
    {
      id: "current",
      label: "Current Role",
      value: "Full Stack Developer",
      detail: "Cherdung Info Tech Pvt. Ltd.",
      badge: "Active",
      wide: true,
    },
    {
      id: "education",
      label: "Education",
      value: "B.Sc. Computer Science & IT",
      detail: "Orchid International College (Tribhuvan University)",
      wide: true,
    },
    {
      id: "location",
      label: "Based In",
      value: personal.location,
      detail: "UTC+5:45 • Remote & Hybrid Ready",
      wide: false,
    },
    {
      id: "outside",
      label: "Beyond Code",
      value: "Strength Training & Gaming",
      detail: "Discipline, strategy & wellness",
      wide: false,
    },
  ],
  pillars: [
    "Clean Architecture",
    "Type-Safe Systems",
    "High-Throughput APIs",
    "Pixel-Perfect UI",
  ],
} as const;

export type AboutFactId = (typeof about.facts)[number]["id"];