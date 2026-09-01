"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { HeroPill } from "@/components/ui/hero-pill";

const STORAGE_KEY = "agape-announcement-dismissed";
const EASE = [0.16, 1, 0.3, 1] as const;

// Bottom-right corner announcement, shown once per visitor (remembered via
// localStorage) with an entrance animation on load. Hidden on the admin
// dashboard and client status pages — this is a marketing element, not
// part of that UI.
export function AnnouncementToast() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/status") || pathname?.startsWith("/wedly")) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable (private browsing, etc.) — dismissal just
      // won't be remembered for next visit, no functional impact otherwise.
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative"
          >
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss announcement"
              className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="size-3" />
            </button>
            <HeroPill
              href="/services"
              announcement="📣 New"
              label="AI-powered development, now available"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
