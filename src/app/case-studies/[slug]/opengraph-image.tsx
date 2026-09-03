import { renderOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";
import { getAllCaseStudies } from "@/lib/content";

export const alt = "Agape Works case study";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getAllCaseStudies().find((cs) => cs.slug === slug);
  return renderOgImage(caseStudy?.title ?? "Case study", caseStudy?.summary);
}
