import type { MetadataRoute } from "next";

const BASE_URL = "https://agapeworks.in";

// Authenticated apps (nothing here should be indexed) and capability
// URLs - /status/[token] and /invoice/[token] are gated by an
// unguessable link, not a login, so they must never be crawled or
// they stop being private-by-obscurity.
const DISALLOW = ["/dashboard", "/vahi", "/client", "/status", "/invoice", "/api", "/test"];

// Answer/generative engines are listed explicitly rather than left to the
// wildcard. The wildcard already permits them, but naming each one states
// the intent (this content is meant to be cited by AI assistants) and keeps
// the same disallow list applied, so the admin apps stay out of training and
// retrieval as well as out of search.
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bytespider",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/", disallow: DISALLOW })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
