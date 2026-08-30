// Pure calculation helpers — shared by the invoice creation form (live
// totals as the user types) and the server action that persists the final
// numbers, so the two can never drift apart.

export type InvoiceLine = { quantity: number; rate: number; taxRate: number };

export function lineSubtotal(line: InvoiceLine): number {
  return line.quantity * line.rate;
}

export function lineTax(line: InvoiceLine): number {
  return lineSubtotal(line) * (line.taxRate / 100);
}

export function lineTotal(line: InvoiceLine): number {
  return lineSubtotal(line) + lineTax(line);
}

export function invoiceSubtotal(lines: InvoiceLine[]): number {
  return lines.reduce((sum, l) => sum + lineSubtotal(l), 0);
}

export function invoiceTax(lines: InvoiceLine[]): number {
  return lines.reduce((sum, l) => sum + lineTax(l), 0);
}

export function invoiceGrandTotal(lines: InvoiceLine[]): number {
  return invoiceSubtotal(lines) + invoiceTax(lines);
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}
