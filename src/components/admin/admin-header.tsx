import Link from "next/link";
import type { Session } from "next-auth";

import { adminSignOut } from "@/lib/actions/auth";

export function AdminHeader({ session }: { session: Session | null }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/admin/projects"
          className="font-heading text-xl font-semibold tracking-tight text-foreground"
        >
          Koushik C
        </Link>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.6875rem] uppercase text-muted-foreground">
            {session?.user?.name ?? "Admin"}
          </span>
          <form action={adminSignOut}>
            <button
              type="submit"
              className="h-11 rounded-md px-5 text-sm font-medium text-foreground ring-2 ring-transparent transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
