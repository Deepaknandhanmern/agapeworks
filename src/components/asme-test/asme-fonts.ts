import { Instrument_Serif } from "next/font/google";

// Self-hosted via next/font instead of the spec's raw @import - same
// Instrument Serif family/weights, no runtime request to fonts.googleapis.com.
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
