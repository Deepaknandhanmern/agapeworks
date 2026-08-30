import "server-only";
import { Resend } from "resend";
import { invoiceGrandTotal, formatINR } from "@/lib/vahi/invoice-math";
import type { Invoice, InvoiceLineItem, BillingCustomer, BillingAccount } from "@/generated/prisma/client";

/**
 * Branded as the merchant's own business, not Agape Works or "Vahi" — the
 * customer receiving this has a relationship with the merchant, not with
 * the tool they bill through. A small "Sent via Vahi" footer line is the
 * only Vahi branding, same as how e.g. Mailchimp credits itself quietly at
 * the bottom of a sender's newsletter.
 *
 * Best-effort — returns false without throwing on any failure so a missing
 * key or Resend outage never breaks the caller (manual button or cron job).
 */
export async function sendInvoiceReminder(
  invoice: Invoice & { lineItems: InvoiceLineItem[]; customer: BillingCustomer; account: BillingAccount },
  baseUrl: string,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !invoice.customer.email) return false;

  const total = formatINR(invoiceGrandTotal(invoice.lineItems));
  const dueText = invoice.dueDate
    ? `was due ${invoice.dueDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
    : "is now overdue";
  const publicUrl = `${baseUrl}/invoice/${invoice.publicToken}`;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Agape Works <onboarding@resend.dev>",
      to: invoice.customer.email,
      subject: `Payment reminder — Invoice ${invoice.invoiceNumber} from ${invoice.account.businessName}`,
      html: `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;">
<tr><td style="padding:24px 32px;border-bottom:1px solid #eeeeee;">
<span style="font-size:17px;font-weight:700;color:#000000;">${invoice.account.businessName}</span>
</td></tr>
<tr><td style="padding:32px;">
<p style="margin:0 0 16px;font-size:15px;color:#111111;">Hi ${invoice.customer.name},</p>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333333;">
This is a reminder that invoice <strong>${invoice.invoiceNumber}</strong> for <strong>${total}</strong> ${dueText} and is still unpaid.
</p>
<a href="${publicUrl}" style="display:inline-block;background:#000000;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:8px;">View invoice</a>
</td></tr>
<tr><td style="padding:18px 32px;background:#fafafa;border-top:1px solid #eeeeee;">
<p style="margin:0;font-size:12px;color:#888888;">Sent via Vahi on behalf of ${invoice.account.businessName}</p>
</td></tr>
</table></td></tr></table>
</body></html>`,
      text: `Hi ${invoice.customer.name},\n\nThis is a reminder that invoice ${invoice.invoiceNumber} for ${total} ${dueText} and is still unpaid.\n\nView it here: ${publicUrl}\n\n— ${invoice.account.businessName}`,
    });
    return true;
  } catch {
    return false;
  }
}
