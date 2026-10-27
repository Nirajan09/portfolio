import { certifications } from "./certifications";

const allNavItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
] as const;

export type NavItem = (typeof allNavItems)[number];

// Certifications only appears in navigation once there is something to show.
export const navItems: readonly NavItem[] = allNavItems.filter(
  (item) => item.id !== "certifications" || certifications.length > 0,
);

export const navHref = (id: NavItem["id"]) => `/#${id}`;