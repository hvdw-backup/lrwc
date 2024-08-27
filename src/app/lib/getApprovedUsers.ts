import { unstable_noStore as noStore } from "next/cache";
import { db } from "../../../prisma/db";

export const getApprovedUsers = async () => {
  noStore();
  const response = await db.approvedUsers?.findMany({
    select: {
      id: true,
      email: true,
      redeemed: true,
    },
  });

  return response;
};
