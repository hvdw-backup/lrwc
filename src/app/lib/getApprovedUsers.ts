import { unstable_noStore as noStore } from "next/cache";
import { db } from "../../../prisma/db";

export const getApprovedUsers = async () => {
  noStore();
  const response = await db.user?.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      redeemed: true,
    },
  });

  return response;
};
