import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The floating "N" dev-tools indicator only ever renders in `next dev`,
  // never in production - switched off because it sits over the footer.
  devIndicators: false,
  experimental: {
    // Default is 1mb — too small for invoice/spec-sheet PDFs uploaded via
    // the client-project Files feature (src/lib/actions/client-project-actions.ts).
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // Sitewide security headers. Deliberately no Content-Security-Policy here:
  // the app renders inline <script type="application/ld+json"> blocks and
  // inline styles in several places, so a CSP strict enough to be worth
  // having needs nonces plumbed through first - a bigger change than a
  // header list, and a half-strict CSP gives false confidence.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Clickjacking protection. frame-ancestors is the modern form;
          // X-Frame-Options is kept for older browsers that ignore it.
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // No page here uses the camera, mic or geolocation.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
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
