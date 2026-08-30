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
    ],
  },
};

export default nextConfig;
