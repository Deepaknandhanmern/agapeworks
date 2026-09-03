import { renderOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const alt = "Sellara - AI Commerce Platform by Agape Works";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage(
    "Sellara - AI-first commerce.",
    "A premium store builder, an AI shopping assistant, and AI-generated content, in one platform.",
  );
}
