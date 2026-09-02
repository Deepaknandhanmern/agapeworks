import type { Metadata } from "next";
import { Geist_Mono, Inter, Montserrat } from "next/font/google";
import { Footerdemo } from "@/components/ui/footer-section";
import { GoogleAnalytics } from "@/components/sections/google-analytics";
import { ClientWidgets } from "@/components/sections/client-widgets";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Secondary/body text (globals.css --font-sans).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Primary/heading font (globals.css --font-heading).
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const SITE_URL = "https://agapeworks.in";
const SITE_DESCRIPTION = "Agape Works - consulting and product engineering that ships.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Not a title template - every page already writes its own full
  // "X - Agape Works" title (see e.g. src/app/services/page.tsx), so a
  // "%s - Agape Works" template here would double up the suffix on all of
  // them. This is just the fallback for the rare page with no title of its own.
  title: "Agape Works",
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Agape Works",
    title: "Agape Works",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Agape Works",
    description: SITE_DESCRIPTION,
  },
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
};

// Sitewide, not per-page - sameAs is deliberately omitted rather than
// pointing at the footer's placeholder "#" social links (see
// src/components/ui/footer-section.tsx); fill it in once those are real.
// address is region/country-level only (no street address on file) - real,
// not fabricated, since a fake precise address would be worse than none.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "Agape Works",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-black.png`,
  description: SITE_DESCRIPTION,
  email: "studio@agapeworks.in",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: "Coimbatore" },
    { "@type": "City", name: "Chennai" },
  ],
};

// Lets search engines and AI answer engines resolve "Agape Works" as a
// distinct named entity tied to this URL, separate from the Organization
// (which describes the business itself, not the website as an artifact).
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Agape Works",
  url: SITE_URL,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* eslint-disable-next-line react/no-danger -- static JSON we authored above, not user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* eslint-disable-next-line react/no-danger -- static JSON we authored above, not user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <GoogleAnalytics />
        {children}
        <Footerdemo />
        <ClientWidgets />
      </body>
    </html>
  );
}
