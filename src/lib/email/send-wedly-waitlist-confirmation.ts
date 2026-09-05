import "server-only";
import { Resend } from "resend";
import { emailLayout, escapeHtml } from "./layout";

/** Best-effort confirmation for a wedly.agapeworks.in waitlist signup. */
export async function sendWedlyWaitlistConfirmation(email: string, name?: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const resend = new Resend(apiKey);
    const greeting = name ? `Hi ${escapeHtml(name)},` : "Hi,";
    const bodyHtml = `
      <p style="margin:0 0 16px;font-size:15px;color:#111111;">${greeting}</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333333;">
        Thanks for your interest in Wedly - your wedding website, live photo wall, and guest
        experience, all in one place. We&rsquo;ll email you the moment early access opens.
      </p>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Agape Works <onboarding@resend.dev>",
      to: email,
      subject: "You're on the Wedly waitlist",
      html: emailLayout({
        preheader: "You're on the Wedly waitlist - we'll email you when early access opens.",
        bodyHtml,
      }),
      text: `${greeting}\n\nThanks for your interest in Wedly - your wedding website, live photo wall, and guest experience, all in one place. We'll email you the moment early access opens.`,
    });
  } catch {
    // Swallow - the signup is already saved; the confirmation is a nice-to-have.
  }
}
