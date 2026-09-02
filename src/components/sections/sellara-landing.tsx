"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Wand2,
  MessageCircle,
  Check,
  ShieldCheck,
} from "lucide-react";
import {
  chatDemoScript,
  builderPresets,
  featureGroups,
  sellaraPlans,
} from "@/lib/sellara-data";

// Placeholder brand name - see the comment at the top of sellara-data.ts.
const PRODUCT_NAME = "Sellara";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------- Nav ---------------------------------- */

function SellaraNav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/sellara" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <Sparkles className="size-4 text-amber-300" />
          {PRODUCT_NAME}
        </Link>
        <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a href="#ai-commerce" className="transition-colors hover:text-white">AI Commerce</a>
          <a href="#storefronts" className="transition-colors hover:text-white">Storefronts</a>
          <a href="#features" className="transition-colors hover:text-white">Features</a>
          <a href="#pricing" className="transition-colors hover:text-white">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/products" className="hidden text-sm text-white/60 transition-colors hover:text-white sm:block">
            Back to Agape Works
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Start Building
          </Link>
        </div>
      </nav>
    </header>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function MagneticButton({ children, href, variant = "primary" }: { children: React.ReactNode; href: string; variant?: "primary" | "ghost" }) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      className={
        variant === "primary"
          ? "inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_40px_-8px_rgba(255,255,255,0.4)]"
          : "inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/90 hover:bg-white/5"
      }
    >
      {children}
    </motion.a>
  );
}

function StorefrontPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
      style={{ perspective: 1200 }}
      className="mx-auto mt-16 w-full max-w-4xl"
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="ml-3 text-xs text-white/40">yourstore.com</span>
        </div>
        <div className="grid gap-px bg-white/5 p-px sm:grid-cols-3">
          <div className="col-span-3 flex aspect-[16/7] flex-col items-start justify-end bg-gradient-to-br from-neutral-900 to-neutral-950 p-8">
            <span className="mb-2 text-xs uppercase tracking-widest text-amber-300/80">New collection</span>
            <span className="text-2xl font-semibold text-white sm:text-3xl">Autumn, reimagined.</span>
          </div>
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex aspect-square flex-col justify-end bg-neutral-900 p-4"
            >
              <div className="mb-3 flex-1 rounded-md bg-gradient-to-br from-white/10 to-white/[0.02]" />
              <span className="text-sm text-white/80">Product {i}</span>
              <span className="text-xs text-white/40">₹{i}2,999</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-black px-6 pb-8 pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.12),transparent_60%)]"
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70"
        >
          <Sparkles className="size-3.5 text-amber-300" />
          An Agape Works product - early access
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Build a store that sells itself.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-balance text-lg leading-7 text-white/60"
        >
          {PRODUCT_NAME} gives merchants a premium storefront, an AI shopping assistant for
          customers, and AI-generated content and support - all in one platform.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="/contact">
            Start Building <ArrowRight className="size-4" />
          </MagneticButton>
          <MagneticButton href="#ai-commerce" variant="ghost">
            Explore Demo
          </MagneticButton>
        </motion.div>
        <StorefrontPreview />
      </div>
    </section>
  );
}

/* ------------------------------ AI Commerce ------------------------------ */

function ChatDemo() {
  const [step, setStep] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);

  React.useEffect(() => {
    if (!inView || step >= chatDemoScript.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 500 : 1400);
    return () => clearTimeout(t);
  }, [inView, step]);

  return (
    <div ref={containerRef} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <AnimatePresence initial={false}>
        {chatDemoScript.slice(0, step).map((turn, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={turn.role === "customer" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                turn.role === "customer"
                  ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-white px-4 py-2.5 text-sm text-black"
                  : "max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-neutral-900 px-4 py-2.5 text-sm text-white/90"
              }
            >
              <p>{turn.text}</p>
              {turn.products && (
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {turn.products.map((p) => (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 }}
                      className="rounded-lg border border-white/10 bg-white/5 p-2.5"
                    >
                      <div className="mb-2 aspect-square rounded-md bg-gradient-to-br from-amber-200/20 to-white/5" />
                      <p className="text-xs font-medium text-white">{p.name}</p>
                      <p className="text-xs text-white/50">{p.price}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {step < chatDemoScript.length && step > 0 && (
        <div className="flex items-center gap-1.5 pl-1 text-white/40">
          <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-current" />
        </div>
      )}
    </div>
  );
}

// Small local hook - this page doesn't otherwise depend on a scroll library,
// and Framer's `whileInView` doesn't expose a plain boolean for effects.
function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function AICommerceSection() {
  return (
    <section id="ai-commerce" className="bg-black px-6 py-28">
      <div className="mx-auto grid w-full max-w-5xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
            <MessageCircle className="size-3.5" /> AI Commerce
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Customers shop by asking, not searching.
          </h2>
          <p className="mt-4 max-w-md text-white/60">
            Every {PRODUCT_NAME} store ships with an AI shopping assistant grounded in the
            merchant&apos;s real catalog - prices, stock, sizes, and policies. It recommends,
            compares, and guides customers to checkout. It never invents a product.
          </p>
          <ul className="mt-6 flex flex-col gap-2 text-sm text-white/50">
            {["Product discovery by budget or occasion", "Compares products across variants", "Escalates to a human when it should"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-amber-300/80" /> {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <ChatDemo />
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- Store Builder ------------------------------ */

function BuilderPreview({ preset }: { preset: (typeof builderPresets)[number] }) {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-xl transition-colors duration-500"
      style={{ backgroundColor: preset.bg }}
    >
      <div
        className={`flex flex-1 flex-col justify-end p-6 ${preset.heroFont}`}
        style={{ color: preset.fg }}
      >
        <span className="mb-1 text-xs uppercase tracking-widest opacity-60">Preview</span>
        <span className="text-2xl font-semibold">{preset.heroText}</span>
      </div>
      <div
        className={`grid gap-1 p-3 ${preset.cardStyle === "editorial" ? "grid-cols-2" : "grid-cols-3"}`}
        style={{ backgroundColor: preset.bg }}
      >
        {(preset.cardStyle === "editorial" ? [1, 2] : [1, 2, 3]).map((i) => (
          <div
            key={i}
            className="aspect-square rounded-md opacity-80"
            style={{ backgroundColor: preset.accent, opacity: 0.25 + i * 0.08 }}
          />
        ))}
      </div>
    </div>
  );
}

function StoreBuilderSection() {
  const [active, setActive] = React.useState(0);
  const preset = builderPresets[active];

  return (
    <section className="border-t border-white/10 bg-neutral-950 px-6 py-28">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
            <Wand2 className="size-3.5" /> AI Store Builder
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Tell it what you want. Watch the store change.
          </h2>
          <p className="mt-4 text-white/60">
            The builder isn&apos;t a form with fields - it&apos;s a conversation. Try one of these
            real prompts merchants use.
          </p>
        </Reveal>

        <Reveal className="grid gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:items-start">
          <div className="flex flex-col gap-2">
            {builderPresets.map((p, i) => (
              <button
                key={p.prompt}
                onClick={() => setActive(i)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  i === active
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-white/10 text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                &ldquo;{p.prompt}&rdquo;
              </button>
            ))}
          </div>
          <div className="aspect-[4/3] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={preset.prompt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <BuilderPreview preset={preset} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- Storefront showcase --------------------------- */

function StorefrontShowcase() {
  return (
    <section id="storefronts" className="border-t border-white/10 bg-black px-6 py-28">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Storefronts that feel expensive to make.
          </h2>
          <p className="mt-4 text-white/60">
            Real interactions, not screenshots - hover the cards below.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          <Reveal className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black p-5">
            <span className="text-xs uppercase tracking-widest text-white/40">Product reveal</span>
            <div className="absolute inset-x-5 bottom-5 top-16 overflow-hidden rounded-lg bg-white/[0.04]">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full w-full bg-gradient-to-t from-amber-200/20 to-transparent"
              />
            </div>
          </Reveal>
          <Reveal className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black p-5">
            <span className="text-xs uppercase tracking-widest text-white/40">Magnetic button</span>
            <div className="flex flex-1 items-center justify-center">
              <MagneticButton href="#" variant="ghost">
                Hover me
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black p-5">
            <span className="text-xs uppercase tracking-widest text-white/40">Parallax depth</span>
            <motion.div
              initial={{ scale: 1.15, y: 10 }}
              whileInView={{ scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-x-5 bottom-5 top-16 rounded-lg bg-gradient-to-br from-white/10 to-transparent"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Features -------------------------------- */

function FeaturesSection() {
  return (
    <section id="features" className="border-t border-white/10 bg-neutral-950 px-6 py-28">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Everything to run the store. Everything to sell more.
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {featureGroups.map((group) => (
            <Reveal key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">
                {group.title}
              </h3>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <Check className="size-3.5 shrink-0 text-amber-300/80" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Pricing -------------------------------- */

function PricingSection() {
  return (
    <section id="pricing" className="border-t border-white/10 bg-black px-6 py-28">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            One payment. Own it for life.
          </h2>
          <p className="mt-4 text-white/60">
            No monthly platform fee, ever. AI usage stays metered - each plan includes a monthly
            AI credit allowance, with top-up packs available anytime you need more.
          </p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-4">
          {sellaraPlans.map((plan) => (
            <Reveal
              key={plan.name}
              className={`flex flex-col gap-5 rounded-2xl border p-6 ${
                plan.featured ? "border-amber-300/40 bg-gradient-to-b from-amber-300/[0.08] to-transparent" : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div>
                <p className="text-sm font-medium text-white/60">{plan.name}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{plan.price}</p>
                <p className="text-xs text-white/40">one-time payment</p>
                {plan.credits && (
                  <p className="mt-2 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
                    {plan.credits}
                  </p>
                )}
              </div>
              <ul className="flex flex-1 flex-col gap-2 text-xs text-white/60">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-1.5">
                    <Check className="mt-0.5 size-3 shrink-0 text-amber-300/70" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-auto inline-flex h-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                  plan.featured ? "bg-amber-300 text-black hover:bg-amber-200" : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                Choose {plan.name}
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 flex max-w-md items-center justify-center gap-1.5 text-center text-xs text-white/40">
          <ShieldCheck className="size-3.5 shrink-0" />
          Placeholder pricing for early access - final numbers may change before launch.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------- CTA ---------------------------------- */

function FinalCTA() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-28">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Your store. Your brand. AI that helps you sell.
        </h2>
        <p className="text-white/60">
          {PRODUCT_NAME} is in early access, built by Agape Works. Tell us about your store and
          we&apos;ll reach out about getting you in.
        </p>
        <MagneticButton href="/contact">
          Request early access <ArrowUpRight className="size-4" />
        </MagneticButton>
      </Reveal>
    </section>
  );
}

/* --------------------------------- Export --------------------------------- */

export function SellaraLanding() {
  return (
    <div className="bg-black">
      <SellaraNav />
      <Hero />
      <AICommerceSection />
      <StoreBuilderSection />
      <StorefrontShowcase />
      <FeaturesSection />
      <PricingSection />
      <FinalCTA />
      <footer className="border-t border-white/10 bg-black px-6 py-8 text-center text-xs text-white/30">
        {PRODUCT_NAME} is an early-access product by{" "}
        <Link href="/" className="underline underline-offset-2 hover:text-white/60">
          Agape Works
        </Link>
        .
      </footer>
    </div>
  );
}
