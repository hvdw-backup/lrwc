"use server";
import { db } from "../../../prisma/db";
import { unstable_noStore as noStore } from "next/cache";
import { isValidEmail } from "./helpers";

export type ApprovedUserFormState = {
  status: "success" | "error";
  message: string;
} | null;

export const getUserByEmail = async (email: string) => {
  noStore();
  const response = await db.user?.findFirst({
    where: {
      email: email,
    },
  });

  return response;
};

export const getUsers = async () => {
  noStore();
  const response = await db.user?.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      about: true,
    },
  });

  return response;
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
  formData: FormData,
): Promise<ApprovedUserFormState> => {
  const email = formData.get("email")?.toString().toLowerCase();

  if (email === "" || email === null)
    return {
      status: "error",
      message: "Please enter an email address",
    };

  const approvedUsers = await getApprovedUsers();
  const userExists = approvedUsers?.some((user) => user.email === email);

  if (userExists)
    return {
      status: "error",
      message: "This user already exists",
    };

  if (email && !isValidEmail(email.toString())) {
    console.log(email, "email");
    return {
      status: "error",
      message: "Please enter a valid email address",
    };
  }

  try {
    await db.approvedUsers.create({
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
    console.log(error);
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
