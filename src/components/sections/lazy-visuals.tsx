"use client";

import dynamic from "next/dynamic";

/**
 * Below-the-fold decorative visuals, split out of the homepage's initial
 * payload. Both are heavy for what they are and neither carries content that
 * needs to be in the server-rendered HTML:
 *
 * - WorldMap pulls in `dotted-map`, whose world dataset dominated the
 *   homepage's largest chunk and inlined a very large SVG into the HTML.
 * - GyroidCanvas is a decorative aria-hidden WebGL canvas.
 *
 * `ssr: false` requires a Client Component boundary, hence this wrapper
 * rather than calling dynamic() from the (server) homepage. Each reserves
 * its final height up front so lazy-loading them costs no layout shift.
 */

const WorldMapDynamic = dynamic(
  () => import("@/components/ui/map").then((m) => m.WorldMap),
  {
    ssr: false,
    loading: () => <div aria-hidden="true" className="aspect-[2/1] w-full" />,
  },
);

const GyroidDynamic = dynamic(
  () => import("@/components/ui/gyroid-canvas").then((m) => m.GyroidCanvas),
  {
    ssr: false,
    loading: () => (
      <div aria-hidden="true" className="h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]" />
    ),
  },
);

type WorldMapProps = React.ComponentProps<typeof WorldMapDynamic>;

export function LazyWorldMap(props: WorldMapProps) {
  return <WorldMapDynamic {...props} />;
}

export function LazyGyroid({ className }: { className?: string }) {
  return <GyroidDynamic className={className} />;
}
