export type StackGroup = {
  label: string;
  items: readonly string[];
};

export type Project = {
  slug: string;
  title: string;
  /** One line for cards and the detail hero. */
  summary: string;
  /** Longer description. The detail page only shows an Overview if this exists. */
  overview?: string;
  /** Short flat list used on cards. */
  stack: readonly string[];
  /** Grouped stack for the detail page. Falls back to `stack` if omitted. */
  stackGroups?: readonly StackGroup[];
  features: readonly string[];
  /** Ordered, high-level flow of how the app works. */
  howItWorks?: readonly string[];
  /** Technical points worth calling out. */
  highlights?: readonly string[];
  links?: { live?: string; repo?: string };
  /** Screenshot in /public. Without it, a generated cover is used. */
  cover?: { src: string; alt: string };
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  /** Display string, e.g. "Apr 2026 – Present". Keep in sync with the resume. */
  period: string;
  current?: boolean;
  location: string;
  mode?: string;
  /** Real, factual bullet points. Omitted until provided. */
  highlights?: readonly string[];
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  /** Display string, e.g. "Mar 2025". */
  date: string;
  description?: string;
  credentialUrl?: string;
  /** Certificate image in /public. Enables the preview modal. */
  image?: { src: string; alt: string };
};