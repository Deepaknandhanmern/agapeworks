import { ImageResponse } from "next/og";

// Vivira gets its own OG image rather than the shared Agape template
// (src/lib/og-image.tsx) - same orange->purple brand gradient already used
// on its hero headline, nav card glow, and footer badge this session.
export const alt = "Vivira - Agape Works";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
            gap: 12,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Vivira
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: 980,
            backgroundImage: "linear-gradient(90deg, #f97316 0%, #c2410c 35%, #9333ea 70%, #f97316 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          An AI cart that recovers itself
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "rgba(255,255,255,0.6)" }}>
          Watches for abandoned carts and brings shoppers back automatically.
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
