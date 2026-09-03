import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Header } from "@/components/ui/header-3";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { AIVoiceInput } from "@/components/ui/ai-voice-input";
import { serviceDetails, getServiceDetailBySlug } from "@/lib/service-detail-data";

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);
  if (!service) return {};

  const title = `${service.title} - Agape Works`;

  return {
    title,
    description: service.description,
    openGraph: { title, description: service.description, url: `/services/${slug}` },
    twitter: { title, description: service.description },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);
  if (!service) notFound();

  const Icon = service.icon;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: "Agape Works" },
    areaServed: [
      { "@type": "City", name: "Coimbatore" },
      { "@type": "City", name: "Chennai" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.included.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* eslint-disable-next-line react/no-danger -- static JSON built from this service's own data above, not raw user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 pb-16 pt-8 text-center sm:pt-10">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-accent">
            <Icon className="size-7 text-foreground" />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            {service.eyebrow}
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {service.tagline}
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            {service.description}
          </p>
        </section>

        {service.slug === "ai-solutions" && (
          <section className="border-t bg-muted/20">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 px-4 py-24 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Built-in AI, not bolted on
              </h2>
              <p className="max-w-lg text-muted-foreground">
                A taste of the kind of voice and conversational interfaces we build into
                products - click the mic to try it.
              </p>
              <div className="mt-4 w-full max-w-md rounded-2xl border bg-card p-4 shadow-sm">
                <AIVoiceInput demoMode />
              </div>
            </div>
          </section>
        )}

        <section className="border-t bg-muted/20">
          <div className="mx-auto w-full max-w-3xl px-4 py-20">
            <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-foreground">
              What&apos;s included
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-xl border bg-card p-4 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative overflow-hidden border-t">
          <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground">
              Ready to talk through your {service.title.toLowerCase()} project?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Tell us what you&apos;re building - we&apos;ll tell you what it takes to ship it.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <AntiMetalButton href="/contact" label="Book a demo" />
              <Link
                href="/scope"
                className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
              >
                Get an instant estimate instead
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
