import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Admin-only file storage (invoices, spec sheets, onboarding PDFs) for
 * client projects. The bucket is private — every download URL is signed
 * on demand and expires, never stored. SUPABASE_SECRET_KEY is a privileged
 * key; this module must never be imported by client components.
 */

const BUCKET = "client-files";
const SIGNED_URL_TTL_SECONDS = 60 * 30;

function getStorageClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function uploadClientFile(
  clientProjectId: string,
  file: File,
): Promise<{ storagePath: string } | { error: string }> {
  const client = getStorageClient();
  if (!client) return { error: "File storage isn't configured yet." };

  const storagePath = `${clientProjectId}/${Date.now()}-${file.name}`;
  const { error } = await client.storage
    .from(BUCKET)
    .upload(storagePath, file, { contentType: file.type || "application/octet-stream" });

  if (error) return { error: error.message };
  return { storagePath };
}

export async function deleteClientFile(storagePath: string): Promise<void> {
  const client = getStorageClient();
  if (!client) return;
  await client.storage.from(BUCKET).remove([storagePath]);
}

export async function getSignedFileUrl(storagePath: string): Promise<string | null> {
  const client = getStorageClient();
  if (!client) return null;

  const { data, error } = await client.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, SIGNED_URL_TTL_SECONDS);

  if (error) return null;
  return data.signedUrl;
}
