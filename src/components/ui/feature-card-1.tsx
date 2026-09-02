"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedFeatureCardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.div>, "title"> {
  /** The numerical index to display, e.g., "001" */
  index: string;
  /** The tag or category label */
  tag: string;
  /** The main title or description */
  title: React.ReactNode;
  /**
   * Icon rendered in the center of the card. Pass a rendered element
   * (e.g. `<Globe />`), not a component reference - this component is a
   * client component, and a bare component reference can't cross the
   * server/client boundary from a server-rendered parent.
   */
  icon: React.ReactNode;
  /** The color variant which determines the gradient and tag color */
  color: "orange" | "purple" | "blue";
}

const colorVariants: Record<AnimatedFeatureCardProps["color"], React.CSSProperties> = {
  orange: {
    "--feature-color": "hsl(35, 91%, 55%)",
    "--feature-color-light": "hsl(41, 100%, 85%)",
    "--feature-color-dark": "hsl(24, 98%, 98%)",
  } as React.CSSProperties,
  purple: {
    "--feature-color": "hsl(262, 85%, 60%)",
    "--feature-color-light": "hsl(261, 100%, 87%)",
    "--feature-color-dark": "hsl(264, 100%, 98%)",
  } as React.CSSProperties,
  blue: {
    "--feature-color": "hsl(211, 100%, 60%)",
    "--feature-color-light": "hsl(210, 100%, 83%)",
    "--feature-color-dark": "hsl(216, 100%, 98%)",
  } as React.CSSProperties,
};

const AnimatedFeatureCard = React.forwardRef<HTMLDivElement, AnimatedFeatureCardProps>(
  ({ className, index, tag, title, icon, color, ...props }, ref) => {
    const cardStyle = colorVariants[color];

    return (
      <motion.div
        ref={ref}
        style={cardStyle}
        className={cn(
          "relative flex h-[380px] w-full max-w-sm flex-col justify-end overflow-hidden rounded-2xl border bg-card p-6 shadow-sm",
          className
        )}
        whileHover="hover"
        initial="initial"
        variants={{
          initial: { y: 0 },
          hover: { y: -10 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        {...props}
      >
        {/* Background Gradient */}
        <div
          className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 30%, var(--feature-color-light) 0%, transparent 70%)`,
          }}
        />

        {/* Index Number */}
        <div className="absolute top-6 left-6 z-10 font-mono text-lg font-bold text-muted-foreground">
          {index}
        </div>

        {/* Main Icon */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center [&_svg]:h-20 [&_svg]:w-20"
          style={{ color: "var(--feature-color)" }}
          variants={{
            initial: { scale: 1, y: 0 },
            hover: { scale: 1.3, y: -20 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          aria-hidden="true"
        >
          {icon}
        </motion.div>

        {/* Content */}
        <div className="relative z-20 rounded-lg border bg-background/80 p-4 backdrop-blur-sm dark:bg-background/60">
          <span
            className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: "var(--feature-color-dark)",
              color: "var(--feature-color)",
            }}
          >
            {tag}
          </span>
          <p className="text-base text-card-foreground">{title}</p>
        </div>
      </motion.div>
    );
  }
);
AnimatedFeatureCard.displayName = "AnimatedFeatureCard";

export { AnimatedFeatureCard };
