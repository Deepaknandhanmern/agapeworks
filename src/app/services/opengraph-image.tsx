import { renderOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const alt = "Services - Agape Works";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage(
    "Web, mobile, SaaS, AI - end to end.",
    "Custom software, e-commerce, and digital marketing, built on the stack that fits the job.",
  );
}
