import NextAuth from "next-auth";
import { authConfig } from "../auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

// callbacks: {
//   authorized({ req, token }: any) {
//     if (token) return true; // If there is a token, the user is authenticated
//   },
// },
// secret: process.env.NEXTAUTH_SECRET,
