import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/content";
import { OG_MARK_DATA_URI } from "@/lib/og-mark";

export const alt = "Agape Works blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
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
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 700 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og's Satori renderer requires a plain img element, not next/image */}
          <img src={OG_MARK_DATA_URI} width={38} height={33} alt="" />
          Agape Works - Blog
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
