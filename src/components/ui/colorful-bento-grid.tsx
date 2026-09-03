import Link from "next/link";
import { Globe, Smartphone, SquareStack, Bot, Megaphone, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Featured services shown in the bento grid - a subset of the full list in
// src/lib/services-data.ts, picked to fill the 1-big + 4-small layout below.
const featured = [
  {
    title: "Web Development",
    description: "Websites, eCommerce, web applications, custom platforms.",
    icon: Globe,
    bg: "bg-rose-100",
    gradient: "from-rose-300 via-rose-400 to-rose-600",
    shadow: "shadow-rose-500/40",
    rotate: "",
  },
  {
    title: "SaaS Development",
    description: "Multi-tenant platforms, billing, admin panels, and APIs.",
    icon: SquareStack,
    bg: "bg-blue-100",
    gradient: "from-blue-300 via-blue-400 to-blue-600",
    shadow: "shadow-blue-500/40",
    rotate: "",
  },
  {
    title: "AI Solutions",
    description: "Custom AI features, LLM integrations, and automation.",
    icon: Bot,
    bg: "bg-violet-100",
    gradient: "from-violet-300 via-violet-400 to-violet-600",
    shadow: "shadow-violet-500/40",
    rotate: "",
  },
  {
    title: "Digital Marketing & Branding",
    description: "Social, content, performance campaigns, and brand identity.",
    icon: Megaphone,
    bg: "bg-amber-100",
    gradient: "from-amber-300 via-amber-400 to-amber-600",
    shadow: "shadow-amber-500/40",
    rotate: "",
  },
  {
    title: "Mobile App Development",
    description: "Android, iOS, React Native, Flutter, API-driven apps.",
    icon: Smartphone,
    bg: "bg-emerald-100",
    gradient: "from-emerald-300 via-emerald-400 to-emerald-600",
    shadow: "shadow-emerald-500/40",
    rotate: "",
  },
];

/**
 * Glossy, dimensional icon badge - a gradient-filled tile with an inner
 * top highlight (glass reflection) and bottom inner shadow (depth), plus a
 * colored drop shadow beneath. CSS/SVG only, no 3D rendering or new deps.
 */
function IconBadge({
  icon: Icon,
  gradient,
  shadow,
  size = "size-14",
  iconSize = "size-7",
}: {
  icon: LucideIcon;
  gradient: string;
  shadow: string;
  size?: string;
  iconSize?: string;
}) {
  return (
    <div
      className={`relative flex ${size} shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg ${shadow} transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:rotate-3`}
    >
      {/* Glass highlight - a soft white glow near the top-left, like light hitting a rounded surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(120% 100% at 22% 15%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.15) 35%, transparent 60%)",
        }}
      />
      {/* Inner shadow along the bottom edge for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: "inset 0 -6px 10px -4px rgba(0,0,0,0.28)" }}
      />
      <Icon className={`relative ${iconSize} text-white drop-shadow-sm`} strokeWidth={1.75} />
    </div>
  );
}

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
            Full-stack product development - web, mobile, SaaS, and AI - handled by one
            team, start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            href="/services"
            className={`group relative flex h-[280px] flex-col items-start justify-end gap-4 overflow-hidden rounded-xl px-6 py-6 transition-all duration-200 ease-in-out hover:scale-[1.01] hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] md:col-span-2 ${big.bg}`}
          >
            <IconBadge icon={big.icon} gradient={big.gradient} shadow={big.shadow} size="size-16" iconSize="size-8" />
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
              <IconBadge icon={service.icon} gradient={service.gradient} shadow={service.shadow} />
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
