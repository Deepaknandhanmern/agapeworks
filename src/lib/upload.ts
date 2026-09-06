import "server-only";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import sharp from "sharp";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// Uploads were previously written at whatever resolution came off the
// camera/screenshot, so a 4000px blog cover shipped to visitors at 4000px.
// 2000px wide is well past what any layout here renders at (the widest
// container is max-w-6xl) while still leaving headroom for retina.
const MAX_WIDTH = 2000;
const WEBP_QUALITY = 82;

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

  const buffer = Buffer.from(await file.arrayBuffer());

  // GIFs are passed through untouched - re-encoding one to WebP here would
  // either drop the animation or need a different sharp path for little gain.
  if (file.type === "image/gif") {
    const filename = `${randomUUID()}.gif`;
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
    return `/uploads/${filename}`;
  }

  const filename = `${randomUUID()}.webp`;
  try {
    const optimized = await sharp(buffer)
      .rotate() // honour EXIF orientation before stripping metadata
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    await writeFile(path.join(UPLOAD_DIR, filename), optimized);
    return `/uploads/${filename}`;
  } catch {
    // Corrupt or unusual image sharp can't decode - fall back to storing the
    // original rather than failing the whole upload.
    const fallbackName = `${randomUUID()}.${file.type.split("/")[1]}`;
    await writeFile(path.join(UPLOAD_DIR, fallbackName), buffer);
    return `/uploads/${fallbackName}`;
  }
}
