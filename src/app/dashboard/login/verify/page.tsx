import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { hasPendingTotpSession } from "@/lib/auth";
import { VerifyForm } from "./verify-form";

export const metadata: Metadata = {
  title: "Verify - Dashboard",
  robots: { index: false, follow: false },
};

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  // Landed here without completing the password step (or it expired) - // send back to the start rather than show a form that can't succeed.
  if (!(await hasPendingTotpSession())) {
    redirect("/dashboard/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border bg-card p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold text-foreground">Two-factor code</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Enter the 6-digit code from your authenticator app.
        </p>
        <VerifyForm next={next} />
      </div>
    </div>
  );
}
