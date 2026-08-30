import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/session-token";
import { VAHI_SESSION_COOKIE, verifyVahiSessionToken } from "@/lib/vahi/session-token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secret = process.env.SESSION_SECRET;

  if (pathname.startsWith("/vahi")) {
    if (pathname === "/vahi/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get(VAHI_SESSION_COOKIE)?.value;
    if (!secret || !verifyVahiSessionToken(token, secret)) {
      const loginUrl = new URL("/vahi/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname === "/dashboard/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!secret || !isValidSessionToken(token, secret)) {
    const loginUrl = new URL("/dashboard/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/vahi/:path*"],
};
