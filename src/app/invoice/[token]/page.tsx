import { notFound } from "next/navigation";
import { getInvoiceByPublicToken } from "@/lib/vahi/data";
import { lineTotal, invoiceSubtotal, invoiceTax, invoiceGrandTotal, formatINR } from "@/lib/vahi/invoice-math";
import { PrintButton } from "./print-button";

export default async function PublicInvoicePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invoice = await getInvoiceByPublicToken(token);
  if (!invoice) notFound();

  return (
    <div className="min-h-screen bg-muted/20 py-10 print:bg-white print:py-0">
      <div className="mx-auto w-full max-w-2xl rounded-xl border bg-white p-8 shadow-sm print:border-0 print:shadow-none">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-black">{invoice.account.businessName}</h1>
            {invoice.account.gstNumber && <p className="text-xs text-neutral-500">GSTIN: {invoice.account.gstNumber}</p>}
            {invoice.account.address && <p className="text-xs text-neutral-500">{invoice.account.address}</p>}
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-black">{invoice.invoiceNumber}</p>
            <p className="text-xs text-neutral-500">
              Issued {invoice.issueDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
            {invoice.dueDate && (
              <p className="text-xs text-neutral-500">
                Due {invoice.dueDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            )}
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                invoice.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
              }`}
            >
              {invoice.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Billed to</p>
          <p className="font-medium text-black">{invoice.customer.name}</p>
          {invoice.customer.address && <p className="text-sm text-neutral-500">{invoice.customer.address}</p>}
          {invoice.customer.phone && <p className="text-sm text-neutral-500">{invoice.customer.phone}</p>}
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-neutral-400">
              <th className="pb-2 font-medium">Item</th>
              <th className="pb-2 font-medium">Qty</th>
              <th className="pb-2 font-medium">Rate</th>
              <th className="pb-2 font-medium">GST</th>
              <th className="pb-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((line) => (
              <tr key={line.id} className="border-b last:border-0">
                <td className="py-2 text-black">{line.name}</td>
                <td className="py-2 text-neutral-500">{line.quantity}</td>
                <td className="py-2 text-neutral-500">{formatINR(line.rate)}</td>
                <td className="py-2 text-neutral-500">{line.taxRate}%</td>
                <td className="py-2 text-right text-black">{formatINR(lineTotal(line))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ml-auto mt-4 flex w-56 flex-col gap-1 text-sm">
          <div className="flex justify-between text-neutral-500">
            <span>Subtotal</span>
            <span>{formatINR(invoiceSubtotal(invoice.lineItems))}</span>
          </div>
          <div className="flex justify-between text-neutral-500">
            <span>GST</span>
            <span>{formatINR(invoiceTax(invoice.lineItems))}</span>
          </div>
          <div className="flex justify-between border-t pt-1.5 font-semibold text-black">
            <span>Total</span>
            <span>{formatINR(invoiceGrandTotal(invoice.lineItems))}</span>
          </div>
        </div>

        {invoice.notes && (
          <p className="mt-6 whitespace-pre-wrap border-t pt-4 text-sm text-neutral-500">{invoice.notes}</p>
        )}

        <div className="mt-8 print:hidden">
          <PrintButton />
        </div>
      </div>
    </div>
  );
}
