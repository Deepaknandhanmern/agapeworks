import Link from "next/link";
import { RuixenGradientFooter } from "@/components/ui/ruixen-gradient-footer";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Download for WordPress", href: "/products#pricing" },
      { label: "Pricing", href: "/products#pricing" },
      { label: "ROI calculator", href: "/products#roi" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Agape Works", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function ViviraGradientFooter() {
  return (
    <RuixenGradientFooter gradientHeight="40vh" className="vivira-theme border-t border-black/10">
      <div className="mx-auto w-full max-w-5xl px-6 pt-12">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-foreground">
              {/* eslint-disable-next-line @next/next/no-img-element -- small static logo, not worth next/image */}
              <img src="/vivira-logo.svg" alt="" className="size-6" />
              <span className="font-semibold">Vivira</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              An AI cart plugin for WooCommerce, built by Agape Works - recovers abandoned carts
              automatically, so stores keep the sales they&apos;d otherwise lose.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-10 text-xs uppercase tracking-wider sm:grid-cols-3 lg:col-span-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-foreground">{col.title}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-black/10 pt-6 pb-2 text-xs uppercase tracking-wider text-muted-foreground sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Agape Works</span>
          <span>Coimbatore &amp; Chennai, India</span>
        </div>
      </div>
    </RuixenGradientFooter>
  );
}
