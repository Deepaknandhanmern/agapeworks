import Link from "next/link";
import { Globe, Smartphone, SquareStack, Bot, Megaphone, ArrowRight } from "lucide-react";

// Featured services shown in the bento grid — a subset of the full list in
// src/lib/services-data.ts, picked to fill the 1-big + 4-small layout below.
const featured = [
  {
    title: "Web Development",
    description: "Websites, eCommerce, web applications, custom platforms.",
    icon: Globe,
    bg: "bg-rose-100",
    rotate: "-rotate-1",
  },
  {
    title: "Mobile App Development",
    description: "Android, iOS, React Native, Flutter, API-driven apps.",
    icon: Smartphone,
    bg: "bg-emerald-100",
    rotate: "rotate-6",
  },
  {
    title: "SaaS Development",
    description: "Multi-tenant platforms, billing, admin panels, and APIs.",
    icon: SquareStack,
    bg: "bg-blue-100",
    rotate: "-rotate-3",
  },
  {
    title: "AI Solutions",
    description: "Custom AI features, LLM integrations, and automation.",
    icon: Bot,
    bg: "bg-violet-100",
    rotate: "rotate-3",
  },
  {
    title: "Digital Marketing & Branding",
    description: "Social, content, performance campaigns, and brand identity.",
    icon: Megaphone,
    bg: "bg-amber-100",
    rotate: "-rotate-6",
  },
];

export const ColorfulBentoGrid = () => {
  const [big, ...rest] = featured;

  return (
    <section id="services" className="rounded-3xl bg-white p-4 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl text-left text-4xl font-semibold leading-[1.1] text-neutral-900 md:text-5xl">
            Everything it takes to build, ship, and grow.
          </h2>
          <p className="max-w-sm text-base font-medium text-neutral-500">
            Full-stack product development — web, mobile, SaaS, and AI — handled by one senior
            team, start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            href="/services"
            className={`group relative flex h-[280px] flex-col items-start justify-end gap-4 overflow-hidden rounded-xl px-6 py-6 transition-all duration-200 ease-in-out hover:scale-[1.01] hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] md:col-span-2 ${big.bg}`}
          >
            <big.icon className="size-8 text-neutral-700" strokeWidth={1.5} />
            <div className="flex flex-col items-start gap-2">
              <h3
                className={`${big.rotate} w-fit whitespace-nowrap rounded-full bg-neutral-900/90 px-6 py-2 text-2xl font-semibold text-white`}
              >
                {big.title}
              </h3>
              <p className="max-w-sm text-sm font-medium text-neutral-600">{big.description}</p>
            </div>
          </Link>

          {rest.map((service) => (
            <Link
              key={service.title}
              href="/services"
              className={`group relative flex h-[280px] flex-col items-start justify-end gap-3 overflow-hidden rounded-xl px-5 py-6 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] ${service.bg}`}
            >
              <service.icon className="size-7 text-neutral-700" strokeWidth={1.5} />
              <div className="flex flex-col items-start gap-2">
                <h3
                  className={`${service.rotate} w-fit whitespace-nowrap rounded-full bg-neutral-900/90 px-5 py-2 text-sm font-semibold text-white`}
                >
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-neutral-600">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/services"
          className="inline-flex w-fit items-center gap-1.5 self-center rounded-md px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
        >
          View all services
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
};
