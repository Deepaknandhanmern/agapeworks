import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { db } from "@/lib/db";

// Not covered by proxy.ts (only /dashboard/* is) - this route isn't under
// that path, so it's the only gate; check directly rather than requireAuth(),
// which throws (fine inside a Server Action, but turns into an ugly 500 here).
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const signups = await db.wedlyWaitlistSignup.findMany({ orderBy: { createdAt: "desc" } });
  const rows = [
    "email,name,signed_up_at",
    ...signups.map((s) => `${s.email},${s.name ?? ""},${s.createdAt.toISOString()}`),
  ];

  return new NextResponse(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=wedly-waitlist.csv",
    },
  });
}
