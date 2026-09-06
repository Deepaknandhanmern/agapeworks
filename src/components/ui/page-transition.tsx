"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Wraps route content in a fade so navigating between pages doesn't hard-cut.
// Keyed by pathname so React remounts on each route change and replays the
// CSS keyframe; flex-1 keeps the existing sticky-footer flex layout on
// `<body>` intact now that this div sits between it and the page content.
//
// Deliberately CSS rather than framer-motion: this sits in the root layout,
// so importing framer-motion here put it in every route's bundle.
//
// React's <ViewTransition> would be the nicer implementation (native
// crossfade, no client component needed), but it isn't available on this
// project's React 19.2.8 - it only exists in the canary builds Next's own
// docs assume. Revisit if React is ever moved to canary.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-page-fade flex flex-1 flex-col">
      {children}
    </div>
  );
}
