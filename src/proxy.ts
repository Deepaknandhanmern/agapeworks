import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/session-token";
import { VAHI_SESSION_COOKIE, verifyVahiSessionToken } from "@/lib/vahi/session-token";
import { CLIENT_SESSION_COOKIE, verifyClientSessionToken } from "@/lib/client-portal/session-token";

// vivira.agapeworks.in and wedly.agapeworks.in share this same app/deployment
// (same Passenger app root as agapeworks.in - see each subdomain's own
// .htaccess) rather than being a separate site, so each one's root path is
// rewritten to its real route here instead of showing the main Agape Works
// homepage. The URL bar stays on the subdomain since this is a rewrite, not
// a redirect.
const VIVIRA_HOST = "vivira.agapeworks.in";
const WEDLY_HOST = "wedly.agapeworks.in";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") ?? "";
  const secret = process.env.SESSION_SECRET;

  if (host === VIVIRA_HOST || host.startsWith(`${VIVIRA_HOST}:`)) {
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/products", request.url));
    }
  }

  if (host === WEDLY_HOST || host.startsWith(`${WEDLY_HOST}:`)) {
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/wedly", request.url));
    }
  }

  // Maintenance mode - toggled by the MAINTENANCE_MODE env var (no redeploy
  // needed, just flip it and restart the app). Excluded from the redirect:
  // /maintenance itself (would otherwise loop), /dashboard (so the owner can
  // keep working and switch this back off), every /api/* route (contact
  // form, concierge chat, Vahi's cron reminders, etc. must keep functioning
  // even with the public pages down), and Next's own internal asset paths.
  if (
    process.env.MAINTENANCE_MODE === "true" &&
    pathname !== "/maintenance" &&
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    pathname !== "/favicon.ico"
  ) {
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

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

  if (pathname.startsWith("/client")) {
    if (pathname === "/client/verify") {
      return NextResponse.next();
    }

    const token = request.cookies.get(CLIENT_SESSION_COOKIE)?.value;
    if (!secret || !verifyClientSessionToken(token, secret)) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (pathname === "/dashboard/login" || pathname === "/dashboard/login/verify") {
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

  return NextResponse.next();
}

export const config = {
  // Broadened from just /dashboard and /vahi so maintenance mode can cover
  // the whole site - excludes Next's internal asset paths, which never need
  // auth or maintenance handling.
  matcher: ["/((?!_next/static|_next/image).*)"],
};
