"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const STORAGE_KEY = "agape-vivira-teaser-dismissed";
const EASE = [0.16, 1, 0.3, 1] as const;
const VIVIRA_URL = "https://vivira.agapeworks.in";

// Bottom-left counterpart to AnnouncementToast (which owns bottom-right) - // Vivira is the one product currently being promoted site-wide, hosted on
// its own subdomain, so this links out there rather than to a page here.
export function ViviraTeaser() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/status") ||
    pathname?.startsWith("/client")
  ) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable - dismissal just won't be remembered.
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative flex items-center gap-2 rounded-full border bg-background/95 py-2 pl-4 pr-3 shadow-lg backdrop-blur-sm"
          >
            <a
              href={VIVIRA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:underline"
            >
              🛒 Vivira - our AI cart plugin for WooCommerce. Take a look
            </a>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss"
              className="flex size-5 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="size-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
