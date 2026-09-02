import "server-only";
import { Resend } from "resend";
import { emailLayout, escapeHtml } from "./layout";

/**
 * Best-effort - mirrors send-update-notification.ts's contract, just
 * reversed direction (client → studio instead of studio → client). Nothing
 * else in this app emails the studio's own inbox; this is the first, so the
 * recipient is the one thing worth being able to override via env instead
 * of hardcoding.
 */
export async function sendCommentNotification(input: {
  projectName: string;
  authorName: string;
  message: string;
  dashboardUrl: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const resend = new Resend(apiKey);
    const bodyHtml = `
      <p style="margin:0 0 16px;font-size:15px;color:#111111;">New feedback on <strong>${escapeHtml(input.projectName)}</strong>:</p>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#333333;padding:14px 16px;background:#fafafa;border-radius:8px;border:1px solid #eeeeee;">
        <strong>${escapeHtml(input.authorName)}:</strong> ${escapeHtml(input.message)}
      </p>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Agape Works <onboarding@resend.dev>",
      to: process.env.STUDIO_NOTIFICATION_EMAIL || "studio@agapeworks.in",
      subject: `New feedback on ${input.projectName}`,
      html: emailLayout({
        preheader: `${input.authorName} left feedback on ${input.projectName}`,
        bodyHtml,
        ctaLabel: "View in dashboard",
        ctaUrl: input.dashboardUrl,
      }),
      text: `New feedback on ${input.projectName}:\n\n${input.authorName}: ${input.message}\n\nView it here: ${input.dashboardUrl}`,
    });
  } catch {
    // Swallow - the comment is already saved; the notification is a nice-to-have.
  }
}
