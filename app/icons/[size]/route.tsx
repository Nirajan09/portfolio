import { ImageResponse } from "next/og";
import { BrandMark } from "@/lib/brand";

// Stable URLs (/icons/192, /icons/512) for the web app manifest.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> },
) {
  const { size } = await params;
  const px = Number(size);
  return new ImageResponse(<BrandMark size={px} />, { width: px, height: px });
}