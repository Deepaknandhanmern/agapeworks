import { renderOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const alt = "SaaS Development - Agape Works";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage(
    "Multi-tenant platforms, built right.",
    "Subscription billing, dashboards and admin panels - designed and built end-to-end.",
  );
}
