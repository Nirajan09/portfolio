import { track as trackVercel } from "@vercel/analytics";

/** Every event the site sends. Keep this list short and free of personal data. */
export type AnalyticsEvent =
  | "nav_click"
  | "hero_cta_click"
  | "project_view"
  | "project_external_link"
  | "resume_click"
  | "social_click"
  | "contact_form_start"
  | "contact_form_submit";

export type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const vercelEnabled = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "true";

/**
 * Sends one event to whichever providers are loaded. Safe to call anywhere on
 * the client: it does nothing when no provider is configured.
 * Never pass form contents or anything personal as params.
 */
export function trackEvent(name: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, params);
  }

  window.gtag?.("event", name, params);
  if (vercelEnabled) trackVercel(name, params);
}

/**
 * Reads `data-track-*` attributes into event params, e.g.
 * data-track-project="job-portal" -> { project: "job-portal" }.
 */
export function readTrackParams(dataset: DOMStringMap): AnalyticsParams {
  const params: AnalyticsParams = {};
  for (const [key, value] of Object.entries(dataset)) {
    if (key === "track" || !key.startsWith("track") || value === undefined) continue;
    const name = key.slice(5);
    params[name.charAt(0).toLowerCase() + name.slice(1)] = value;
  }
  return params;
}