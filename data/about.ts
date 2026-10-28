import { personal } from "./personal";

export const about = {
  paragraphs: [
    "I'm a Full Stack Developer based in Kathmandu, Nepal, currently working at Cherdung Info Tech Pvt. Ltd. I build web applications and backend services, working across the stack from database design and API development to responsive, user-friendly interfaces.",
    "My primary technologies include React, Next.js, Django, Node.js, PostgreSQL, and MongoDB. I focus on writing clean, maintainable code, building reliable systems, and creating intuitive user experiences.",
    "Outside of development, I enjoy strength training and gaming.",
  ],
  coreTechnologies: [
    "React",
    "Next.js",
    "Django",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
  ],
  status: "Open to select freelance & technical collaborations",
  highlights: [
    {
      id: "role",
      label: "Current Role",
      title: "Full Stack Developer",
      detail: "Cherdung Info Tech Pvt. Ltd.",
      href: "#experience",
      actionLabel: "View experience",
    },
    {
      id: "education",
      label: "Education",
      title: "B.Sc. in CSIT",
      detail: "Orchid International College, Tribhuvan University",
    },
    {
      id: "location",
      label: "Location",
      title: personal.location,
      detail: "Open to remote & hybrid opportunities",
    },
    {
      id: "interests",
      label: "Interests",
      title: "Strength Training & Gaming",
      detail: "Fitness, strategy, and downtime",
    },
  ],
} as const;

export type AboutHighlightId = (typeof about.highlights)[number]["id"];