import "server-only";
import { Resend } from "resend";

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
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Agape Works <onboarding@resend.dev>",
      to: input.clientEmail,
      subject: `New update on ${input.projectName}: ${input.updateTitle}`,
      text: `Hi ${input.clientName},\n\nThere's a new update on ${input.projectName}: "${input.updateTitle}".\n\nSee it here: ${input.statusUrl}\n\n— Agape Works`,
    });
  } catch {
    // Swallow — the update is already saved; email is a nice-to-have.
  }
}
