"use client";

import React from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { BarChart3, Receipt, KanbanSquare } from "lucide-react";

// Mockup panels only — not real client screenshots. The three views mirror
// dashboard work Agape Works has actually shipped (this site's own admin
// dashboard, and the Vahi billing product), kept abstract rather than
// screenshotting private admin data.
const views = [
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    stats: [
      { label: "Revenue", value: "₹4.2L" },
      { label: "Active users", value: "1,204" },
      { label: "Conversion", value: "6.8%" },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    icon: Receipt,
    invoices: [
      { name: "INV-0042", status: "Paid", amount: "₹18,500" },
      { name: "INV-0041", status: "Unpaid", amount: "₹6,200" },
      { name: "INV-0040", status: "Paid", amount: "₹32,000" },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    icon: KanbanSquare,
    columns: [
      { label: "New", count: 4 },
      { label: "In progress", count: 3 },
      { label: "Done", count: 7 },
    ],
  },
] as const;

function AnalyticsMockup({ stats }: { stats: readonly { label: string; value: string }[] }) {
  return (
    <div className="grid gap-3 p-6 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-wide text-white/40">{s.label}</p>
          <p className="mt-1 text-xl font-semibold text-white">{s.value}</p>
        </div>
      ))}
      <div className="col-span-full mt-1 flex h-20 items-end gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] p-3">
        {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-white/10 to-white/40" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function BillingMockup({ invoices }: { invoices: readonly { name: string; status: string; amount: string }[] }) {
  return (
    <div className="flex flex-col gap-2 p-6">
      {invoices.map((inv) => (
        <div key={inv.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="text-sm text-white/80">{inv.name}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              inv.status === "Paid" ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"
            }`}
          >
            {inv.status}
          </span>
          <span className="text-sm font-medium text-white">{inv.amount}</span>
        </div>
      ))}
    </div>
  );
}

function OperationsMockup({ columns }: { columns: readonly { label: string; count: number }[] }) {
  return (
    <div className="grid gap-3 p-6 sm:grid-cols-3">
      {columns.map((col) => (
        <div key={col.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-white/40">{col.label}</p>
            <span className="rounded-full bg-white/10 px-1.5 text-xs text-white/60">{col.count}</span>
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: col.count > 3 ? 3 : col.count }).map((_, i) => (
              <div key={i} className="h-8 rounded-md bg-white/[0.06]" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardShowcase() {
  const [active, setActive] = React.useState<(typeof views)[number]["id"]>("analytics");

  return (
    <section className="relative border-t border-white/10 px-6 py-24">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="text-balance text-3xl font-medium text-white sm:text-4xl">The dashboards we build</h2>
          <p className="mt-3 text-white/50">
            Analytics, billing, operations — real dashboard work we&apos;ve shipped, including this
            site&apos;s own admin panel and the Vahi billing product.
          </p>
        </div>

        <div className="mb-6 flex justify-center gap-2">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === v.id ? "bg-white text-black" : "border border-white/10 text-white/60 hover:bg-white/5"
              }`}
            >
              <v.icon className="size-3.5" />
              {v.label}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950">
          <BorderBeam size={250} duration={12} colorFrom="#ffffff" colorTo="#525252" />
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="ml-3 text-xs text-white/30">yourproduct.com/dashboard</span>
          </div>
          {views.map((v) =>
            v.id !== active ? null : v.id === "analytics" ? (
              <AnalyticsMockup key={v.id} stats={v.stats} />
            ) : v.id === "billing" ? (
              <BillingMockup key={v.id} invoices={v.invoices} />
            ) : (
              <OperationsMockup key={v.id} columns={v.columns} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
