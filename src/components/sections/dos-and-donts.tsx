"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Switch from "@/components/ui/simple-toggle";

const dos = [
  "Senior engineers scope and build your project - the same people, start to finish.",
  "Ship visible, working demos every week.",
  "Agree on fixed scope before writing a line of code.",
  "Hand off documentation your own team can actually maintain.",
  "Give you direct access to the people doing the work.",
];

const donts = [
  "Bait-and-switch you to junior devs after the pitch.",
  "Go dark between updates and call it \"in progress.\"",
  "Let scope quietly creep without a real conversation.",
  "Leave knowledge trapped in one engineer's head.",
  "Route you through an account manager relaying messages.",
];

export function DosAndDonts() {
  const [showDonts, setShowDonts] = useState(false);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-24">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          What we do - and don&apos;t
        </h2>
        <p className="max-w-lg text-muted-foreground">
          Flip the switch to see the difference.
        </p>
      </div>

      <div className="mb-10 flex flex-col items-center gap-3">
        <Switch
          checked={showDonts}
          onCheckedChange={setShowDonts}
          aria-label="Toggle between what we do and what we don't"
        />
        <span className="text-sm font-medium text-muted-foreground">
          {showDonts ? "What we don't do" : "What we do"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={showDonts ? "donts" : "dos"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {(showDonts ? donts : dos).map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-lg border bg-card p-4">
              <div
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                  showDonts ? "bg-destructive/10 text-destructive" : "bg-accent text-foreground"
                }`}
              >
                {showDonts ? <X className="size-3" /> : <Check className="size-3" />}
              </div>
              <p className="text-sm leading-6 text-foreground">{item}</p>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
