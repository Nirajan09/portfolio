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
    mode: "On-site",
    employmentType: "Full-time",
    department: "Core Engineering",
    technologies: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Django REST",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    id: "vyomite-associate",
    company: "Vyomite IT Services",
    role: "Associate Full-Stack Developer",
    period: "Oct 2025 - Mar 2026",
    location: "Kathmandu, Nepal",
    mode: "Hybrid",
    employmentType: "Full-time",
    department: "Client Solutions",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "PostgreSQL",
    ],
  },
  {
    id: "vyomite-intern",
    company: "Vyomite IT Services",
    role: "Frontend Developer Intern",
    period: "Jul 2025 - Sep 2025",
    location: "Kathmandu, Nepal",
    mode: "Hybrid",
    employmentType: "Internship",
    department: "Frontend Engineering",
    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Figma",
      "Responsive UI",
    ],
  },
];