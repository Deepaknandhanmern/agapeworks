import {
  Smartphone,
  ShoppingCart,
  LogOut,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  CircleCheck,
  TrendingUp,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

// Real hand-drawn, full-body people (Open Peeps by Pablo Stanley, CC0)
// illustrate Vivira's actual, verified recovery flow. Each body/head/face is
// composed from the MIT-licensed hello-efficiency-inc/openpeeps-generator
// component set (recolored to Vivira's orange/purple) and saved as a flat
// SVG under /public/gestures - see scripts referenced in the commit that
// added them for how they were assembled. Deliberately does NOT depict
// fulfillment/courier/GST steps - those aren't part of what Vivira does
// today (see the "6-step" journey copy above, which currently overclaims a
// couple of those - worth reconciling separately). A small lucide icon badge
// on each portrait carries the specific action/prop a static illustration
// can't show.

const ORANGE = "#f97316";
const PURPLE = "#9333ea";
const WHATSAPP_GREEN = "#25D366";
const SUCCESS_GREEN = "#16a34a";

function Badge({ icon: Icon, color }: { icon: LucideIcon; color: string }) {
  return (
    <span
      className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-2 bg-white shadow-sm"
      style={{ borderColor: color }}
    >
      <Icon className="size-4" style={{ color }} />
    </span>
  );
}

function QuestionBadge() {
  return (
    <span className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-2 border-foreground/70 bg-white text-sm font-bold text-foreground shadow-sm">
      ?
    </span>
  );
}

function Portrait({ src, badge }: { src: string; badge?: React.ReactNode }) {
  return (
    <div className="relative h-36 w-28 sm:h-44 sm:w-32">
      {/* eslint-disable-next-line @next/next/no-img-element -- static CC0 illustrations, no need for next/image processing */}
      <img src={src} alt="" className="h-full w-full object-contain" />
      {badge}
    </div>
  );
}

const categories: {
  label: string;
  items: { caption: string; render: () => React.ReactNode }[];
}[] = [
  {
    label: "The Abandon",
    items: [
      { caption: "Browses the store", render: () => <Portrait src="/gestures/browses.svg" badge={<Badge icon={Smartphone} color={ORANGE} />} /> },
      { caption: "Adds to cart", render: () => <Portrait src="/gestures/adds-to-cart.svg" badge={<Badge icon={ShoppingCart} color={PURPLE} />} /> },
      { caption: "Leaves without paying", render: () => <Portrait src="/gestures/leaves.svg" badge={<Badge icon={LogOut} color={ORANGE} />} /> },
    ],
  },
  {
    label: "The Recovery",
    items: [
      { caption: "WhatsApp reminder sent", render: () => <Portrait src="/gestures/reminder-sent.svg" badge={<Badge icon={MessageCircle} color={WHATSAPP_GREEN} />} /> },
      { caption: "Reads the message", render: () => <Portrait src="/gestures/reads-message.svg" badge={<Badge icon={MessageCircle} color={WHATSAPP_GREEN} />} /> },
      { caption: "Taps back to checkout", render: () => <Portrait src="/gestures/taps-back.svg" badge={<Badge icon={ShoppingCart} color={PURPLE} />} /> },
    ],
  },
  {
    label: "The Conversation",
    items: [
      { caption: "Asks a question", render: () => <Portrait src="/gestures/asks-question.svg" badge={<QuestionBadge />} /> },
      { caption: "AI answers instantly", render: () => <Portrait src="/gestures/ai-answers.svg" badge={<Badge icon={Sparkles} color={PURPLE} />} /> },
      {
        caption: "Human steps in if needed",
        render: () => (
          <div className="flex items-center gap-1">
            <Portrait src="/gestures/human-support.svg" />
            <Handshake className="size-5 text-muted-foreground" />
            <Portrait src="/gestures/human-support-2.svg" />
          </div>
        ),
      },
    ],
  },
  {
    label: "The Outcome",
    items: [
      { caption: "COD verified over WhatsApp", render: () => <Portrait src="/gestures/cod-verified.svg" badge={<Badge icon={ShieldCheck} color={ORANGE} />} /> },
      { caption: "Order completes", render: () => <Portrait src="/gestures/order-completes.svg" badge={<Badge icon={CircleCheck} color={SUCCESS_GREEN} />} /> },
      { caption: "Revenue recovered", render: () => <Portrait src="/gestures/revenue-recovered.svg" badge={<Badge icon={TrendingUp} color={SUCCESS_GREEN} />} /> },
    ],
  },
];

export function ViviraGestureStory() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-24">
      <Reveal className="mb-12 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          The recovery, illustrated
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          What actually happens between a shopper closing the tab and an order landing in WooCommerce.
        </p>
      </Reveal>

      <div className="flex flex-col gap-10">
        {categories.map((category, ci) => (
          <Reveal key={category.label} delay={ci * 0.08}>
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {category.label}
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {category.items.map((item) => (
                <div key={item.caption} className="liquid-glass flex flex-col items-center gap-2 rounded-2xl px-3 py-5 text-center">
                  {item.render()}
                  <p className="text-xs font-medium text-foreground sm:text-sm">{item.caption}</p>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
