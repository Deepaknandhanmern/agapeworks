import type { Metadata } from "next";
import { SellaraLanding } from "@/components/sections/sellara-landing";

export const metadata: Metadata = {
  title: "Sellara — AI Commerce Platform by Agape Works",
  description:
    "Sellara is an AI-first e-commerce platform: a premium store builder, an AI shopping assistant, and AI-generated content and support, in one platform. Early access, by Agape Works.",
};

export default function SellaraPage() {
  return <SellaraLanding />;
}
