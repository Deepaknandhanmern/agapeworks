import type { Metadata } from "next";
import { WedlyCountdown } from "@/components/sections/wedly-countdown";

export const metadata: Metadata = {
  title: "Wedly — Coming Soon — Agape Works",
  description: "Wedly is launching soon.",
};

// Deliberately bare — no header, footer, or site-wide widgets (all of them
// exclude "/wedly" specifically for this). Just the countdown.
export default function WedlyPage() {
  return <WedlyCountdown />;
}
