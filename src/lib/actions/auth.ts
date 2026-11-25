"use server";

import { signIn, signOut } from "@/auth";

/** Start the GitHub OAuth flow and land on the admin dashboard. */
export async function adminSignIn(): Promise<void> {
  await signIn("github", { redirectTo: "/admin/projects" });
}

/** Sign out of the admin area and return to the admin sign-in page. */
export async function adminSignOut(): Promise<void> {
  await signOut({ redirectTo: "/admin/signin" });
}
