// Subtle, dependency-free film-grain texture laid over the whole page.
// Pure inline SVG turbulence noise as a data URI - no image asset, no
// npm package. Fixed + pointer-events-none so it never blocks clicks,
// and opacity is low enough to read as texture, not a visible pattern.
const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`,
  );

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] opacity-[0.035] mix-blend-overlay"
      style={{ backgroundImage: `url("${NOISE_SVG}")`, backgroundRepeat: "repeat" }}
    />
  );
}
