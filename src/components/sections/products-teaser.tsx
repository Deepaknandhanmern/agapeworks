import Link from "next/link";
import { ArrowUpRight, Receipt, Store, Sparkles } from "lucide-react";

const products = [
  {
    name: "Vahi",
    status: "Now available",
    statusTone: "bg-[#0ca30c]/10 text-[#006300]",
    description: "GST-compliant invoicing and payment tracking for small businesses.",
    href: "/billing",
    icon: Receipt,
  },
  {
    name: "Digital Presence Plan",
    status: "Launching soon",
    statusTone: "bg-accent text-foreground",
    description: "A complete website, hosting, and care — one flat payment, no monthly bills.",
    href: "/products",
    icon: Store,
  },
  {
    name: "Sellara",
    status: "Coming soon",
    statusTone: "bg-accent text-foreground",
    description: "An AI-first e-commerce platform for merchants, built with an AI shopping assistant.",
    href: "/sellara",
    icon: Sparkles,
  },
];

export function ProductsTeaser() {
  return (
    <section className="border-t bg-muted/20">
      <div className="mx-auto w-full max-w-5xl px-4 py-24">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Beyond client work, we build our own products
          </h2>
          <p className="max-w-lg text-muted-foreground">
            The same team, applying what we know to problems we&apos;ve chosen ourselves.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {products.map(({ name, status, statusTone, description, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className="group flex flex-col gap-4 rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent">
                  <Icon className="size-4 text-foreground" />
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusTone}`}>{status}</span>
              </div>
              <div>
                <h3 className="flex items-center gap-1 font-semibold text-foreground">
                  {name}
                  <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
