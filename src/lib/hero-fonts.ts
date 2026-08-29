import { Instrument_Serif } from "next/font/google";

// Cinematic display face used only by the homepage video hero (logo +
// headline) — kept separate from the site-wide --font-heading (Montserrat)
// so this stays scoped to that one hero section.
export const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});
