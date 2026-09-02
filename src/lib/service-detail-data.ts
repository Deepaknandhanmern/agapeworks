import {
  Bot,
  Globe,
  Megaphone,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type ServiceDetail = {
  slug: string;
  title: string;
  icon: LucideIcon;
  eyebrow: string;
  tagline: string;
  description: string;
  included: string[];
};

// SaaS Development deliberately isn't here — it routes straight to /saas,
// which already covers it (hero, dashboard showcase, features) better than
// a duplicate page would.
export const serviceDetails: ServiceDetail[] = [
  {
    slug: "web-development",
    title: "Web Development",
    icon: Globe,
    eyebrow: "Web Development",
    tagline: "Websites and web applications built to convert and scale",
    description:
      "From marketing sites to full custom web applications — built on Next.js and React, with the performance and SEO fundamentals handled from day one, not bolted on after launch.",
    included: [
      "Marketing sites and landing pages",
      "Custom web applications and internal tools",
      "Performance and technical SEO baked in",
      "CMS-backed content (blogs, case studies, docs)",
      "Responsive design across every screen size",
      "Ongoing maintenance and dependency upkeep",
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    icon: Smartphone,
    eyebrow: "Mobile App Development",
    tagline: "Native and cross-platform apps, shipped to real app stores",
    description:
      "Android, iOS, React Native, and Flutter — one team building the app and the API it talks to, so nothing gets lost in translation between frontend and backend.",
    included: [
      "Native (Android/iOS) and cross-platform builds",
      "App Store and Google Play submission",
      "Push notifications",
      "Offline-first support where it matters",
      "API design and integration",
      "Post-launch bug fixes and OS-update support",
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    icon: Bot,
    eyebrow: "AI Solutions",
    tagline: "AI features built into the product, not bolted on as a chatbot widget",
    description:
      "We build the same kind of AI features into client products that we run on our own site — an AI assistant grounded in real data at /scope, and an AI concierge chat here on agapeworks.in. Not a demo; a working reference.",
    included: [
      "AI assistants grounded in your own data — never inventing answers",
      "LLM-powered content generation and classification",
      "Workflow automation (triage, summarization, routing)",
      "Voice and conversational interfaces",
      "Retrieval-augmented search over your own knowledge base",
    ],
  },
  {
    slug: "digital-marketing-branding",
    title: "Digital Marketing & Branding",
    icon: Megaphone,
    eyebrow: "Digital Marketing & Branding",
    tagline: "Brand identity and marketing that matches the product you actually built",
    description:
      "Visual identity, content, and campaigns — built by the same team that builds the product, so your brand and your site never feel like they came from two different companies.",
    included: [
      "Brand identity and visual design",
      "SEO and answer-engine optimization (AEO)",
      "Content strategy and writing",
      "Performance marketing campaigns",
      "Social media management",
    ],
  },
];

export function getServiceDetailBySlug(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}
