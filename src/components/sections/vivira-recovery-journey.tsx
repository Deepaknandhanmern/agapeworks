import { MousePointerClick, MessageCircle, Sparkles, CreditCard, Truck, Sunrise } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    title: "Real-time cart exit capture",
    description: "Phone and name are saved the moment a shopper starts to leave - before they ever click Place Order.",
    icon: MousePointerClick,
  },
  {
    title: "Official WhatsApp reservation card",
    description: "A 10% reservation offer goes out over WhatsApp with a 30-minute window to act.",
    icon: MessageCircle,
  },
  {
    title: "Conversational AI answers doubts",
    description: "Sizing, fabric, delivery - answered in about 1.4 seconds, no human in the loop.",
    icon: Sparkles,
  },
  {
    title: "1-click UPI payment",
    description: "The order is created directly in WooCommerce the moment payment clears.",
    icon: CreditCard,
  },
  {
    title: "Live courier tracking + GST invoice",
    description: "Delhivery/Shiprocket GPS tracking and a GST invoice PDF, sent automatically.",
    icon: Truck,
  },
  {
    title: "9:00 AM CEO briefing",
    description: "A daily financial briefing lands on the founder's phone every morning.",
    icon: Sunrise,
  },
];

export function ViviraRecoveryJourney() {
  return (
    <section id="journey" className="relative mx-auto w-full max-w-6xl px-4 py-24">
      <Reveal className="mb-12 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          The 6-step autonomous recovery journey
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          From an abandoned cart to a delivered order, with no one at the keyboard.
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.08}>
            <div className="liquid-glass flex h-full flex-col gap-3 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-content-center rounded-full bg-gradient-to-br from-orange-500 to-purple-600 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <step.icon className="size-5 text-foreground" />
              </div>
              <h3 className="font-medium text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
