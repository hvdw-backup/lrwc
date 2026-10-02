import NextAuth, { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "../prisma/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    // TODO: customise the sign in email : https://authjs.dev/getting-started/providers/resend#customization
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "friend@hello.lrwc.co.uk",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 2629746, // One month in seconds
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.about = user.about;
        token.redeemed = user.redeemed;
      }

      return token;
    },
    async session({ session, token, user }: any) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.about = token.about;
      session.user.redeemed = token.redeemed;

      return session;
    },
  },
} satisfies NextAuthConfig);
