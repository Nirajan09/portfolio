import type { Metadata } from "next";
import { PrivacyContent } from "@/components/privacy/PrivacyContent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Nirajan Tiwari's portfolio. Details on data handling, contact form processing via Web3Forms, hosting on Vercel, and visitor rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyContent />;
}
