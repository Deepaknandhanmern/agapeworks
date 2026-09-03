import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Storage for uploaded Vivira plugin .zip releases, uploaded from the admin
 * dashboard (src/app/dashboard/(app)/vivira). Mirrors src/lib/storage.ts's
 * client-files pattern exactly, but its own bucket - private, signed URLs
 * generated on demand, never stored. Requires a "vivira-releases" bucket to
 * already exist in Supabase (created manually, same as client-files was).
 */

const BUCKET = "vivira-releases";
const SIGNED_URL_TTL_SECONDS = 60 * 30;

function getStorageClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function uploadViviraRelease(
  file: File,
): Promise<{ storagePath: string } | { error: string }> {
  const client = getStorageClient();
  if (!client) return { error: "File storage isn't configured yet." };

  const storagePath = `${Date.now()}-${file.name}`;
  const { error } = await client.storage
    .from(BUCKET)
    .upload(storagePath, file, { contentType: file.type || "application/zip" });

  if (error) return { error: error.message };
  return { storagePath };
}

export async function getViviraReleaseUrl(storagePath: string): Promise<string | null> {
  const client = getStorageClient();
  if (!client) return null;

  const { data, error } = await client.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, SIGNED_URL_TTL_SECONDS);

  if (error) return null;
  return data.signedUrl;
}
