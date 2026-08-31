"use client";

import React from "react";
import { motion } from "framer-motion";
import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";

// Adapted from the classic Aceternity "navbar-menu" hover-dropdown pattern.
// The original hardcodes Tailwind's `dark:` variant for its dark styling —
// this site doesn't use that (dark mode was removed sitewide), so every
// component here takes an explicit `dark` boolean instead, matching the
// convention already used throughout header-3.tsx.

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  dark = false,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  dark?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className={cn(
          "cursor-pointer text-sm font-medium",
          dark ? "text-white/80 hover:text-white" : "text-foreground hover:opacity-80",
        )}
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={transition}>
          {active === item && (
            // top-full (not top: 100% + gap) so there's no dead pixel-space
            // between the trigger and this wrapper — the pt-4 below still
            // gives the same visual breathing room, but it's now padding
            // *inside* a continuously-hoverable element instead of an empty
            // gap the cursor has to cross, which was closing the dropdown
            // before a pointer could ever reach it.
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active-menu"
                className={cn(
                  "overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm",
                  dark ? "border-white/10 bg-neutral-900" : "border-black/10 bg-white",
                )}
              >
                <motion.div layout className="h-full w-max p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  className,
  children,
}: {
  setActive: (item: string | null) => void;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <nav onMouseLeave={() => setActive(null)} className={cn("relative flex items-center justify-center gap-6", className)}>
      {children}
    </nav>
  );
};

export const HoveredLink = ({
  dark = false,
  className,
  children,
  ...rest
}: LinkProps & { dark?: boolean; className?: string; children: React.ReactNode }) => {
  return (
    <Link
      {...rest}
      className={cn("text-sm transition-colors", dark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground", className)}
    >
      {children}
    </Link>
  );
};
