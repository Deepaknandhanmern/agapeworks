"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { createMagicLinkToken } from "./session-token";
import { createClientSession, destroyClientSession, normalizeEmail, requireClientEmail } from "./auth";
import {
  hasClientProjectForEmail,
  addCommentForClientOwnedProject,
  addFileForClientOwnedProject,
} from "@/lib/data/client-portal";
import { sendClientLoginLink } from "@/lib/email/send-client-login-link";
import { sendCommentNotification } from "@/lib/email/send-comment-notification";
import { uploadClientFile } from "@/lib/storage";

export type RequestLoginLinkState = { error?: string; success?: string } | undefined;

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET environment variable is not set.");
  return secret;
}

async function getSiteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

// Same generic response is returned on every path (match or no match) so
// this form can never be used to confirm/deny whether an email has a
// project on file.
const GENERIC_MESSAGE = "If that email has a project with us, we've sent a sign-in link — check your inbox.";

// In-memory per-email send cooldown. This is the one public form on the site
// that emails a third party who never opted in (every other public form —
// contact, scope estimate — emails *this business's own* inbox), so a bare,
// unthrottled "send email" button isn't acceptable even though nothing else
// in this app has formal rate-limiting. A persistent Node process is enough
// for this; it resets on deploy, which is fine for abuse prevention, not
// correctness.
const lastSentAt = new Map<string, number>();
const COOLDOWN_MS = 60_000;

const emailSchema = z.email("Enter a valid email address");

export async function requestLoginLinkAction(
  _prevState: RequestLoginLinkState,
  formData: FormData,
): Promise<RequestLoginLinkState> {
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Enter a valid email address." };
  }

  const email = normalizeEmail(parsed.data);
  const lastSent = lastSentAt.get(email);
  if (lastSent && Date.now() - lastSent < COOLDOWN_MS) {
    return { success: GENERIC_MESSAGE };
  }

  const hasProject = await hasClientProjectForEmail(email);
  if (hasProject) {
    lastSentAt.set(email, Date.now());
    const origin = await getSiteOrigin();
    const token = createMagicLinkToken(email, getSessionSecret());
    await sendClientLoginLink({ email, loginUrl: `${origin}/client/verify?token=${token}` });
  }

  return { success: GENERIC_MESSAGE };
}

export async function logoutClientAction(): Promise<void> {
  await destroyClientSession();
}

const commentSchema = z.object({
  authorName: z.string().min(1, "Enter your name").max(100),
  message: z.string().min(1, "Enter a message").max(2000),
});

export async function addClientCommentAction(
  id: string,
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const email = await requireClientEmail();

  const parsed = commentSchema.safeParse({
    authorName: formData.get("authorName"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const result = await addCommentForClientOwnedProject(id, email, parsed.data.authorName, parsed.data.message);
  if (!result) {
    return { ok: false, error: "Project not found." };
  }

  const origin = await getSiteOrigin();
  await sendCommentNotification({
    projectName: result.projectName,
    authorName: parsed.data.authorName,
    message: parsed.data.message,
    dashboardUrl: `${origin}/dashboard/client-projects/${result.clientProjectId}`,
  });

  return { ok: true };
}

export async function uploadClientFileAction(
  id: string,
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const email = await requireClientEmail();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose a file to upload." };
  }

  const uploaded = await uploadClientFile(id, file);
  if ("error" in uploaded) {
    return { ok: false, error: uploaded.error };
  }

  const result = await addFileForClientOwnedProject(id, email, {
    fileName: file.name,
    storagePath: uploaded.storagePath,
    sizeBytes: file.size,
    contentType: file.type || "application/octet-stream",
  });
  if (!result) {
    return { ok: false, error: "Project not found." };
  }

  return { ok: true };
}
