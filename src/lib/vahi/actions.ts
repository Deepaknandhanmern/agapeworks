"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  createVahiSession,
  destroyVahiSession,
  requireVahiAccount,
  verifyVahiLogin,
} from "@/lib/vahi/auth";
import { sendInvoiceReminder } from "@/lib/vahi/send-invoice-reminder";

export type VahiActionState = { error?: string } | undefined;

/* ---------------------------------- Auth ---------------------------------- */

export async function vahiLoginAction(_prevState: VahiActionState, formData: FormData): Promise<VahiActionState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const next = formData.get("next");

  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return { error: "Enter your email and password." };
  }

  const accountId = await verifyVahiLogin(email, password);
  if (!accountId) return { error: "Incorrect email or password." };

  await createVahiSession(accountId);
  redirect(typeof next === "string" && next.startsWith("/vahi") ? next : "/vahi");
}

export async function vahiLogoutAction(): Promise<void> {
  await destroyVahiSession();
  redirect("/vahi/login");
}

/* -------------------------------- Customers -------------------------------- */

const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  email: z.union([z.email(), z.literal("")]).optional(),
  address: z.string().optional(),
});

export async function createCustomerAction(_prevState: VahiActionState, formData: FormData): Promise<VahiActionState> {
  const accountId = await requireVahiAccount();

  const parsed = customerSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone") || undefined,
    email: formData.get("email") || undefined,
    address: formData.get("address") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };

  await db.billingCustomer.create({ data: { accountId, ...parsed.data } });
  revalidatePath("/vahi/customers");
}

/* ---------------------------------- Items ---------------------------------- */

const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rate: z.coerce.number().positive("Rate must be greater than 0"),
  taxRate: z.coerce.number().min(0).max(100),
});

export async function createItemAction(_prevState: VahiActionState, formData: FormData): Promise<VahiActionState> {
  const accountId = await requireVahiAccount();

  const parsed = itemSchema.safeParse({
    name: formData.get("name"),
    rate: formData.get("rate"),
    taxRate: formData.get("taxRate") || 18,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };

  await db.billingItem.create({ data: { accountId, ...parsed.data } });
  revalidatePath("/vahi/items");
}

/* -------------------------------- Invoices -------------------------------- */

const invoiceLineSchema = z.object({
  name: z.string().min(1),
  quantity: z.coerce.number().positive(),
  rate: z.coerce.number().nonnegative(),
  taxRate: z.coerce.number().min(0).max(100),
});

const invoiceSchema = z.object({
  customerId: z.string().min(1, "Select a customer"),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  lines: z.array(invoiceLineSchema).min(1, "Add at least one line item"),
});

export async function createInvoiceAction(_prevState: VahiActionState, formData: FormData): Promise<VahiActionState> {
  const accountId = await requireVahiAccount();

  let lines: unknown;
  try {
    lines = JSON.parse(String(formData.get("lines") ?? "[]"));
  } catch {
    return { error: "Invalid line items." };
  }

  const parsed = invoiceSchema.safeParse({
    customerId: formData.get("customerId"),
    dueDate: formData.get("dueDate") || undefined,
    notes: formData.get("notes") || undefined,
    lines,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };

  const invoiceCount = await db.invoice.count({ where: { accountId } });
  const invoiceNumber = `INV-${String(invoiceCount + 1).padStart(4, "0")}`;

  const invoice = await db.invoice.create({
    data: {
      accountId,
      customerId: parsed.data.customerId,
      invoiceNumber,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
      notes: parsed.data.notes,
      lineItems: { create: parsed.data.lines },
    },
  });

  revalidatePath("/vahi/invoices");
  revalidatePath("/vahi");
  redirect(`/vahi/invoices/${invoice.id}`);
}

export async function setInvoiceStatusAction(id: string, status: "paid" | "unpaid"): Promise<void> {
  const accountId = await requireVahiAccount();
  await db.invoice.updateMany({ where: { id, accountId }, data: { status } });
  revalidatePath(`/vahi/invoices/${id}`);
  revalidatePath("/vahi/invoices");
  revalidatePath("/vahi");
}

export async function sendReminderAction(id: string): Promise<{ error?: string }> {
  const accountId = await requireVahiAccount();
  const invoice = await db.invoice.findFirst({
    where: { id, accountId },
    include: { lineItems: true, customer: true, account: true },
  });
  if (!invoice) return { error: "Invoice not found." };
  if (!invoice.customer.email) return { error: "This customer has no email on file." };

  const h = await headers();
  const host = h.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";

  const sent = await sendInvoiceReminder(invoice, `${protocol}://${host}`);
  if (!sent) return { error: "Couldn't send the reminder - check your Resend setup." };

  await db.invoice.update({ where: { id }, data: { remindedAt: new Date() } });
  revalidatePath(`/vahi/invoices/${id}`);
  return {};
}
