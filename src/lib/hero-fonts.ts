import { Instrument_Serif, Readex_Pro } from "next/font/google";

// Cinematic display face used only by the homepage video hero (logo +
// headline) — kept separate from the site-wide --font-heading (Montserrat)
// so this stays scoped to that one hero section.
export const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

// Scoped to the securify-style homepage hero only, so it doesn't override
// the site-wide --font-sans/--font-heading used everywhere else.
export const readexPro = Readex_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
