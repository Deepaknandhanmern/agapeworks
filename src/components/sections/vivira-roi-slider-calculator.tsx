"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

// 70% cart abandonment (Baymard Institute industry average, already cited
// on this page) x 22% recovery rate (midpoint of the hero's "20-30% of
// lost sales" claim) reproduces the spec's own worked example exactly:
// 500 orders x Rs2,500 AOV = Rs1,92,500/mo recovered = ~96x the Pro Growth
// plan's monthly cost.
const ABANDONMENT_RATE = 0.7;
const RECOVERY_RATE = 0.22;
const PLAN_COST_MONTHLY = 1999; // Pro Growth, for the "x ROI" multiple

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ViviraRoiSliderCalculator() {
  const [orders, setOrders] = useState(500);
  const [aov, setAov] = useState(2500);

  const recoveredRevenue = orders * ABANDONMENT_RATE * RECOVERY_RATE * aov;
  const recoveredOrders = orders * ABANDONMENT_RATE * RECOVERY_RATE;
  const roiMultiple = recoveredRevenue / PLAN_COST_MONTHLY;

  return (
    <div className="liquid-glass mx-auto w-full max-w-2xl rounded-2xl p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-2">
        <TrendingUp className="size-5 text-foreground" />
        <h2 className="text-xl font-semibold text-foreground">See what recovery is worth to you</h2>
      </div>

      <div className="flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Monthly store orders</span>
            <span className="text-muted-foreground">{orders.toLocaleString("en-IN")}</span>
          </span>
          <input
            type="range"
            min={100}
            max={5000}
            step={50}
            value={orders}
            onChange={(e) => setOrders(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-orange-500"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Average order value</span>
            <span className="text-muted-foreground">{formatINR(aov)}</span>
          </span>
          <input
            type="range"
            min={500}
            max={10000}
            step={100}
            value={aov}
            onChange={(e) => setAov(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-orange-500"
          />
        </label>
      </div>

      <div className="mt-6 rounded-xl border bg-muted/30 p-5 text-center">
        <p className="text-sm text-muted-foreground">Estimated recovered revenue, per month</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
          {formatINR(recoveredRevenue)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          ≈ {Math.round(recoveredOrders)} recovered orders/month - {roiMultiple.toFixed(0)}x return on
          the Pro Growth plan
        </p>
      </div>

      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Based on a 70% cart abandonment rate (industry average per Baymard Institute) and a 25%
        recovery rate from the full 3-step sequence - an estimate for planning purposes, not a
        guarantee of actual results.
      </p>
    </div>
  );
}
