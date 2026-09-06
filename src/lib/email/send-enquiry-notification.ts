import "server-only";
import { Resend } from "resend";
import { emailLayout, escapeHtml } from "./layout";

/**
 * Admin-facing "you have a new enquiry" email - the counterpart to
 * sendEnquiryAutoReply, which emails the person who submitted. Without this,
 * a new enquiry is only visible by opening the dashboard.
 *
 * Same best-effort contract as the rest of this directory: never throws, so
 * a missing key or a Resend outage can't break the enquiry submission.
 *
 * Sends to ADMIN_NOTIFY_EMAIL, falling back to the studio address already
 * published on the contact page and in the Organization schema.
 */
export async function sendEnquiryNotification(input: {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  service: string;
  timeline: string;
  source?: string | null;
  message: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const to = process.env.ADMIN_NOTIFY_EMAIL || "studio@agapeworks.in";

  try {
    const resend = new Resend(apiKey);
    const row = (label: string, value: string) => `
      <p style="margin:0 0 10px;font-size:14px;line-height:1.5;color:#333333;">
        <strong style="color:#111111;">${escapeHtml(label)}:</strong> ${escapeHtml(value)}
      </p>
    `;

    const bodyHtml = `
      <p style="margin:0 0 16px;font-size:15px;color:#111111;">
        New enquiry from <strong>${escapeHtml(input.name)}</strong>.
      </p>
      ${row("Email", input.email)}
      ${input.company ? row("Company", input.company) : ""}
      ${row("Service", input.service)}
      ${row("Timeline", input.timeline)}
      ${input.source ? row("Heard via", input.source) : ""}
      <p style="margin:16px 0 6px;font-size:14px;color:#111111;"><strong>Message</strong></p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#333333;white-space:pre-wrap;">${escapeHtml(
        input.message,
      )}</p>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Agape Works <onboarding@resend.dev>",
      to,
      // Replying straight from the inbox reaches the enquirer, not the studio.
      replyTo: input.email,
      subject: `New enquiry: ${input.name} - ${input.service}`,
      html: emailLayout({
        preheader: `${input.name} enquired about ${input.service}.`,
        bodyHtml,
        ctaLabel: "Open in dashboard",
        ctaUrl: "https://agapeworks.in/dashboard/enquiries",
      }),
    });
  } catch {
    // Best-effort: the enquiry is already saved, so a failed notification
    // must not surface to the visitor.
  }
}
