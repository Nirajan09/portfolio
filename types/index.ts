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