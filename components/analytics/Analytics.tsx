import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { allowIndexing } from "@/lib/seo";
import { GoogleAnalytics } from "./GoogleAnalytics";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const vercelEnabled = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "true";

/**
 * Loads whichever analytics providers are configured, in production only
 * (never on localhost or preview deployments, so your data stays clean).
 * With no environment variables set, this renders nothing.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production" || !allowIndexing) return null;

  return (
    <>
      {gaId && /^G-[A-Z0-9]+$/.test(gaId) && <GoogleAnalytics id={gaId} />}
      {vercelEnabled && <VercelAnalytics />}
    </>
  );
}