// import type {NextAuthConfig} from "next-auth";
// https://nextjs.org/learn/dashboard-app/adding-authentication
// import bcrypt from "bcryptjs";

import { AuthOptions } from "next-auth";

// import { getUserForSignIn } from "@/app/lib/getUserForSignIn";
// import Credentials from "next-auth/providers/credentials";
// import { NextAuthOptions } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }: any) {
      console.log(auth, "auth");
      const isLoggedIn = !!auth?.user;
      console.log(isLoggedIn, "islogged in");
      // protected paths
      const isOnMessageboard = nextUrl.pathname === "/message-board";
      const isOnApprovedUsers = nextUrl.pathname === "/approve-user";
      // logged out users only
      const isOnSignIn = nextUrl.pathname === "/sign-in";
      const isOnSignUp = nextUrl.pathname === "/sign-up";

      if (isLoggedIn) {
        if (isOnSignIn || isOnSignUp) {
          return Response.redirect(new URL("/message-board", nextUrl));
        }
        return true;
      }

      if (!isLoggedIn) {
        if (isOnMessageboard || isOnApprovedUsers) {
          return false;
        }
        return true;
      }
    },
  },
  // async jwt({ token, user }: any) {
  //   if (user) {
  //     token.username = user.username;
  //     token.id = user.id;
  //   }

  //   return token;
  // },
  // async session({ session, token, user }: any) {
  //   session.user.username = token.username;

  //   return session;
  // },
  // secret: process.env.NEXTAUTH_SECRET,
  // redirect({}) {
  //   return "message-board";
  // },
  providers: [], // Add providers with an empty array for now
} satisfies AuthOptions;
