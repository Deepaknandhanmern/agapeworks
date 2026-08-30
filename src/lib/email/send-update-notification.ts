import "server-only";
import { Resend } from "resend";
import { emailLayout, escapeHtml } from "./layout";

/**
 * Best-effort — returns without throwing on any failure (missing/invalid
 * key, Resend error) so posting an update never fails because the email
 * didn't send. The update itself is already saved by the time this runs.
 */
export async function sendUpdateNotification(input: {
  clientEmail: string;
  clientName: string;
  projectName: string;
  updateTitle: string;
  statusUrl: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const resend = new Resend(apiKey);
    const bodyHtml = `
      <p style="margin:0 0 16px;font-size:15px;color:#111111;">Hi ${escapeHtml(input.clientName)},</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333333;">
        There's a new update on <strong>${escapeHtml(input.projectName)}</strong>:
      </p>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#333333;padding:14px 16px;background:#fafafa;border-radius:8px;border:1px solid #eeeeee;">
        ${escapeHtml(input.updateTitle)}
      </p>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Agape Works <onboarding@resend.dev>",
      to: input.clientEmail,
      subject: `New update on ${input.projectName}: ${input.updateTitle}`,
      html: emailLayout({
        preheader: `New update on ${input.projectName}: ${input.updateTitle}`,
        bodyHtml,
        ctaLabel: "View full status page",
        ctaUrl: input.statusUrl,
      }),
      text: `Hi ${input.clientName},\n\nThere's a new update on ${input.projectName}: "${input.updateTitle}".\n\nSee it here: ${input.statusUrl}\n\n— Agape Works`,
    });
  } catch {
    // Swallow — the update is already saved; email is a nice-to-have.
  }
}
