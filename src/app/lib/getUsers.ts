// import { unstable_noStore as noStore } from "next/cache";
"use server";
import { db } from "../../../prisma/db";

export const getUsers = async () => {
  // noStore();

  try {
    const response = await db.user?.findMany({
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    return response;
  } catch (error) {
    return console.error({ message: error + "delete reply api error" });
  }
};
