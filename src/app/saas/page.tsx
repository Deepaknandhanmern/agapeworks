import type { Metadata } from "next";
import SaasTemplate from "@/components/ui/saa-s-template";

const SAAS_TITLE = "SaaS Development - Agape Works";
const SAAS_DESCRIPTION =
  "Multi-tenant platforms, subscription billing, dashboards and admin panels - designed and built end-to-end by Agape Works.";

export const metadata: Metadata = {
  title: SAAS_TITLE,
  description: SAAS_DESCRIPTION,
  openGraph: { title: SAAS_TITLE, description: SAAS_DESCRIPTION, url: "/saas" },
  twitter: { title: SAAS_TITLE, description: SAAS_DESCRIPTION },
};

export default function SaasPage() {
  return <SaasTemplate />;
}
