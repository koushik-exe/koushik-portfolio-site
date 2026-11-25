import type { Session } from "next-auth";

import { auth } from "@/auth";

/** True only for the account listed in `ADMIN_GITHUB_ID`. */
export function isAdmin(session: Session | null | undefined): boolean {
  const allowed = process.env.ADMIN_GITHUB_ID;
  return (
    allowed !== undefined &&
    session?.user?.id !== undefined &&
    String(session.user.id) === String(allowed)
  );
}

/**
 * Session check for admin Server Actions and data functions: it re-checks the
 * session itself, so route protection (proxy) is never the only gate.
 */
export async function requireAdmin(): Promise<Session> {
  const session = await auth();
  if (!session || !isAdmin(session)) {
    throw new Error("Admin session required.");
  }
  return session;
}
