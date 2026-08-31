import { ImageResponse } from "next/og";

export const alt = "Agape Works — product engineering that ships";
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
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#fcd34d" }} />
          Agape Works
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: 920,
          }}
        >
          Product engineering that ships.
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "rgba(255,255,255,0.6)" }}>
          Fixed-scope engagements. Weekly demos. 100% code ownership.
        </div>
      </div>
    ),
    { ...size },
  );
}
