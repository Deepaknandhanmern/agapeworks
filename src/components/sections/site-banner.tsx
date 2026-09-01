"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";

// New key (was agape-site-banner-dismissed) — a new banner message deserves
// a fresh dismiss state, so visitors who already dismissed the old Vahi
// message still see this one.
const STORAGE_KEY = "agape-site-banner-dismissed-wedly";

/**
 * Full-width bar shown above the shared Header on every page except home
 * (the home page's hero has its own distinct visual opening — a second
 * banner stacked on top of it would compete with it). Dismissal is
 * remembered per visitor, same pattern as AnnouncementToast.
 */
export function SiteBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  const handleClose = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable — dismissal just won't be remembered.
    }
  };

  return (
    <Banner variant="muted" layout="center" isClosable onClose={handleClose} className="text-foreground md:py-2">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <p className="flex items-center gap-2 text-sm">
          <Heart className="size-4 shrink-0 opacity-70" aria-hidden="true" />
          Wedly — wedding memories, live — coming soon.
        </p>
        <Button asChild size="sm" className="rounded-full">
          <a href="/wedly">Learn more</a>
        </Button>
      </div>
    </Banner>
  );
}
