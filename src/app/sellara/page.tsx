import type { Metadata } from "next";
import { SellaraLanding } from "@/components/sections/sellara-landing";

const SELLARA_TITLE = "Sellara - AI Commerce Platform by Agape Works";
const SELLARA_DESCRIPTION =
  "Sellara is an AI-first e-commerce platform: a premium store builder, an AI shopping assistant, and AI-generated content and support, in one platform. Early access, by Agape Works.";

export const metadata: Metadata = {
  title: SELLARA_TITLE,
  description: SELLARA_DESCRIPTION,
  openGraph: { title: SELLARA_TITLE, description: SELLARA_DESCRIPTION, url: "/sellara" },
  twitter: { title: SELLARA_TITLE, description: SELLARA_DESCRIPTION },
};

export default function SellaraPage() {
  return <SellaraLanding />;
}
