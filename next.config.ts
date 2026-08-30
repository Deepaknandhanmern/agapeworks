import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
