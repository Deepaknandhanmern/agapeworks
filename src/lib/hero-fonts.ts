import { Silkscreen, Readex_Pro } from "next/font/google";

// Retro dot-matrix display face for the homepage hero's headline and stat
// glyphs — a legitimately free, properly licensed (OFL) Google Font chosen
// as a substitute for a font requested from a third-party mirror
// (onlinewebfonts.com) whose redistribution rights for that font are
// unclear. See the feedback memory on font requests for why that matters.
export const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
});

// Scoped to the homepage hero's body copy only, so it doesn't override the
// site-wide --font-sans/--font-heading used everywhere else.
export const readexPro = Readex_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
