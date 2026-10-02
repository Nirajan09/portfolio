import { ImageResponse } from "next/og";
import { personal } from "@/data/personal";
import { OgCard } from "@/lib/brand";

export const alt = "Nirajan Tiwari, Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Portfolio"
        title={personal.name}
        subtitle={`${personal.role} · ${personal.location}`}
        footer="React · Next.js · Django · Node.js"
      />
    ),
    size,
  );
}