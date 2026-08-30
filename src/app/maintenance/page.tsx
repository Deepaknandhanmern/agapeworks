import type { Metadata } from "next";
import { MaintenanceScene } from "./maintenance-scene";

export const metadata: Metadata = {
  title: "Under maintenance — Agape Works",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return <MaintenanceScene />;
}
