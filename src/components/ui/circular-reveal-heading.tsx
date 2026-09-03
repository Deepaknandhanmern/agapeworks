"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Adapted from a pasted "circular reveal heading" component - dropped the
// original's per-word hover-image reveal entirely (it needed a photo per
// rotating word; Agape has no honest per-category image to show there) and
// its neumorphic gray styling (didn't fit the site's black/white/amber
// palette). What's left: the rotating curved-text ring and gentle float,
// restyled to match.
interface CircularRevealHeadingProps {
  items: string[];
  centerContent: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: { container: "h-[220px] w-[220px]", fontSize: "text-[11px]", tracking: "tracking-[0.25em]", radius: 160, gap: 40 },
  md: { container: "h-[300px] w-[300px]", fontSize: "text-xs", tracking: "tracking-[0.3em]", radius: 160, gap: 30 },
  lg: { container: "h-[380px] w-[380px]", fontSize: "text-sm", tracking: "tracking-[0.3em]", radius: 160, gap: 24 },
};

export function CircularRevealHeading({ items, centerContent, className, size = "md" }: CircularRevealHeadingProps) {
  const config = sizeConfig[size];

  const totalGapDegrees = config.gap * items.length;
  const availableDegrees = 360 - totalGapDegrees;
  const segmentDegrees = availableDegrees / items.length;

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "relative flex items-center justify-center rounded-full border border-border bg-background shadow-sm",
        config.container,
        className,
      )}
    >
      <div className="relative z-10 flex items-center justify-center">{centerContent}</div>

      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <path
            id="circular-reveal-curve"
            fill="none"
            d={`M 200,200 m -${config.radius},0 a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`}
          />
          {items.map((text, index) => {
            const startPosition = index * (segmentDegrees + config.gap);
            const startOffset = `${(startPosition / 360) * 100}%`;
            return (
              <text
                key={text}
                className={cn(config.fontSize, config.tracking, "fill-foreground font-medium uppercase")}
              >
                <textPath
                  href="#circular-reveal-curve"
                  startOffset={startOffset}
                  textLength={`${segmentDegrees * 1.8}`}
                  lengthAdjust="spacingAndGlyphs"
                >
                  {text}
                </textPath>
              </text>
            );
          })}
        </svg>
      </motion.div>
    </motion.div>
  );
}
