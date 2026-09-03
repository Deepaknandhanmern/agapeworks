import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SignInForm } from "./signin-form";

export const metadata: Metadata = {
  title: "Sign In - Agape Works",
  robots: { index: false, follow: false },
};

export default async function SignInPageRoute({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      <Link
        href="/"
        aria-label="Back to Agape Works home"
        className="absolute left-6 top-6 z-20 rounded-md p-1 hover:bg-accent"
      >
        <Image src="/logo-black.png" alt="Agape Works" width={181} height={32} className="h-7 w-auto" />
      </Link>

      <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            For clients with an active project - see status, updates, and files in one place.
          </p>
        </div>
        {error === "expired" && (
          <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            That link has expired or was already used. Request a new one below.
          </p>
        )}
        <SignInForm />
      </div>
    </div>
  );
}
