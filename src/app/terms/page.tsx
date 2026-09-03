import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/header-3";

const TERMS_TITLE = "Terms of Service - Agape Works";
const TERMS_DESCRIPTION = "The terms governing your use of agapeworks.in and its products.";

export const metadata: Metadata = {
  title: TERMS_TITLE,
  description: TERMS_DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: { title: TERMS_TITLE, description: TERMS_DESCRIPTION, url: "/terms" },
  twitter: { title: TERMS_TITLE, description: TERMS_DESCRIPTION },
};

const EFFECTIVE_DATE = "August 31, 2026";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-2xl px-4 pb-24 pt-8 sm:pt-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Terms of Service
          </div>
          <h1 className="mb-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mb-10 text-sm text-muted-foreground">Effective {EFFECTIVE_DATE}</p>

          <div className="flex flex-col gap-8 text-sm leading-7 text-muted-foreground">
            <p>
              These terms cover your use of agapeworks.in - the marketing site, the client
              portal, status pages, and the AI concierge chat. They&apos;re written in plain
              language rather than dense legal text, but they aren&apos;t a substitute for legal
              advice - if you need this reviewed for a specific jurisdiction, have a lawyer look
              at it. Separate written agreements govern individual client engagements and take
              precedence over this page for the scope, price, and delivery of that work.
            </p>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">Using this site</h2>
              <p>
                You may browse the site, submit enquiries, and use the tools on it (scope
                estimate, AI concierge chat) for your own legitimate purposes. Don&apos;t use it
                to submit false information, attempt to access another client&apos;s project
                data, disrupt the site, or use automated tools to scrape or abuse it.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">
                Client portal &amp; project status pages
              </h2>
              <p>
                Client portal access (/signin, /client) is provided to clients with an active or
                past engagement, using the email on file for that engagement. You&apos;re
                responsible for keeping access to that email address secure - anyone who can
                receive a sign-in link at it can access the associated project data. Individual
                project status pages (/status/&lt;link&gt;) are accessible to anyone who has the
                link; don&apos;t share it if you don&apos;t want others viewing that project.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">AI concierge chat</h2>
              <p>
                The on-site AI assistant and scope-estimate tool provide informational responses
                to help you evaluate a potential project. They&apos;re not a substitute for a
                real scoping conversation, don&apos;t constitute a quote or contractual
                commitment, and may occasionally be inaccurate - treat output as a starting
                point, not a guarantee.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">
                Intellectual property
              </h2>
              <p>
                The site&apos;s content, design, and branding belong to Agape Works unless
                otherwise noted. Work delivered under a signed client engagement is governed by
                that engagement&apos;s own ownership terms (we build on a 100% code-ownership
                basis by default - see the engagement agreement for specifics).
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">Third-party links</h2>
              <p>
                This site links to live client projects and third-party services. We&apos;re not
                responsible for the content, availability, or practices of sites we don&apos;t
                operate.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">
                Disclaimers &amp; limitation of liability
              </h2>
              <p>
                The site and its tools are provided &quot;as is,&quot; without warranties of any
                kind. To the extent permitted by law, Agape Works isn&apos;t liable for indirect,
                incidental, or consequential damages arising from your use of the site. Nothing
                here limits liability that can&apos;t be limited under applicable law.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">Governing law</h2>
              <p>
                These terms are governed by the laws of India, without regard to conflict-of-law
                principles, without prejudice to any mandatory consumer-protection rights you may
                have where you live.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">Changes to these terms</h2>
              <p>
                We may update these terms as the site changes. We&apos;ll update the effective
                date above when we do.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-semibold text-foreground">Contact us</h2>
              <p>
                Questions about these terms? Email{" "}
                <a href="mailto:studio@agapeworks.in" className="font-medium text-foreground underline underline-offset-4">
                  studio@agapeworks.in
                </a>
                , or use our{" "}
                <Link href="/contact" className="font-medium text-foreground underline underline-offset-4">
                  contact form
                </Link>
                . See also our{" "}
                <Link href="/privacy" className="font-medium text-foreground underline underline-offset-4">
                  Privacy Policy
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
