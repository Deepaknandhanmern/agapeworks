"use client";

import { useEffect, useState } from "react";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";

// New key each time the banner message changes — a new message deserves a
// fresh dismiss state, so visitors who already dismissed a past one still
// see this one.
const STORAGE_KEY = "agape-site-banner-dismissed-vivira";

/**
 * Full-width bar shown above the shared Header on every page — mounted by
 * Header itself, plus once more directly in src/app/page.tsx since the
 * homepage's hero has its own bespoke nav and doesn't render Header at all.
 * Dismissal is remembered per visitor, same pattern as AnnouncementToast.
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
          {/* eslint-disable-next-line @next/next/no-img-element -- small static logo, not worth next/image */}
          <img src="/vivira-logo.svg" alt="" className="size-4 shrink-0" />
          Vivira — our AI cart plugin for WooCommerce — live now.
        </p>
        <Button asChild size="sm" className="rounded-full">
          <a href="https://vivira.agapeworks.in" target="_blank" rel="noopener noreferrer">
            Learn more
          </a>
        </Button>
      </div>
    </Banner>
  );
}
