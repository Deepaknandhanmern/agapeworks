"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat";

export function AIChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI chat" : "Ask AI"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition-transform hover:scale-105 dark:bg-white dark:text-neutral-900"
      >
        {open ? <X className="size-5" /> : <Sparkles className="size-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lab-bg fixed bottom-24 right-6 z-[60] flex h-[600px] max-h-[70vh] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="h-full overflow-y-auto">
              <AnimatedAIChat />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
