"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "agape-site-banner-dismissed";

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
          <Sparkles className="size-4 shrink-0 opacity-70" aria-hidden="true" />
          Vahi is live — GST billing built for small businesses.
        </p>
        <Button asChild size="sm" className="rounded-full">
          <a href="/billing">Learn more</a>
        </Button>
      </div>
    </Banner>
  );
}
