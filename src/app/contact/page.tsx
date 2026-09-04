import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { ContactForm } from "@/components/sections/contact-form";
import { Clock, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { CopyableText } from "@/components/ui/copyable-text";

const CONTACT_TITLE = "Contact - Agape Works";
const CONTACT_DESCRIPTION = "Tell us about your project - Agape Works replies within one business day.";

export const metadata: Metadata = {
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: CONTACT_TITLE, description: CONTACT_DESCRIPTION, url: "/contact" },
  twitter: { title: CONTACT_TITLE, description: CONTACT_DESCRIPTION },
};

const contactPoints = [
  {
    icon: Mail,
    label: "Email",
    value: "studio@agapeworks.in",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 1 business day",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Coimbatore & Chennai, India",
  },
];

// Placeholder hrefs - swap in the real profile URLs.
const socialLinks = [
  { icon: FaLinkedin, label: "LinkedIn", href: "#" },
  { icon: FaFacebook, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-12 pt-8 text-center sm:pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Get in touch
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Let&apos;s talk about your project.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            Whether you know exactly what you need or just have an idea - tell us about it and
            we&apos;ll get back to you with next steps.
          </p>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              {contactPoints.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                    <Icon className="size-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-sm text-muted-foreground">
                      {Icon === Mail ? <CopyableText text={value} /> : value}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-lg bg-accent text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}
