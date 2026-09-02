import {
  Bot,
  Globe,
  Megaphone,
  Search,
  Smartphone,
  SquareStack,
  Webhook,
  Wrench,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type ServiceItem = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const mainServices: ServiceItem[] = [
  {
    step: "01",
    title: "Web Development",
    description: "Websites, eCommerce, web applications, custom platforms.",
    icon: Globe,
  },
  {
    step: "02",
    title: "Mobile App Development",
    description: "Android, iOS, React Native, Flutter, API-driven mobile applications.",
    icon: Smartphone,
  },
  {
    step: "03",
    title: "SaaS Development",
    description:
      "Multi-tenant SaaS platforms, subscription systems, dashboards, admin panels, billing, APIs and cloud-based business software.",
    icon: SquareStack,
  },
  {
    step: "04",
    title: "AI Solutions",
    description:
      "Custom AI features, LLM integrations, and intelligent automation built into your product.",
    icon: Bot,
  },
  {
    step: "05",
    title: "Digital Marketing & Branding",
    description:
      "Digital marketing, social media, content, performance campaigns, brand identity and graphic design.",
    icon: Megaphone,
  },
];

export const supportingServices: ServiceItem[] = [
  {
    step: "01",
    title: "SEO & AEO",
    description:
      "Technical and on-page SEO combined with answer-engine optimization for AI-powered search — structured data, entities, and answer-focused content.",
    icon: Search,
  },
  {
    step: "02",
    title: "API Development",
    description: "REST and GraphQL APIs, third-party integrations, and webhooks that connect your systems.",
    icon: Webhook,
  },
  {
    step: "03",
    title: "Security",
    description:
      "Authentication, authorization, and security audits that protect your product and your users' data.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Maintenance",
    description:
      "Ongoing support, bug fixes, and dependency updates after launch — so the product keeps running.",
    icon: Wrench,
  },
];

// Combined list — kept for call sites that just need "all services" (e.g.
// the contact form's service picker) without caring about grouping.
export const services: ServiceItem[] = [...mainServices, ...supportingServices];
