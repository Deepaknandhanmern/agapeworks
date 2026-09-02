"use client";

import { SignInPage } from "@/components/ui/sign-in";

// UI only - see the comment in src/app/signin/signin-form.tsx. Reuses the
// same visual component with sign-up copy; a real "create account" flow
// will likely need more fields (name, etc.) once the account backend is
// designed, so treat this shape as a starting point, not final.
export function SignUpForm() {
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <SignInPage
      title={<span className="font-light tracking-tighter text-foreground">Create your account</span>}
      description="Join Agape Works to get started."
      heroImageSrc="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
      onSignIn={handleSignUp}
      onCreateAccount={() => {
        window.location.href = "/signin";
      }}
      footerPrompt="Already have an account?"
      footerLinkLabel="Sign in"
      submitLabel="Create Account"
    />
  );
}
