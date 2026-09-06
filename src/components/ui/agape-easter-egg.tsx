"use client";

import * as React from "react";
import { fireConfetti } from "@/lib/confetti";

const SECRET = "agape";

/**
 * Types "agape" anywhere on the site (outside a form field) and the page
 * says hello back. Deliberately ignores keystrokes while an input, textarea
 * or contenteditable has focus, so it can never fire mid-way through
 * someone filling in the contact form or the newsletter box.
 */
export function AgapeEasterEgg() {
  const [shown, setShown] = React.useState(false);
  const buffer = React.useRef("");

  React.useEffect(() => {
    const isTyping = () => {
      const el = document.activeElement;
      if (!el) return false;
      const tag = el.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || (el as HTMLElement).isContentEditable;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTyping() || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-SECRET.length);
      if (buffer.current !== SECRET) return;

      buffer.current = "";
      setShown(true);
      fireConfetti(28);
      window.setTimeout(() => setShown(false), 3200);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!shown) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-[9998] -translate-x-1/2 animate-fade-slide-in-1 rounded-full border bg-background/95 px-5 py-2.5 text-sm font-medium shadow-lg backdrop-blur"
    >
      Built with agape - selfless, deliberate care. <span className="text-primary">♥</span>
    </div>
  );
}
