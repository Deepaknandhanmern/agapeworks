import { renderOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const alt = "About - Agape Works";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage(
    "Selfless, deliberate care.",
    "A remote-first product engineering team - fixed scope, weekly demos, code you actually own.",
  );
}
