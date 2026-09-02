import Link from "next/link";
import { getVahiInvoices } from "@/lib/vahi/data";
import { formatINR, invoiceGrandTotal } from "@/lib/vahi/invoice-math";

export default async function VahiInvoicesPage() {
  const invoices = await getVahiInvoices();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Invoices</h1>
        <Link
          href="/vahi/invoices/new"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          New invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <p className="rounded-xl border border-dashed bg-card/50 p-6 text-center text-sm text-muted-foreground">
          No invoices yet - create your first one.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {invoices.map((invoice) => (
            <li key={invoice.id}>
              <Link
                href={`/vahi/invoices/${invoice.id}`}
                className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-accent"
              >
                <div>
                  <p className="font-medium text-foreground">{invoice.invoiceNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {invoice.customer.name} ·{" "}
                    {invoice.issueDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
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
  );
}
