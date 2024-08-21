// import type { NextAuthConfig } from "next-auth";
// // https://nextjs.org/learn/dashboard-app/adding-authentication

// export const authConfig = {
//   pages: {
//     signIn: "/sign-in",
//     signOut: "/",
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       // protected paths
//       const isOnMessageboard = nextUrl.pathname === "/message-board";
//       const isOnApprovedUsers = nextUrl.pathname === "/approve-user";
//       // logged out users only
//       const isOnSignIn = nextUrl.pathname === "/sign-in";
//       const isOnSignUp = nextUrl.pathname === "/sign-up";

//       if (isLoggedIn) {
//         if (isOnSignIn || isOnSignUp) {
//           return Response.redirect(new URL("/message-board", nextUrl));
//         }
//         return true;
//       }

//       if (!isLoggedIn) {
//         if (isOnMessageboard || isOnApprovedUsers) {
//           return false;
//         }
//         return true;
//       }
//     },
//   },
//   // redirect({}) {
//   //   return "message-board";
//   // },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;
