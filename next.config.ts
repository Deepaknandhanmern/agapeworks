import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Default is 1mb — too small for invoice/spec-sheet PDFs uploaded via
    // the client-project Files feature (src/lib/actions/client-project-actions.ts).
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    // 75 is next/image's own default; 50 is used by LinkPreview's screenshots.
    qualities: [50, 75],
    remotePatterns: [
      {
        // LinkPreview (src/components/ui/link-preview.tsx) fetches live
        // screenshots of external links through this API.
        protocol: "https",
        hostname: "api.microlink.io",
      },
      {
        // Homepage hero background (src/components/sections/agape-hero.tsx)
        // — routing it through next/image instead of a plain <img> lets
        // Next serve a properly sized/compressed version per device instead
        // of shipping the full 3840px-wide source to every phone.
        protocol: "https",
        hostname: "hoirqrkdgbmvpwutwuwj.supabase.co",
      },
    ],
  },
};

export default nextConfig;
