import type { Metadata } from "next";
import { SignUpForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up — Agape Works",
};

export default function SignUpPageRoute() {
  return <SignUpForm />;
}
