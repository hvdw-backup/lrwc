import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getSignedUpUser } from "@/app/lib/getSignedUpUser";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "creds",
      credentials: {
        username: { label: "Username", placeholder: "Enter username" },
        password: { label: "Password", placeholder: "Password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password)
          return null;

        const { username, password } = credentials;
        console.log(credentials, "credentials");

        const user = await getSignedUpUser(username as string);
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
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.username = user.username;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token, user }: any) {
      session.user.username = token.username;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
