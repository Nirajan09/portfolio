import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { allowIndexing } from "@/lib/seo";
import { GoogleAnalytics } from "./GoogleAnalytics";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const vercelEnabled = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "true";
const devEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_IN_DEV === "true";

/**
 * Loads whichever analytics providers are configured, in production only
 * (or when NEXT_PUBLIC_ENABLE_ANALYTICS_IN_DEV is set to "true" for local verification).
 * With no environment variables set, this renders nothing.
 */
export function Analytics() {
  const isAllowed = devEnabled || (process.env.NODE_ENV === "production" && allowIndexing);
  if (!isAllowed) return null;

  return (
    <>
      {gaId && /^G-[A-Z0-9]+$/.test(gaId) && <GoogleAnalytics id={gaId} />}
      {vercelEnabled && <VercelAnalytics />}
    </>
  );
}