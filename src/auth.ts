import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

/**
 * Auth.js (v5, `next-auth@beta`). GitHub OAuth with an allow-list on Koushik's
 * own GitHub id (`ADMIN_GITHUB_ID`). Sessions use the default JWT strategy and
 * no database adapter is configured.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  // The site deploys behind Vercel's trusted proxy; this also lets a local
  // `next start` smoke test accept http://localhost.
  trustHost: true,
  providers: [GitHub],
  pages: {
    signIn: "/admin/signin",
    error: "/admin/signin",
  },
  callbacks: {
    // Allow-list: a GitHub account that is not the admin's is rejected.
    async signIn({ account, profile, user }) {
      const allowed = process.env.ADMIN_GITHUB_ID;
      const id = account?.providerAccountId ?? String(profile?.id ?? user?.id ?? "");
      return allowed !== undefined && id === String(allowed);
    },
    // Put the GitHub id in the JWT so admin checks can read it later.
    async jwt({ token, account }) {
      if (account?.providerAccountId) {
        token.githubId = account.providerAccountId;
      }
      return token;
    },
    // Expose the id on the session user.
    async session({ session, token }) {
      const githubId = typeof token.githubId === "string" ? token.githubId : undefined;
      return { ...session, user: { ...session.user, id: githubId } };
    },
  },
});
