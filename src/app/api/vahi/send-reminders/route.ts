import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendInvoiceReminder } from "@/lib/vahi/send-invoice-reminder";

/**
 * Scans every account's overdue, unpaid invoices and emails a reminder —
 * meant to be triggered on a schedule (Hostinger cron job hitting this URL,
 * or a free external scheduler like cron-job.org) since this app has no
 * built-in cron of its own. Re-reminds at most once every 3 days per
 * invoice so a daily trigger doesn't spam the same customer.
 *
 * Gated by CRON_SECRET so this can't be triggered by anyone who finds the
 * URL — set it in .env.local / Hostinger env vars and pass it as
 * ?secret=... or an `Authorization: Bearer ...` header when scheduling.
 */
export async function GET(request: Request) {
  const configuredSecret = process.env.CRON_SECRET;
  if (!configuredSecret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured." }, { status: 500 });
  }

  const url = new URL(request.url);
  const provided =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? url.searchParams.get("secret");

  if (provided !== configuredSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const now = new Date();
  const reminderCooldown = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  const baseUrl = `${url.protocol}//${url.host}`;

  const overdue = await db.invoice.findMany({
    where: {
      status: "unpaid",
      dueDate: { lt: now },
      OR: [{ remindedAt: null }, { remindedAt: { lt: reminderCooldown } }],
    },
    include: { lineItems: true, customer: true, account: true },
  });

  let sent = 0;
  for (const invoice of overdue) {
    const ok = await sendInvoiceReminder(invoice, baseUrl);
    if (ok) {
      await db.invoice.update({ where: { id: invoice.id }, data: { remindedAt: now } });
      sent++;
    }
  }

  return NextResponse.json({ checked: overdue.length, sent });
}
