import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
// https://authjs.dev/getting-started/providers/credentials - should switch to google or something
import Credentials from "next-auth/providers/credentials";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export const getUser = async (username: string) => {
  noStore();
  const response = await db.user?.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
    },
  });

  return response;
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // should check credentials on submitting sign in form

        const { username, password } = credentials;
        const user = await getUser(username as string);

        // console.log("username, password:", username, password);

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
