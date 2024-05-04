import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// https://nextjs.org/learn/dashboard-app/adding-authentication

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log(auth, "auth");
      console.log("hi");

      const isLoggedIn = !!auth?.user;
      const isOnMessageboard = nextUrl.pathname === "/message-board";
      console.log("isOnMessageboard", isOnMessageboard);

      if (isOnMessageboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/message-board", nextUrl));
      }
      return true;
    },
  },
  // redirect({}) {
  //   return "message-board";
  // },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
