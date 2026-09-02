import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/header-3";

export const metadata: Metadata = {
  title: "Privacy Policy - Agape Works",
  description: "How Agape Works collects, uses, and protects your information.",
};

const EFFECTIVE_DATE = "August 31, 2026";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-2xl px-4 pb-24 pt-8 sm:pt-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Privacy Policy
          </div>
          <h1 className="mb-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mb-10 text-sm text-muted-foreground">Effective {EFFECTIVE_DATE}</p>

          <div className="flex flex-col gap-8 text-sm leading-7 text-muted-foreground">
            <p>
              This policy explains what information Agape Works (&quot;we,&quot; &quot;us&quot;)
              collects through agapeworks.in and related products, and how we use it. It&apos;s
              written in plain language rather than dense legal text, but it isn&apos;t a
              substitute for legal advice - if you need this reviewed for a specific
              jurisdiction or regulatory regime, have a lawyer look at it.
            </p>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">
                Information we collect
              </h2>
              <p className="mb-3">We collect information in a few distinct ways:</p>
              <ul className="flex flex-col gap-2 pl-5 list-disc">
                <li>
                  <strong className="text-foreground">Forms you submit</strong> - the contact
                  form, scope-estimate tool, and project enquiries collect your name, email,
                  company (optional), and project details (service, budget, timeline, and your
                  message). We use this only to respond to your enquiry.
                </li>
                <li>
                  <strong className="text-foreground">Client project data</strong> - if you
                  engage us for a project, we store your name, email, and the project&apos;s
                  status, updates, files, and any feedback you leave, so we can deliver and
                  communicate about that work.
                </li>
                <li>
                  <strong className="text-foreground">Client portal sign-in</strong> - signing in
                  at /signin only requires your email address (no password). We send a one-time
                  sign-in link to that email and set a session cookie once you use it.
                </li>
                <li>
                  <strong className="text-foreground">AI concierge chat</strong> - messages you
                  send to the on-site AI assistant are processed by our AI provider (Anthropic)
                  to generate a response. We don&apos;t use chat content for advertising.
                </li>
                <li>
                  <strong className="text-foreground">Analytics</strong> - we use Google
                  Analytics to understand how the site is used (pages visited, general location,
                  device type, and a few specific actions like completing a scope estimate).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">
                Cookies
              </h2>
              <p>
                We use a small number of cookies: one to keep you signed in (client portal or,
                separately, our Vahi billing product), and cookies set by Google Analytics to
                distinguish visitors. We don&apos;t use cookies for third-party advertising.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">
                Third-party services
              </h2>
              <p className="mb-3">
                We rely on a small set of service providers to run the site and our business.
                Information may pass through:
              </p>
              <ul className="flex flex-col gap-2 pl-5 list-disc">
                <li>
                  <strong className="text-foreground">Resend</strong> - sends transactional
                  emails (form confirmations, project updates, sign-in links).
                </li>
                <li>
                  <strong className="text-foreground">Google Analytics</strong> - site usage
                  analytics.
                </li>
                <li>
                  <strong className="text-foreground">Anthropic</strong> - processes messages
                  sent to the AI concierge chat and scope-estimate tool.
                </li>
                <li>
                  <strong className="text-foreground">Supabase</strong> - stores files you or we
                  upload as part of a client project (invoices, spec sheets, deliverables),
                  behind access-controlled, signed download links.
                </li>
                <li>
                  <strong className="text-foreground">Hostinger</strong> - hosts the application
                  and its database.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">
                How long we keep information
              </h2>
              <p>
                Enquiry and contact-form submissions are kept as long as needed to respond and
                for our own records. Client project data is kept for the duration of the
                engagement and a reasonable period after, for reference and support. You can ask
                us to delete your information at any time - see &quot;Contact us&quot; below.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">Your rights</h2>
              <p>
                You can ask us what information we hold about you, ask us to correct it, or ask
                us to delete it, subject to any legal or contractual reason we may need to keep
                it (for example, an active client engagement). Reach out using the contact
                details below and we&apos;ll respond within a reasonable time.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">
                Children&apos;s privacy
              </h2>
              <p>
                This site is intended for businesses and professionals. We don&apos;t knowingly
                collect information from children.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">
                Changes to this policy
              </h2>
              <p>
                We may update this policy as the site and our practices change. We&apos;ll update
                the effective date above when we do.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">Contact us</h2>
              <p>
                Questions about this policy, or want to exercise any of the rights above? Email{" "}
                <a href="mailto:studio@agapeworks.in" className="font-medium text-foreground underline underline-offset-4">
                  studio@agapeworks.in
                </a>
                , or use our{" "}
                <Link href="/contact" className="font-medium text-foreground underline underline-offset-4">
                  contact form
                </Link>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
