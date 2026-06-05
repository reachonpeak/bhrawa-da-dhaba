import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "dhaba_admin";

/**
 * Optimistic auth pre-filter for /admin pages.
 *
 * This only checks for the PRESENCE of the session cookie — it does NOT verify
 * it (firebase-admin can't run in the proxy runtime). Authoritative verification
 * happens in `isAdminAuthenticated()` (src/lib/auth.ts), called by the admin
 * layout/pages and every admin API route. This proxy just short-circuits the
 * common "not logged in at all" case before any server render.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (!request.cookies.get(ADMIN_COOKIE)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
