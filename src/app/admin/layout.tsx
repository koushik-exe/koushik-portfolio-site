import type { Metadata } from "next";

import "../globals.css";
import { auth } from "@/auth";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNav } from "@/components/admin/admin-nav";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { inter, jetbrainsMono, sourceSerif } from "@/lib/fonts";
import { isAdmin } from "@/lib/admin";

/**
 * Phase 7: the admin tree has its own root layout (multiple root layouts), so
 * no public header, footer or smooth scroll applies here. Signed-out visitors
 * only see the sign-in page inside this layout; the proxy redirects every
 * other /admin route to /admin/signin.
 */

export const metadata: Metadata = {
  title: "Admin | Koushik C",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const signedIn = isAdmin(session);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          {signedIn ? (
            <>
              <AdminHeader session={session} />
              <AdminNav />
              <main
                id="main"
                tabIndex={-1}
                className="flex flex-1 flex-col px-5 py-8 outline-none sm:px-8 lg:px-12"
              >
                {children}
              </main>
            </>
          ) : (
            children
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
