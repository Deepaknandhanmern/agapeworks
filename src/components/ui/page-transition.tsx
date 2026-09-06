"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Wraps route content in a fade so navigating between pages doesn't hard-cut.
// Keyed by pathname so React remounts on each route change and replays the
// CSS keyframe; flex-1 keeps the existing sticky-footer flex layout on
// `<body>` intact now that this div sits between it and the page content.
//
// Deliberately CSS rather than framer-motion: this sits in the root layout,
// so importing framer-motion here put it in every route's bundle - including
// pure-text pages like /terms that use no animation at all. The exit half of
// the old AnimatePresence fade is dropped; App Router can't hold the outgoing
// route long enough for it to reliably play anyway.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-page-fade flex flex-1 flex-col">
      {children}
    </div>
  );
}
