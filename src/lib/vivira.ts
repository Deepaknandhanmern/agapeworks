import "server-only";
import { db } from "@/lib/db";
import { getViviraReleaseUrl } from "@/lib/vivira-storage";

// Fallback for before the first release is uploaded from the dashboard
// (src/app/dashboard/(app)/vivira) - served directly from this site
// (public/downloads/vivira.zip), not a redirect to the subdomain. That file
// isn't in the repo; drop a placeholder .zip in at that path if you want the
// download to work before anyone's uploaded a real release.
export const VIVIRA_DOWNLOAD_PATH = "/downloads/vivira.zip";

// The live download link for /products - always the most recently uploaded
// release's signed URL, or the static fallback path if none exists yet.
export async function getViviraDownloadHref(): Promise<string> {
  const latest = await db.viviraPluginRelease.findFirst({ orderBy: { uploadedAt: "desc" } });
  if (!latest) return VIVIRA_DOWNLOAD_PATH;

  const url = await getViviraReleaseUrl(latest.storagePath);
  return url ?? VIVIRA_DOWNLOAD_PATH;
}
