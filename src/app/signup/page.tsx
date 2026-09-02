import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SignUpForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up - Agape Works",
};

export default function SignUpPageRoute() {
  return (
    <div className="relative min-h-screen">
      <Link
        href="/"
        aria-label="Back to Agape Works home"
        className="absolute left-6 top-6 z-20 rounded-md p-1 hover:bg-accent"
      >
        <Image src="/logo-black.png" alt="Agape Works" width={181} height={32} className="h-7 w-auto" />
      </Link>
      <SignUpForm />
    </div>
  );
}
