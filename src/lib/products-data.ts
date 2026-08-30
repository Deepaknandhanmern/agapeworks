export type ProductPlan = {
  term: string;
  price: string;
  perYear: string;
  savings?: string;
  tagline: string;
  featured?: boolean;
  perks: string[];
};

// One flat payment per term — no monthly billing, easy to close in a single
// conversation. Placeholder pricing (INR) — edit freely, this is the only
// file that needs to change to update numbers shown on /products.
export const digitalPresencePlans: ProductPlan[] = [
  {
    term: "1 Year",
    price: "₹19,999",
    perYear: "₹19,999 / year",
    tagline: "Get your business online",
    perks: [],
  },
  {
    term: "2 Years",
    price: "₹34,999",
    perYear: "₹17,500 / year",
    savings: "Save 12%",
    tagline: "Most picked by returning clients",
    featured: true,
    perks: ["Priority WhatsApp support"],
  },
  {
    term: "3 Years",
    price: "₹47,999",
    perYear: "₹16,000 / year",
    savings: "Save 20%",
    tagline: "Lock in your price the longest",
    perks: ["Priority WhatsApp support", "One free design refresh in year 2"],
  },
];

export const digitalPresenceIncludes: string[] = [
  "Custom-built, mobile-responsive website (up to 5 pages)",
  "Domain + hosting included for the entire term",
  "Google Maps, WhatsApp & Instagram links integrated",
  "Contact form — enquiries land straight in your inbox",
  "Basic on-page SEO setup so you show up in search",
  "Security updates & uptime monitoring for the whole term",
  "Small text/image edits anytime — just message us",
  "One flat payment upfront — no monthly bills, no surprises",
];

export type BillingPlan = {
  name: string;
  price: string;
  tagline: string;
  featured?: boolean;
  perks: string[];
};

// "Vahi" is a placeholder name (Hindi/Marathi/Gujarati for a ledger book) —
// rename freely, this file is the only place it needs to change besides the
// page copy in src/app/billing/page.tsx. Priced annually, not one-time like
// the Digital Presence Plan — GST rates and e-invoicing rules change, so
// unlike a website, this product has a real ongoing reason to charge for
// updates rather than sell it once and walk away.
export const vahiPlans: BillingPlan[] = [
  {
    name: "Basic",
    price: "₹1,999 / year",
    tagline: "For one business, getting off paper bills",
    perks: [
      "GST-compliant invoices, auto tax calculation",
      "Up to 50 invoices / month",
      "Payment tracking — paid, unpaid, overdue",
      "Share invoices by WhatsApp or email",
      "Works on phone and desktop",
    ],
  },
  {
    name: "Pro",
    price: "₹3,999 / year",
    tagline: "For growing businesses with repeat customers",
    featured: true,
    perks: [
      "Everything in Basic",
      "Unlimited invoices",
      "Customer & item database — no retyping",
      "Multi-branch / multi-staff support",
      "Monthly sales reports",
      "Priority WhatsApp support",
    ],
  },
];
