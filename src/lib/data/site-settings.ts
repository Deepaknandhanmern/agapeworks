import { db } from "@/lib/db";
import type { AvailabilityStatus } from "@/lib/availability";

const AVAILABILITY_KEY = "availability_status";

/** Public read - no auth needed, the homepage hero calls this directly. */
export async function getAvailabilityStatus(): Promise<AvailabilityStatus> {
  const row = await db.siteSetting.findUnique({ where: { key: AVAILABILITY_KEY } });
  const value = row?.value;
  return value === "limited" || value === "booked" ? value : "open";
}
