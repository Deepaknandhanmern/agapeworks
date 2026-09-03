import type { Metadata } from "next";
import { AsmeHero } from "@/components/asme-test/asme-hero";
import { AsmeAboutSection } from "@/components/asme-test/asme-about-section";
import { AsmeFeaturedVideoSection } from "@/components/asme-test/asme-featured-video-section";
import { AsmePhilosophySection } from "@/components/asme-test/asme-philosophy-section";
import { AsmeServicesSection } from "@/components/asme-test/asme-services-section";
import "@/components/asme-test/asme-test.css";

export const metadata: Metadata = {
  title: "Asme (test preview)",
  robots: { index: false, follow: false },
};

export default function AsmeTestPage() {
  return (
    <div>
      <AsmeHero />
      <AsmeAboutSection />
      <AsmeFeaturedVideoSection />
      <AsmePhilosophySection />
      <AsmeServicesSection />
    </div>
  );
}
