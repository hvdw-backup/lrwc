// import { unstable_noStore as noStore } from "next/cache";
"use server";
import { db } from "../../../prisma/db";
import { unstable_noStore as noStore } from "next/cache";

export type ApprovedUserFormState = {
  status: "success" | "error";
  message: string;
} | null;

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

export const getApprovedUsers = async () => {
  noStore();
  const response = await db.approvedUsers?.findMany({
    select: {
      id: true,
      email: true,
    },
  });

  return response;
};

export const makeApprovedUser = async (
  prevState: ApprovedUserFormState,
  formData: FormData
): Promise<ApprovedUserFormState> => {
  const email = formData.get("email");

  if (email === "" || email === null)
    return {
      status: "error",
      message: "Please enter a valid email",
    };

  const approvedUsers = await getApprovedUsers();
  const userExists = approvedUsers.some((user) => user.email === email);

  if (userExists)
    return {
      status: "error",
      message: "This user already exists",
    };

  const regex = new RegExp(
    /^[a-zA-Z0-9 !#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  if (email && regex.test(email?.toString())) {
    return {
      status: "error",
      message: "Please enter a valid email address",
    };
  }

  try {
    const newUser = await db.approvedUsers.create({
      data: {
        //@ts-ignore - email definitely exists by this point
        email: email,
      },
    });
    return {
      status: "success",
      message: `Successfully added user`,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
