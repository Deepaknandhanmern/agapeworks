"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

// Cart-abandonment-rate default (70%) is the widely-cited Baymard Institute
// industry average, not something invented for this page. The 10% recovery
// rate is a conservative, clearly-labeled assumption for typical automated
// reminder campaigns - not a claim about Vivira's actual performance, since
// Vivira has no real installs/data yet (see src/app/products/page.tsx).
const DEFAULT_ORDERS_PER_MONTH = 200;
const DEFAULT_AOV = 1500;
const DEFAULT_ABANDONMENT_RATE = 70;
const ASSUMED_RECOVERY_RATE = 0.1;

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ViviraRoiCalculator() {
  const [ordersPerMonth, setOrdersPerMonth] = useState(DEFAULT_ORDERS_PER_MONTH);
  const [aov, setAov] = useState(DEFAULT_AOV);
  const [abandonmentRate, setAbandonmentRate] = useState(DEFAULT_ABANDONMENT_RATE);

  const rate = Math.min(Math.max(abandonmentRate, 0), 99) / 100;
  const abandonedCarts = ordersPerMonth > 0 ? (ordersPerMonth * rate) / (1 - rate) : 0;
  const recoveredOrders = abandonedCarts * ASSUMED_RECOVERY_RATE;
  const recoveredRevenue = recoveredOrders * aov;

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-2">
        <Calculator className="size-5 text-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Estimate what recovery could be worth</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Orders per month</span>
          <input
            type="number"
            min={0}
            value={ordersPerMonth}
            onChange={(e) => setOrdersPerMonth(Math.max(0, Number(e.target.value)))}
            className="h-10 rounded-md border bg-background px-3 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Average order value (₹)</span>
          <input
            type="number"
            min={0}
            value={aov}
            onChange={(e) => setAov(Math.max(0, Number(e.target.value)))}
            className="h-10 rounded-md border bg-background px-3 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Cart abandonment rate (%)</span>
          <input
            type="number"
            min={0}
            max={99}
            value={abandonmentRate}
            onChange={(e) => setAbandonmentRate(Number(e.target.value))}
            className="h-10 rounded-md border bg-background px-3 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
      </div>

      <div className="mt-6 rounded-xl border bg-muted/30 p-5 text-center">
        <p className="text-sm text-muted-foreground">Estimated recoverable revenue, per month</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
          {formatINR(recoveredRevenue)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          ≈ {Math.round(recoveredOrders)} recovered orders/month
        </p>
      </div>

      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Based on your inputs, assuming a 70% cart abandonment rate is typical (industry average
        per Baymard Institute) and a conservative 10% recovery rate from automated reminders - an estimate for planning purposes, not a guarantee of Vivira&apos;s actual results.
      </p>
    </div>
  );
}
