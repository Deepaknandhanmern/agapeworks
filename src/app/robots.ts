import type { MetadataRoute } from "next";

const BASE_URL = "https://agapeworks.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Authenticated apps (nothing here should be indexed) and capability
      // URLs — /status/[token] is gated by an unguessable link, not a login,
      // so it must never be crawled or it stops being private-by-obscurity.
      disallow: ["/dashboard", "/vahi", "/client", "/status", "/api"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
