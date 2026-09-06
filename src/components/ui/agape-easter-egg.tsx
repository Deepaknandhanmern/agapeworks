"use client";

import * as React from "react";
import { fireConfetti } from "@/lib/confetti";

const WORD_SECRET = "agape";
const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

const WORD_MESSAGE = "Built with agape - selfless, deliberate care. ♥";
const KONAMI_MESSAGE = "30 lives granted. Use them to ship something good. ↑↑↓↓←→←→BA";

/**
 * Two hidden triggers, both listening on the same keydown handler:
 * typing "agape" anywhere, and the classic Konami sequence. Both ignore
 * keystrokes while an input, textarea or contenteditable has focus, so
 * neither can fire part-way through someone filling in a form.
 */
export function AgapeEasterEgg() {
  const [message, setMessage] = React.useState<string | null>(null);
  const wordBuffer = React.useRef("");
  const konamiBuffer = React.useRef<string[]>([]);

  React.useEffect(() => {
    const isTyping = () => {
      const el = document.activeElement;
      if (!el) return false;
      const tag = el.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || (el as HTMLElement).isContentEditable;
    };

    const trigger = (text: string) => {
      setMessage(text);
      fireConfetti(28);
      window.setTimeout(() => setMessage(null), 3600);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTyping() || e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();

      // Konami - arrow keys included, so this can't ride on the
      // single-character check the word trigger uses below.
      konamiBuffer.current = [...konamiBuffer.current, key].slice(-KONAMI.length);
      if (KONAMI.every((k, i) => konamiBuffer.current[i] === k)) {
        konamiBuffer.current = [];
        wordBuffer.current = "";
        trigger(KONAMI_MESSAGE);
        return;
      }

      if (key.length !== 1) return;
      wordBuffer.current = (wordBuffer.current + key).slice(-WORD_SECRET.length);
      if (wordBuffer.current === WORD_SECRET) {
        wordBuffer.current = "";
        trigger(WORD_MESSAGE);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-[9998] max-w-[90vw] -translate-x-1/2 animate-fade-slide-in-1 rounded-full border bg-background/95 px-5 py-2.5 text-center text-sm font-medium shadow-lg backdrop-blur"
    >
      {message}
    </div>
  );
}
