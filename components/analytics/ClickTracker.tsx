"use client";

import { useEffect } from "react";
import { readTrackParams, trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/**
 * One delegated click listener for the whole site. Any element (or ancestor)
 * with data-track="event_name" reports that event, with data-track-* as params.
 * This keeps server components server components: no onClick wiring needed.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-track]");
      const name = element?.dataset.track;
      if (!element || !name) return;
      trackEvent(name as AnalyticsEvent, readTrackParams(element.dataset));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}