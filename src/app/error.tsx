"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Kept intentionally minimal (no Header, no DotPattern) — an error boundary
// should depend on as little as possible, since it exists precisely for the
// case where something else on the page already broke.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <Link href="/">
        <Image src="/logo-black.png" alt="Agape Works" width={181} height={32} className="h-7 w-auto" />
      </Link>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Something went wrong.
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          That&apos;s on us, not you. Try again, or head back home.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => reset()}>
          Try again
        </Button>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
