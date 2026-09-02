import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in - Dashboard",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border bg-card p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="mb-6 text-sm text-muted-foreground">Sign in to manage the site.</p>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
