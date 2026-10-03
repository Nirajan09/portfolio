import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

// Analytics origins are only allowed when analytics is actually configured.
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const gaEnabled = Boolean(gaId && /^G-[A-Z0-9]+$/.test(gaId));

const csp = [
  "default-src 'self'",
  // Next.js emits inline bootstrap scripts, so 'unsafe-inline' is required
  // unless every page is rendered dynamically with per-request nonces.
  // There is no user-generated content on this site; the other directives
  // below do the heavy lifting (no plugins, no framing, no foreign forms).
  `script-src 'self' 'unsafe-inline'${gaEnabled ? " https://www.googletagmanager.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${gaEnabled ? " https://www.google-analytics.com https://www.googletagmanager.com" : ""}`,
  "font-src 'self'",
  `connect-src 'self'${
    gaEnabled
      ? " https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com"
      : ""
  }`,
  "manifest-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  // CSP only in production: the dev server needs eval and websockets for HMR.
  ...(isProduction ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

const nextConfig: NextConfig = {
  // Don't advertise the framework.
  poweredByHeader: false,

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The contact endpoint must never be cached.
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },

  // One canonical host: send the bare domain to www.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "nirajantiwari.com.np" }],
        destination: "https://www.nirajantiwari.com.np/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;