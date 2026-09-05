"use client";

import { useActionState, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitPublicTestimonialAction } from "@/lib/actions/public-testimonial-actions";
import { fireConfetti } from "@/lib/confetti";

export function TestimonialSubmitForm() {
  const [state, formAction, pending] = useActionState(submitPublicTestimonialAction, undefined);
  const [submitted, setSubmitted] = useState(false);

  // Fires once, right when a pending submission resolves with no error -
  // useActionState's state is `undefined` both before the first submit and
  // after a successful one, so success is "pending just went false and
  // there's no error", not any particular state value.
  const [wasPending, setWasPending] = useState(false);
  useEffect(() => {
    if (wasPending && !pending && !state?.error) {
      setSubmitted(true);
      fireConfetti();
    }
    setWasPending(pending);
  }, [pending, state, wasPending]);

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-8 text-center">
        <CheckCircle2 className="size-10 text-emerald-500" />
        <h2 className="text-lg font-semibold text-foreground">Thank you!</h2>
        <p className="text-sm text-muted-foreground">
          We've received your testimonial and will review it shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Honeypot - hidden from real visitors via CSS, not `type="hidden"`
          (bots that fill every visible-looking field still catch this one).
          Zero-size + clipped + not tab-focusable rather than pushed off
          -screen, so it can't affect page width/scroll either way. */}
      <div className="h-0 w-0 overflow-hidden" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="quote">Your experience working with us</Label>
        <textarea
          id="quote"
          name="quote"
          required
          rows={5}
          placeholder="What did we help you with, and how did it go?"
          className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="authorName">Your name</Label>
        <Input id="authorName" name="authorName" required placeholder="Jane Cooper" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="authorRole">Role (optional)</Label>
          <Input id="authorRole" name="authorRole" placeholder="Founder" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="authorCompany">Company (optional)</Label>
          <Input id="authorCompany" name="authorCompany" />
        </div>
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" disabled={pending} className="mt-1">
        {pending ? "Sending..." : "Submit testimonial"}
      </Button>
    </form>
  );
}
