import "server-only";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * Saves an uploaded image to /public/uploads and returns its public URL path.
 *
 * This writes to local disk, which works for local dev and any host with a
 * persistent filesystem (e.g. a VPS). It will NOT work on serverless hosting
 * (Vercel's filesystem is read-only/ephemeral outside /tmp at runtime) - if
 * this ever deploys there, swap this function's body for an upload to
 * @vercel/blob (or S3/Cloudinary) and keep the same signature/return shape
 * so nothing else in the app needs to change.
 */
export async function saveUploadedImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Unsupported image type. Use JPEG, PNG, WebP, GIF, or AVIF.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("Image is too large (max 5MB).");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const extension = file.type.split("/")[1];
  const filename = `${randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/${filename}`;
}
