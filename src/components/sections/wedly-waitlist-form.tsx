"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AnimatedCheckmark } from "@/components/ui/animated-checkmark";
import { joinWedlyWaitlistAction } from "@/lib/actions/wedly-waitlist-actions";
import { fireConfetti } from "@/lib/confetti";

const WEDLY_COLORS = ["#8B2942", "#E8998D", "#3A2A32", "#F5ECE9"];

export function WedlyWaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWedlyWaitlistAction, undefined);
  const [submitted, setSubmitted] = useState(false);

  // Fires once, right when a pending submission resolves with no error -
  // useActionState's state is `undefined` both before the first submit and
  // after a successful one, so success is "pending just went false and
  // there's no error", not any particular state value.
  const [wasPending, setWasPending] = useState(false);
  useEffect(() => {
    if (wasPending && !pending && !state?.error) {
      setSubmitted(true);
      fireConfetti(40, WEDLY_COLORS);
    }
    setWasPending(pending);
  }, [pending, state, wasPending]);

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#3A2A32]/10 bg-white/60 p-6 text-center">
        <AnimatedCheckmark className="size-9 text-[#8B2942]" />
        <p className="font-medium text-[#3A2A32]">You&apos;re on the list</p>
        <p className="text-sm text-[#3A2A32]/60">We&apos;ll email you when early access opens.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex w-full max-w-md flex-col gap-2">
      {/* Honeypot - hidden from real visitors via CSS, not `type="hidden"`
          (bots that fill every visible-looking field still catch this one). */}
      <div className="h-0 w-0 overflow-hidden" aria-hidden="true">
        <Label htmlFor="wedly-website">Website</Label>
        <Input id="wedly-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
        <div className="flex-1">
          <Label htmlFor="wedly-email" className="sr-only">
            Email address
          </Label>
          <Input
            id="wedly-email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className="h-12 border-[#3A2A32]/15 bg-white text-[#3A2A32] placeholder:text-[#3A2A32]/40"
          />
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="h-12 shrink-0 bg-[#8B2942] px-6 text-white hover:bg-[#8B2942]/90"
        >
          {pending ? "Joining..." : "Join the waitlist"}
        </Button>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
