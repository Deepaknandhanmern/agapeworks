"use client";

import { useActionState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { requestLoginLinkAction } from "@/lib/client-portal/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInForm() {
  const [state, formAction, pending] = useActionState(requestLoginLinkAction, undefined);

  if (state?.success) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle2 className="size-10 text-[#006300]" />
        <p className="text-sm text-muted-foreground">{state.success}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@company.com" autoFocus required />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending} className="mt-2">
        {pending ? "Sending..." : "Email me a sign-in link"}
      </Button>
      <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
        <Mail className="mt-0.5 size-3.5 shrink-0" />
        If that email has a project with Agape Works, you&apos;ll get a link to sign in - no
        password needed.
      </p>
    </form>
  );
}
