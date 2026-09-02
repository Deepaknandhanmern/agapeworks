import type { MetadataRoute } from "next";

const BASE_URL = "https://agapeworks.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Authenticated apps (nothing here should be indexed) and capability
      // URLs — /status/[token] and /invoice/[token] are gated by an
      // unguessable link, not a login, so they must never be crawled or
      // they stop being private-by-obscurity.
      disallow: ["/dashboard", "/vahi", "/client", "/status", "/invoice", "/api"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
