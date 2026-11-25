import { redirect } from "next/navigation";

import { adminSignIn } from "@/lib/actions/auth";
import { auth } from "@/auth";
import { isAdmin } from "@/lib/admin";

export const metadata = {
  title: "Sign in | Koushik C Admin",
  description: "Sign in to the Koushik C admin area with GitHub.",
  robots: { index: false, follow: false },
};

type PageProps = { searchParams: Promise<{ error?: string }> };

export default async function SignInPage({ searchParams }: PageProps) {
  const session = await auth();
  if (isAdmin(session)) {
    redirect("/admin/projects");
  }

  const { error } = await searchParams;
  const message =
    error === "AccessDenied"
      ? "That GitHub account is not allowed to sign in. Use the account that owns this site."
      : error
        ? "Sign-in failed. Please try again."
        : null;

  return (
    <main className="flex min-h-dvh items-center justify-center px-5 sm:px-8">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Sign in to the admin area
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in with GitHub. Only the account behind this site is allowed.
        </p>
        {message ? (
          <p role="alert" className="text-sm text-destructive">
            {message}
          </p>
        ) : null}
        <form action={adminSignIn}>
          <button
            type="submit"
            className="h-11 w-full rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sign in with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}
