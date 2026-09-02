import { Cpu, Fingerprint, Pencil, Settings2, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast to ship",
    description: "Weekly working demos, not months of silence before a big reveal.",
  },
  {
    icon: Cpu,
    title: "Built to scale",
    description: "Multi-tenant architecture from day one, so growth doesn't mean a rewrite.",
  },
  {
    icon: Fingerprint,
    title: "Secure by default",
    description: "Auth, authorization, and data isolation baked into every build.",
  },
  {
    icon: Pencil,
    title: "Fully customizable",
    description: "Your brand, your workflows - not a template you have to work around.",
  },
  {
    icon: Settings2,
    title: "You're in control",
    description: "100% code ownership. No lock-in, no black box.",
  },
  {
    icon: Sparkles,
    title: "AI-native",
    description: "AI features built in from the start, not bolted on as an afterthought.",
  },
];

export function Features() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-8">
          <h2 className="text-balance text-4xl font-medium text-white lg:text-5xl">
            The foundation for SaaS teams that ship
          </h2>
          <p className="text-white/50">
            Every SaaS platform we build shares the same foundation - fast, secure, and yours to
            keep.
          </p>
        </div>

        <div className="relative mx-auto grid max-w-2xl divide-x divide-y divide-white/10 border border-white/10 *:p-12 sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon className="size-4 text-white/70" />
                <h3 className="text-sm font-medium text-white">{title}</h3>
              </div>
              <p className="text-sm text-white/50">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
