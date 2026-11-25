import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";
import { isAdmin } from "@/lib/admin";

/**
 * Optimistic protection for the admin area. Next 16 uses `proxy.ts`
 * (`middleware.ts` is deprecated). It runs before routes render, so a
 * logged-out visitor of `/admin/*` is redirected to the sign-in page.
 * Security still lives in `auth()` calls inside Server Actions and data
 * functions — never rely on this alone.
 */
export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith("/admin") || pathname === "/admin/signin") {
    return NextResponse.next();
  }
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.redirect(new URL("/admin/signin", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
