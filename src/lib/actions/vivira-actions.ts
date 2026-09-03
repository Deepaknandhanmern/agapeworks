"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploadViviraRelease } from "@/lib/vivira-storage";

export async function uploadViviraReleaseAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  await requireAuth();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose a file to upload." };
  }
  if (!file.name.toLowerCase().endsWith(".zip")) {
    return { ok: false, error: "The Vivira plugin release must be a .zip file." };
  }

  const uploaded = await uploadViviraRelease(file);
  if ("error" in uploaded) {
    return { ok: false, error: uploaded.error };
  }

  await db.viviraPluginRelease.create({
    data: {
      fileName: file.name,
      storagePath: uploaded.storagePath,
      sizeBytes: file.size,
    },
  });

  // Also revalidate /products so the live download link picks up the new
  // release immediately, without waiting for a redeploy.
  revalidatePath("/dashboard/vivira");
  revalidatePath("/products");
  return { ok: true };
}

export async function deleteViviraDownloadLeadAction(id: string): Promise<void> {
  await requireAuth();
  await db.viviraDownloadLead.delete({ where: { id } }).catch(() => null);
  revalidatePath("/dashboard/vivira");
}
