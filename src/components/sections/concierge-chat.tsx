"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;

const EXCLUDED_PREFIXES = ["/dashboard", "/vahi", "/status", "/invoice", "/sellara", "/signin", "/signup"];

function WelcomeBubble() {
  return (
    <div className="max-w-[85%] self-start rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm text-foreground">
      Hi! I&apos;m the Agape Works concierge — ask me about services, pricing, or how projects work.
    </div>
  );
}

export function ConciergeChat() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [unavailable, setUnavailable] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  if (EXCLUDED_PREFIXES.some((p) => pathname?.startsWith(p))) return null;

  const atLimit = messages.length >= MAX_MESSAGES;

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || pending || atLimit) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setPending(true);

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) {
        setUnavailable(true);
        setPending(false);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setUnavailable(true);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex h-[480px] w-[340px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b bg-background px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-foreground" />
                <p className="text-sm font-semibold text-foreground">Agape Works concierge</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4">
              <WelcomeBubble />
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground"
                      : "max-w-[85%] self-start rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm text-foreground"
                  }
                >
                  {m.content || (pending && i === messages.length - 1 ? "…" : "")}
                </div>
              ))}
              {unavailable && (
                <div className="max-w-[90%] self-start rounded-2xl rounded-tl-sm bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
                  Chat isn&apos;t available right now — try the{" "}
                  <a href="/contact" className="underline">
                    contact form
                  </a>{" "}
                  instead.
                </div>
              )}
              {atLimit && !unavailable && (
                <div className="max-w-[90%] self-start rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
                  Let&apos;s continue over email —{" "}
                  <a href="/contact" className="underline">
                    contact us here
                  </a>
                  .
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="flex items-center gap-2 border-t p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                disabled={pending || atLimit || unavailable}
                className="h-10 flex-1 rounded-full border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={pending || atLimit || unavailable || !input.trim()}
                aria-label="Send"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex size-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </motion.button>
    </div>
  );
}
