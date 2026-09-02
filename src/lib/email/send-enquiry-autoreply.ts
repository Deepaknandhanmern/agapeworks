import "server-only";
import { Resend } from "resend";
import { emailLayout, escapeHtml } from "./layout";

/**
 * Instant "we got your message" reply sent when a contact/scope enquiry is
 * submitted - separate from the admin-facing dashboard notification. Same
 * best-effort contract as sendUpdateNotification: never throws, so a
 * missing key or Resend outage never breaks the enquiry submission itself.
 */
export async function sendEnquiryAutoReply(input: {
  name: string;
  email: string;
  service: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const resend = new Resend(apiKey);
    const bodyHtml = `
      <p style="margin:0 0 16px;font-size:15px;color:#111111;">Hi ${escapeHtml(input.name)},</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333333;">
        Thanks for reaching out about <strong>${escapeHtml(input.service)}</strong> - we've got your message,
        and someone from our team will get back to you within 1 business day.
      </p>
      <p style="margin:0;font-size:15px;line-height:1.6;color:#333333;">
        In the meantime, feel free to take a look at some of our recent work.
      </p>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Agape Works <onboarding@resend.dev>",
      to: input.email,
      subject: "We've got your message - Agape Works",
      html: emailLayout({
        preheader: "Thanks for reaching out - we'll be in touch within 1 business day.",
        bodyHtml,
        ctaLabel: "View our work",
        ctaUrl: "https://agapeworks.in/portfolio",
      }),
      text: `Hi ${input.name},\n\nThanks for reaching out about ${input.service} - we've got your message, and someone from our team will get back to you within 1 business day.\n\n - Agape Works`,
    });
  } catch {
    // Swallow - the enquiry is already saved; the auto-reply is a nice-to-have.
  }
}
