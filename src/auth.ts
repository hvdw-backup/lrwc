import NextAuth, { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "../prisma/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Resend({
      from: "onboarding@resend.dev",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    // One month in seconds
    maxAge: 2629746,
  },
} satisfies NextAuthConfig);
