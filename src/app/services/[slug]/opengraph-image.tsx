import { renderOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";
import { serviceDetails, getServiceDetailBySlug } from "@/lib/service-detail-data";

export const alt = "Agape Works service";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);
  return renderOgImage(service?.title ?? "Services", service?.description);
}
