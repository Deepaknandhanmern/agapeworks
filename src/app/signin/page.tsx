import type { Metadata } from "next";
import { SignInForm } from "./signin-form";

export const metadata: Metadata = {
  title: "Sign In — Agape Works",
};

export default function SignInPageRoute() {
  return <SignInForm />;
}
