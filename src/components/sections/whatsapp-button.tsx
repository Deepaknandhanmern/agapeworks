"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { trackEvent } from "@/lib/analytics";

const EXCLUDED_PREFIXES = ["/dashboard", "/vahi", "/status", "/invoice", "/sellara", "/signin", "/signup"];

const WHATSAPP_NUMBER = "917373944336";
const DEFAULT_MESSAGE = "Hi! I'd like to know more about Agape Works.";

export function WhatsAppButton() {
  const pathname = usePathname();

  if (EXCLUDED_PREFIXES.some((p) => pathname?.startsWith(p))) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_chat_opened")}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-24 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
    >
      <FaWhatsapp className="size-7" />
    </motion.a>
  );
}
