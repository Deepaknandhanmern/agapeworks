import Link from "next/link";
import { getVahiDashboardStats, getVahiInvoices } from "@/lib/vahi/data";
import { formatINR, invoiceGrandTotal } from "@/lib/vahi/invoice-math";
import { FileText, IndianRupee, Clock } from "lucide-react";

export default async function VahiDashboardPage() {
  const [stats, invoices] = await Promise.all([getVahiDashboardStats(), getVahiInvoices()]);
  const recent = invoices.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <Link
          href="/vahi/invoices/new"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          New invoice
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <div className="mb-2 flex items-center gap-2 text-muted-foreground">
            <FileText className="size-4" />
            <p className="text-xs font-medium uppercase tracking-wide">Total invoices</p>
          </div>
          <p className="text-2xl font-semibold text-foreground">{stats.invoiceCount}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="mb-2 flex items-center gap-2 text-muted-foreground">
            <IndianRupee className="size-4" />
            <p className="text-xs font-medium uppercase tracking-wide">Collected</p>
          </div>
          <p className="text-2xl font-semibold text-foreground">{formatINR(stats.paidTotal)}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="mb-2 flex items-center gap-2 text-muted-foreground">
            <Clock className="size-4" />
            <p className="text-xs font-medium uppercase tracking-wide">Outstanding ({stats.unpaidCount})</p>
          </div>
          <p className="text-2xl font-semibold text-foreground">{formatINR(stats.unpaidTotal)}</p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Recent invoices</h2>
        {recent.length === 0 ? (
          <p className="rounded-xl border border-dashed bg-card/50 p-6 text-center text-sm text-muted-foreground">
            No invoices yet — create your first one.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {recent.map((invoice) => (
              <li key={invoice.id}>
                <Link
                  href={`/vahi/invoices/${invoice.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-accent"
                >
                  <div>
                    <p className="font-medium text-foreground">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">{invoice.customer.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">
                      {formatINR(invoiceGrandTotal(invoice.lineItems))}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        invoice.status === "paid" ? "bg-[#0ca30c]/10 text-[#006300]" : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
