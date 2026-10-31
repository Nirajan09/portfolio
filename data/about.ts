import { personal } from "./personal";

export const about = {
  paragraphs: [
    "I'm a full-stack developer based in Kathmandu, Nepal, currently working at Cherdung Info Tech. I build web applications and backend services, working across database design, REST APIs, and responsive frontend interfaces.",
    "My core technologies include React, Next.js, Django, Node.js, PostgreSQL, and MongoDB. I focus on practical architecture: designing clear database schemas, building predictable APIs, and delivering responsive, straightforward user interfaces.",
    "Outside of technology, I stay consistent with workouts, enjoy travelling, and unwind with gaming.",
  ],
  coreTechnologies: [
    "React",
    "Next.js",
    "Django",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
  ],
  status: "Open to new opportunities & technical collaborations",
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
      detail: "Available for remote, hybrid & relocation roles",
    },
    {
      id: "interests",
      label: "Outside Technology",
      title: "Workouts, Travelling & Gaming",
      detail: "Staying active, exploring new places, and downtime",
    },
  ],
} as const;

export type AboutHighlightId = (typeof about.highlights)[number]["id"];