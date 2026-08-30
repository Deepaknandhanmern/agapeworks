import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getVahiInvoiceById } from "@/lib/vahi/data";
import { lineTotal, invoiceSubtotal, invoiceTax, invoiceGrandTotal, formatINR } from "@/lib/vahi/invoice-math";
import { InvoiceStatusToggle, SendReminderButton, ShareLinks } from "./invoice-detail";

export default async function VahiInvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = await getVahiInvoiceById(id);
  if (!invoice) notFound();

  const h = await headers();
  const host = h.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  const publicUrl = `${protocol}://${host}/invoice/${invoice.publicToken}`;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-1 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-foreground">{invoice.invoiceNumber}</h1>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              invoice.status === "paid" ? "bg-[#0ca30c]/10 text-[#006300]" : "bg-amber-500/10 text-amber-600"
            }`}
          >
            {invoice.status}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {invoice.customer.name} · issued{" "}
          {invoice.issueDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start gap-2">
          <InvoiceStatusToggle id={invoice.id} status={invoice.status} />
          {invoice.status === "unpaid" && <SendReminderButton id={invoice.id} hasEmail={!!invoice.customer.email} />}
        </div>
        {invoice.remindedAt && (
          <p className="text-xs text-muted-foreground">
            Last reminder sent{" "}
            {invoice.remindedAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}
      </div>

      <div className="rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="p-3 font-medium">Item</th>
              <th className="p-3 font-medium">Qty</th>
              <th className="p-3 font-medium">Rate</th>
              <th className="p-3 font-medium">GST</th>
              <th className="p-3 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((line) => (
              <tr key={line.id} className="border-b last:border-0">
                <td className="p-3 text-foreground">{line.name}</td>
                <td className="p-3 text-muted-foreground">{line.quantity}</td>
                <td className="p-3 text-muted-foreground">{formatINR(line.rate)}</td>
                <td className="p-3 text-muted-foreground">{line.taxRate}%</td>
                <td className="p-3 text-right text-foreground">{formatINR(lineTotal(line))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col gap-1 border-t p-4 text-sm sm:ml-auto sm:w-64">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatINR(invoiceSubtotal(invoice.lineItems))}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>GST</span>
            <span>{formatINR(invoiceTax(invoice.lineItems))}</span>
          </div>
          <div className="flex justify-between border-t pt-1.5 font-semibold text-foreground">
            <span>Total</span>
            <span>{formatINR(invoiceGrandTotal(invoice.lineItems))}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-foreground">Share with customer</h2>
        <ShareLinks publicUrl={publicUrl} customerPhone={invoice.customer.phone} />
      </div>
    </div>
  );
}
