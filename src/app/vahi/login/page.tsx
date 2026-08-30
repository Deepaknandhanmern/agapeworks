import type { Metadata } from "next";
import { VahiLoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in — Vahi",
  robots: { index: false, follow: false },
};

export default async function VahiLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return <VahiLoginForm next={next} />;
}
