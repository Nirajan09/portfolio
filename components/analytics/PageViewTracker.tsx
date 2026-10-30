"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

/**
 * Tracks SPA client-side route changes in Next.js App Router and fires:
 * 1. page_view on every route transition
 * 2. Automatic project_view event when visiting /projects/[slug]
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      trackEvent("page_view", {
        path: pathname,
        title: typeof document !== "undefined" ? document.title : "",
      });

      if (pathname.startsWith("/projects/")) {
        const slug = pathname.replace(/^\/projects\//, "").split("/")[0];
        if (slug) {
          trackEvent("project_view", { project: slug });
        }
      }
    }
  }, [pathname]);

  return null;
}
