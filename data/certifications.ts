import type { Certification } from "@/types";

// DUMMY PLACEHOLDERS: replace with real certificates before launch.
// Real entries can also include `credentialUrl` and `image`
// (e.g. image: { src: "/certificates/name.png", alt: "..." }).
// If this list is emptied, the section and its nav links hide automatically.
export const certifications: readonly Certification[] = [
  {
    id: "sample-1",
    title: "Sample Certificate One",
    issuer: "Issuing Organization",
    date: "Jan 2025",
    description: "Placeholder entry. Replace with a real certificate before launch.",
  },
  {
    id: "sample-2",
    title: "Sample Certificate Two",
    issuer: "Issuing Organization",
    date: "Jun 2025",
    description: "Placeholder entry. Replace with a real certificate before launch.",
  },
  {
    id: "sample-3",
    title: "Sample Certificate Three",
    issuer: "Issuing Organization",
    date: "Sep 2025",
    description: "Placeholder entry. Replace with a real certificate before launch.",
  },
];