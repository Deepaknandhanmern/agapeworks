import "server-only";
import { Resend } from "resend";
import { emailLayout } from "./layout";

/**
 * Best-effort - returns without throwing on any failure (missing/invalid
 * key, Resend error), same shape as send-update-notification.ts.
 */
export async function sendClientLoginLink(input: { email: string; loginUrl: string }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const resend = new Resend(apiKey);
    const bodyHtml = `
      <p style="margin:0 0 16px;font-size:15px;color:#111111;">Hi,</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333333;">
        Use the button below to sign in and see all your projects with Agape Works. This link
        expires in 15 minutes and can only be used once.
      </p>
      <p style="margin:0;font-size:13px;line-height:1.6;color:#888888;">
        Didn't request this? You can safely ignore this email.
      </p>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Agape Works <onboarding@resend.dev>",
      to: input.email,
      subject: "Sign in to Agape Works",
      html: emailLayout({
        preheader: "Your sign-in link for Agape Works",
        bodyHtml,
        ctaLabel: "Sign in",
        ctaUrl: input.loginUrl,
      }),
      text: `Use this link to sign in to Agape Works (expires in 15 minutes):\n\n${input.loginUrl}\n\nDidn't request this? You can safely ignore this email.\n\n - Agape Works`,
    });
  } catch {
    // Swallow - never let email delivery break the request-link flow.
  }
}
