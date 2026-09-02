"use client";

import { useState, useTransition } from "react";
import { SignInPage } from "@/components/ui/sign-in";
import { vahiLoginAction } from "@/lib/vahi/actions";

export function VahiLoginForm({ next }: { next?: string }) {
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);
    const formData = new FormData(event.currentTarget);
    if (next) formData.set("next", next);

    startTransition(async () => {
      const result = await vahiLoginAction(undefined, formData);
      if (result?.error) setError(result.error);
      // On success, vahiLoginAction redirects itself - nothing else to do here.
    });
  };

  return (
    <SignInPage
      title={<span className="font-light tracking-tighter text-foreground">Vahi</span>}
      description="Sign in to manage your invoices."
      heroImageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
      onSignIn={handleSignIn}
      onCreateAccount={() => {
        window.location.href = "/billing";
      }}
      submitting={pending}
      submitLabel="Sign In"
      errorSlot={error && <p className="-mt-2 text-sm text-destructive">{error}</p>}
    />
  );
}
