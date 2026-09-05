import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { TestimonialSubmitForm } from "./testimonial-submit-form";

const TITLE = "Share Your Experience - Agape Works";
const DESCRIPTION = "Tell us about your experience working with Agape Works.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
};

export default function SubmitTestimonialPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-lg flex-col gap-8 px-4 py-16">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Share your experience
            </h1>
            <p className="text-muted-foreground">
              We'd love to hear how working with us went - it helps other founders trust us with
              their own projects.
            </p>
          </div>
          <TestimonialSubmitForm />
        </section>
      </main>
    </div>
  );
}
