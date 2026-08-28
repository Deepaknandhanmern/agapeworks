"use client";

import { cn } from "@/lib/utils";
import { CinematicThemeSwitcher } from "@/components/ui/cinematic-theme-switcher";

// The cinematic switcher is a fixed 104x64px pill — too large for the
// compact header bar as designed. Scaling it down visually (transform)
// alone would leave its original 104x64 layout footprint behind (transform
// doesn't affect layout), so the wrapper below is sized to the *scaled*
// dimensions and the inner content is scaled from its top-left corner to
// match — collapsing the footprint instead of just shrinking the paint.
const SCALE = 0.6;
const NATURAL_WIDTH = 104;
const NATURAL_HEIGHT = 64;

export function ThemeToggle({ className }: { className?: string }) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{ width: NATURAL_WIDTH * SCALE, height: NATURAL_HEIGHT * SCALE }}
    >
      <div style={{ transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
        <CinematicThemeSwitcher />
      </div>
    </div>
  );
}
