import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/app/lib/db";

export const getUserForSignIn = async (username: string) => {
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
