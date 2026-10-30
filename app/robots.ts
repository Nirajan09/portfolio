import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";

  return {
    rules: [
      {
        userAgent: "*",
        allow: isPreview ? undefined : "/",
        disallow: isPreview ? "/" : ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}