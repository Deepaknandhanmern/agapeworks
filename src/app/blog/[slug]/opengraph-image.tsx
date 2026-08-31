import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/content";

export const alt = "Agape Works blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  const title = post?.title ?? "Agape Works";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 700 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#fcd34d" }} />
          Agape Works — Blog
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...size },
  );
}
