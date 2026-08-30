"use client";

import { SignInPage } from "@/components/ui/sign-in";

// UI only — no account system exists yet on the main site (this was built
// ahead of that decision, per the user's "first do the UI alone" request).
// Wire this up to real auth once what an account is actually for is decided.
export function SignInForm() {
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <SignInPage
      title={<span className="font-light tracking-tighter text-foreground">Welcome back</span>}
      description="Sign in to your Agape Works account."
      heroImageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
      onSignIn={handleSignIn}
      onCreateAccount={() => {
        window.location.href = "/signup";
      }}
      submitLabel="Sign In"
    />
  );
}
