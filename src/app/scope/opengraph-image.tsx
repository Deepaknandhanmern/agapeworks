import { renderOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const alt = "Instant Project Estimate - Agape Works";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage(
    "Get a rough estimate in seconds.",
    "Tell us what you're building - timeline, budget range, and build phases, powered by the same AI Agape Works builds for clients.",
  );
}
