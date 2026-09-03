import { ImageResponse } from "next/og";
import { OG_MARK_DATA_URI } from "@/lib/og-mark";

// Shared by every route's opengraph-image.tsx (root's own predates this and
// still has its own copy - not worth risking a regression on the one image
// Google/social crawlers already have cached) so every other page gets a
// distinct branded card instead of none at all, without copy-pasting the
// same Satori tree per route.
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";

export function renderOgImage(title: string, subtitle?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og's Satori renderer requires a plain img element, not next/image */}
          <img src={OG_MARK_DATA_URI} width={44} height={38} alt="" />
          Agape Works
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
}
