"use client";

import { useActionState, useState } from "react";
import { Check, Copy } from "lucide-react";
import { createBillingAccountAction } from "@/lib/actions/billing-account-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline"
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function BillingAccountForm() {
  const [state, formAction, pending] = useActionState(createBillingAccountAction, undefined);

  if (state && "password" in state && state.password) {
    return (
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-5">
        <p className="text-sm font-medium text-foreground">Account created — share these with the business:</p>
        <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2 text-sm">
          <span>
            Login: <a href="/vahi/login" className="underline">vahi login page</a>
          </span>
        </div>
        <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2 font-mono text-sm">
          <span>{state.email}</span>
          <CopyButton text={state.email} />
        </div>
        <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2 font-mono text-sm">
          <span>{state.password}</span>
          <CopyButton text={state.password} />
        </div>
        <p className="text-xs text-muted-foreground">
          This password is shown once and isn&apos;t stored anywhere retrievable — save it now.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 rounded-xl border bg-card p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="businessName">Business name</Label>
          <Input id="businessName" name="businessName" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Login email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="gstNumber">GST number (optional)</Label>
          <Input id="gstNumber" name="gstNumber" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" />
        </div>
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? "Creating..." : "Create account"}
      </Button>
    </form>
  );
}
