import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    name?: string | null;
    email?: string | null;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name ?? null;
        token.email = user.email ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.name) session.user.name = token.name;
      if (token.email) session.user.email = token.email;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
