export type Project = {
  slug: string;
  title: string;
  /** One line for cards and the detail hero. */
  summary: string;
  /** Longer description. The detail page only shows an Overview if this exists. */
  overview?: string;
  stack: readonly string[];
  features: readonly string[];
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