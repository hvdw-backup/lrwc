import NextAuth, { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "../prisma/db";
import nodemailer from "next-auth/providers/nodemailer";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    // customise the sign in email : https://authjs.dev/getting-started/providers/resend#customization
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "onboarding@resend.dev",
    }),

    nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    // One month in seconds
    maxAge: 2629746,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.about = user.about;
      }

      return token;
    },
    async session({ session, token, user }: any) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.about = token.about;

      return session;
    },
  },
} satisfies NextAuthConfig);
