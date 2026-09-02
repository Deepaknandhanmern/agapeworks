import "server-only";
import { requireVahiAccount } from "@/lib/vahi/auth";
import { db } from "@/lib/db";
import { invoiceGrandTotal } from "@/lib/vahi/invoice-math";

export async function getVahiAccount() {
  const accountId = await requireVahiAccount();
  return db.billingAccount.findUniqueOrThrow({ where: { id: accountId } });
}

export async function getVahiDashboardStats() {
  const accountId = await requireVahiAccount();
  const invoices = await db.invoice.findMany({ where: { accountId }, include: { lineItems: true } });

  let paidTotal = 0;
  let unpaidTotal = 0;
  for (const invoice of invoices) {
    const total = invoiceGrandTotal(invoice.lineItems);
    if (invoice.status === "paid") paidTotal += total;
    else unpaidTotal += total;
  }

  return {
    invoiceCount: invoices.length,
    unpaidCount: invoices.filter((i) => i.status === "unpaid").length,
    paidTotal,
    unpaidTotal,
  };
}

export async function getVahiCustomers() {
  const accountId = await requireVahiAccount();
  return db.billingCustomer.findMany({ where: { accountId }, orderBy: { name: "asc" } });
}

export async function getVahiItems() {
  const accountId = await requireVahiAccount();
  return db.billingItem.findMany({ where: { accountId }, orderBy: { name: "asc" } });
}

export async function getVahiInvoices() {
  const accountId = await requireVahiAccount();
  return db.invoice.findMany({
    where: { accountId },
    include: { customer: true, lineItems: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getVahiInvoiceById(id: string) {
  const accountId = await requireVahiAccount();
  return db.invoice.findFirst({
    where: { id, accountId },
    include: { customer: true, lineItems: true, account: true },
  });
}

/** Public - gated only by the unguessable publicToken, no login. */
export async function getInvoiceByPublicToken(publicToken: string) {
  return db.invoice.findUnique({
    where: { publicToken },
    include: { customer: true, lineItems: true, account: true },
  });
}
