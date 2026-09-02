// Content for the Sellara marketing page (src/app/sellara). "Sellara" is a
// placeholder product name - rename here and in sellara-landing.tsx's
// PRODUCT_NAME constant once the brand is finalized; nothing else needs to
// change. This is a marketing page only - no store-builder, AI assistant,
// or commerce backend exists yet (see the build-brief conversation).

export type ChatTurn = {
  role: "customer" | "ai";
  text: string;
  products?: { name: string; price: string }[];
};

export const chatDemoScript: ChatTurn[] = [
  { role: "customer", text: "I need a wedding saree under ₹8,000." },
  {
    role: "ai",
    text: "Here are three options based on your budget and occasion:",
    products: [
      { name: "Banarasi Silk - Maroon", price: "₹7,499" },
      { name: "Kanjivaram Weave - Gold", price: "₹6,999" },
      { name: "Soft Silk - Emerald", price: "₹5,899" },
    ],
  },
  { role: "customer", text: "Does the emerald one ship in 3 days?" },
  { role: "ai", text: "Yes - it's in stock and ships within 2–3 business days to your pincode." },
];

export type BuilderPreset = {
  prompt: string;
  label: string;
  heroFont: string;
  bg: string;
  fg: string;
  accent: string;
  heroText: string;
  cardStyle: "grid" | "editorial" | "minimal";
};

export const builderPresets: BuilderPreset[] = [
  {
    prompt: "Create a luxury black and gold fashion store.",
    label: "Luxury black & gold",
    heroFont: "font-serif",
    bg: "#0a0a0a",
    fg: "#f5e6c8",
    accent: "#c9a24b",
    heroText: "The Autumn Edit",
    cardStyle: "grid",
  },
  {
    prompt: "Make the hero section more minimal.",
    label: "Minimal hero",
    heroFont: "font-sans",
    bg: "#fafafa",
    fg: "#111111",
    accent: "#111111",
    heroText: "New Season",
    cardStyle: "minimal",
  },
  {
    prompt: "Change the layout to a premium editorial style.",
    label: "Editorial layout",
    heroFont: "font-serif",
    bg: "#f2ede4",
    fg: "#1a1a1a",
    accent: "#8a6f4d",
    heroText: "Issue No. 04",
    cardStyle: "editorial",
  },
  {
    prompt: "Make the product cards larger.",
    label: "Larger product cards",
    heroFont: "font-sans",
    bg: "#111111",
    fg: "#ffffff",
    accent: "#7dd3fc",
    heroText: "New Arrivals",
    cardStyle: "grid",
  },
];

export type FeatureGroup = { title: string; items: string[] };

export const featureGroups: FeatureGroup[] = [
  {
    title: "Commerce",
    items: [
      "Store builder",
      "Product & inventory management",
      "Orders & fulfillment",
      "Customer profiles",
      "Payments (Stripe/Razorpay-ready)",
      "Shipping integrations",
      "Coupons & reviews",
      "Custom domains",
    ],
  },
  {
    title: "AI",
    items: [
      "AI shopping assistant",
      "AI customer support",
      "AI product recommendations",
      "AI product descriptions",
      "AI SEO",
      "AI marketing campaigns",
      "WhatsApp integration",
      "Abandoned-cart recovery",
    ],
  },
];

export type SellaraPlan = {
  name: string;
  price: string;
  /** Monthly AI credit allowance - undefined for tiers with no AI features. */
  credits?: string;
  perks: string[];
  featured?: boolean;
};

// One-time payment - the platform itself is owned for life, no recurring
// platform fee. AI features stay metered (a monthly credit allowance per
// tier, topped up separately) because AI API calls are a real ongoing cost
// to us even though the license is one-time - see the founder-pushback
// discussion in the build-brief conversation for why "fully unlimited AI
// forever" on a one-time payment isn't sustainable.
export const sellaraPlans: SellaraPlan[] = [
  {
    name: "Starter",
    price: "₹24,999",
    perks: [
      "Own it for life - no monthly platform fee",
      "E-commerce store, up to 100 products",
      "Cart & checkout",
      "Payments",
      "Basic animations",
      "Orders & basic analytics",
      "Hosting included",
    ],
  },
  {
    name: "Growth",
    price: "₹49,999",
    credits: "500 AI credits / month included",
    perks: [
      "Own it for life - no monthly platform fee",
      "Unlimited products",
      "Custom domain",
      "Premium animations",
      "Coupons & reviews",
      "Shipping integration",
      "Abandoned-cart recovery",
      "Advanced analytics",
      "Basic AI customer support",
    ],
  },
  {
    name: "Pro",
    price: "₹89,999",
    credits: "2,000 AI credits / month included",
    perks: [
      "Own it for life - no monthly platform fee",
      "Advanced animations & 3D sections",
      "AI product descriptions & SEO",
      "AI recommendations",
      "AI customer support",
      "WhatsApp automation",
      "Multiple staff accounts",
    ],
  },
  {
    name: "AI Commerce",
    price: "₹1,49,999",
    credits: "5,000 AI credits / month included",
    featured: true,
    perks: [
      "Own it for life - no monthly platform fee",
      "AI Store Builder",
      "AI Shopping Assistant",
      "AI Sales Agent & marketing",
      "Personalized storefronts",
      "WhatsApp AI",
      "Advanced motion/3D",
      "Priority support",
    ],
  },
];
