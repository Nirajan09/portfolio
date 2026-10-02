import { ImageResponse } from "next/og";
import { BrandMark } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  // iOS applies its own rounded corners.
  return new ImageResponse(<BrandMark size={180} rounded={false} />, size);
}