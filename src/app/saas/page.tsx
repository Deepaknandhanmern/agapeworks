import type { Metadata } from "next";
import SaasTemplate from "@/components/ui/saa-s-template";

export const metadata: Metadata = {
  title: "SaaS Development — Agape Works",
  description:
    "Multi-tenant platforms, subscription billing, dashboards and admin panels — designed and built end-to-end by Agape Works.",
};

export default function SaasPage() {
  return <SaasTemplate />;
}
