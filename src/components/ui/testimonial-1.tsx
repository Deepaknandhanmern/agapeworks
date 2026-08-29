"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowDown, ArrowUp, Clock, Globe2, Rocket, ShieldCheck } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  isIncrease: boolean;
  icon: typeof Clock;
}

// Honest metrics — same set already used on the /about page's achievements
// block, not per-logo "customer" stats. This template's original demo
// hard-coded Netflix/Vercel/Amazon/Alibaba logos as if they were clients
// with fabricated payroll-SaaS metrics, and a testimonial quote attributed
// to a made-up "John Doe" — none of that is real for Agape Works, so it's
// replaced with the studio's actual commitments and a value-prop tooltip
// instead of an invented customer quote.
const stats: StatItem[] = [
  { value: "2–4", label: "weeks to first ship", isIncrease: true, icon: Clock },
  { value: "100%", label: "code ownership, yours", isIncrease: true, icon: ShieldCheck },
  { value: "3", label: "live projects shipped", isIncrease: true, icon: Rocket },
  { value: "5", label: "continents worked across", isIncrease: true, icon: Globe2 },
];

export default function Testimonial1() {
  return (
    <div className="w-full grid place-content-center px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-muted px-4 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            How we work
          </div>
        </div>

        {/* Main heading with inline hover avatars */}
        <div className="relative mx-auto max-w-screen-xl text-center text-foreground">
          <h2 className="text-2xl font-semibold leading-tight md:text-3xl lg:text-5xl">
            We make it easy for <br className="sm:hidden" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative mx-2 inline-block origin-center align-middle">
                    <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-background transition-all duration-300 sm:w-16 md:hover:w-36">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                        alt="Founder"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs rounded-lg border-none bg-popover p-4 text-popover-foreground shadow-lg"
                >
                  <p className="text-sm">
                    Direct access to the engineers building your product — no account
                    layer relaying messages.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            founders and
          </h2>

          <h2 className="text-2xl font-semibold leading-tight md:text-3xl lg:text-5xl">
            their
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mx-2 inline-block align-middle">
                    <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-background transition-all duration-300 sm:w-16 lg:hover:w-36">
                      <img
                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=200&auto=format&fit=crop"
                        alt="Product team"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs rounded-lg border-none bg-popover p-4 text-popover-foreground shadow-lg"
                >
                  <p className="text-sm">
                    Weekly, working demos — you see real progress every week, not a
                    status report.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            teams to
          </h2>
          <h2 className="text-2xl font-semibold leading-tight text-muted-foreground md:text-3xl lg:text-5xl">
            ship real, working software
          </h2>
        </div>

        {/* Stats strip */}
        <div className="mt-8 grid w-full grid-cols-2 gap-8 rounded-md border bg-muted/40 px-8 py-6 sm:flex">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="relative flex flex-1 gap-4 pl-10">
                {index !== 0 && (
                  <div className="absolute left-0 h-9 w-0.5 border border-dashed border-border" />
                )}
                <div className="group h-full w-full">
                  <Icon
                    className="mx-auto h-10 w-10 -translate-y-0 text-muted-foreground opacity-100 transition-all duration-300 ease-out group-hover:-translate-y-12 group-hover:opacity-0"
                    aria-hidden="true"
                  />
                  <div className="absolute left-0 top-8 flex w-full flex-col items-center justify-center opacity-0 transition-all duration-300 ease-out group-hover:-top-3.5 group-hover:opacity-100">
                    <div className="relative flex items-center justify-center gap-2">
                      {stat.isIncrease ? (
                        <ArrowUp className="h-4 w-4 text-green-600 md:h-6 md:w-6" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-foreground md:h-6 md:w-6" />
                      )}
                      <span className="text-2xl font-semibold text-foreground md:text-4xl">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-center text-xs capitalize text-muted-foreground md:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
