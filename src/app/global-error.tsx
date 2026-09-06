"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary for errors thrown in the root layout itself, which
 * app/error.tsx can't catch - by the time this renders, the layout (and
 * therefore <html>/<body>, fonts, and globals.css) never mounted. That's why
 * this file declares its own <html>/<body> and uses inline styles rather than
 * Tailwind classes or shared components: none of them are guaranteed to exist
 * in the situation this exists to handle.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "24px",
          textAlign: "center",
          background: "#ffffff",
          color: "#0a0a0a",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        }}
      >
        <div>
          <h1 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: 600 }}>
            Something went wrong.
          </h1>
          <p style={{ margin: 0, maxWidth: "26rem", fontSize: "14px", color: "#555555" }}>
            That&apos;s on us, not you. Try again, or head back home.
          </p>
          {error.digest && (
            <p style={{ marginTop: "12px", fontSize: "12px", color: "#888888" }}>
              Reference: {error.digest}
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              cursor: "pointer",
              borderRadius: "8px",
              border: "1px solid #d4d4d4",
              background: "transparent",
              padding: "9px 16px",
              fontSize: "14px",
              fontWeight: 500,
              color: "inherit",
            }}
          >
            Try again
          </button>
          <a
            href="/"
            style={{
              borderRadius: "8px",
              background: "#0a0a0a",
              padding: "10px 16px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            Back to home
          </a>
        </div>
      </body>
    </html>
  );
}
