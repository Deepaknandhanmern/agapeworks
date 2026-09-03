"use client";

import { useEffect } from "react";

const AWAY_TITLE = "Still here, still building.";

// Swaps the browser tab title while the visitor is looking elsewhere -
// captures whatever title is live at the moment they leave (so it's
// correct regardless of which page or client-side navigation they're on)
// and restores exactly that on return, rather than a hardcoded fallback.
export function TabTitleAway() {
  useEffect(() => {
    let storedTitle: string | null = null;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        storedTitle = document.title;
        document.title = AWAY_TITLE;
      } else if (storedTitle !== null) {
        document.title = storedTitle;
        storedTitle = null;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return null;
}
