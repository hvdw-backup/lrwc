import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
// https://authjs.dev/getting-started/providers/credentials - should switch to google or something
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserForSignIn } from "@/app/lib/getUserForSignIn";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", placeholder: "Enter username" },
        password: { label: "Password", placeholder: "Password" },
      },
      async authorize(credentials) {
        console.log(credentials, "crendentials first");
        if (!credentials || !credentials.username || !credentials.password)
          return null;

        const { username, password } = credentials;
        console.log(credentials, "credentials");

        const user = await getUserForSignIn(username as string);
        console.log(user, "user log in");

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.password
        );

        if (passwordsMatch) return user;

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
