import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Powers the footer's "Currently shipping" line. Fetched client-side after
 * mount rather than rendered in the (server) root layout, so adding it
 * doesn't force every page on the site into dynamic rendering for the sake
 * of one decorative line.
 */
export async function GET() {
  const latest = await db.project.findFirst({
    where: { category: "project" },
    orderBy: [{ updatedAt: "desc" }],
    select: { name: true },
  });

  if (!latest) return NextResponse.json({ name: null });

  return NextResponse.json(
    { name: latest.name },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } },
  );
}
