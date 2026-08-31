import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyMagicLinkToken } from "@/lib/client-portal/session-token";
import { createClientSession } from "@/lib/client-portal/auth";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? undefined;
  const secret = process.env.SESSION_SECRET;
  const email = secret ? verifyMagicLinkToken(token, secret) : null;

  if (!email) {
    return NextResponse.redirect(new URL("/signin?error=expired", request.url));
  }

  await createClientSession(email);
  return NextResponse.redirect(new URL("/client", request.url));
}
