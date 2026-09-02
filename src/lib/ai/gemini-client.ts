import "server-only";
import dns from "node:dns";
import { GoogleGenAI } from "@google/genai";

// Windows dev-server-specific fix: Node's fetch (undici) tries IPv6 first and
// falls back to IPv4 only after a ~20s happy-eyeballs timeout, which made
// every call to Gemini's API take 25-30s here even though the exact same
// call from a plain `node script.js` was instant. Forcing IPv4 first removes
// that stall. Harmless on hosts without the issue.
dns.setDefaultResultOrder("ipv4first");

// Zero-arg-style init still needs the key handed in explicitly for this SDK
// (unlike the Anthropic client, which reads its env var itself). A
// missing/invalid key is treated as a soft failure by the one caller (the
// concierge chat route) — see its own check before this is ever used.
export const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Flash tier — picked for the concierge chat specifically because it's the
// low-latency option, matching the "immediate response" requirement for a
// live on-site chat widget.
export const CONCIERGE_MODEL = "gemini-3.7-flash";
