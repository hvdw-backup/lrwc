"use server";
import { signIn, signOut } from "@/auth";
import { getApprovedUsers, getUserByEmail } from "./userActions";
import { db } from "../../../prisma/db";

// TODO: is there something more elegant than 'resaving' the old details?
// TODO: users shouldn't have to sign it again to see changes. How to refresh?

export type UpdateUserDetailsFormState = {
  status: "success" | "error";
  message: string;
} | null;

export const updateDetails = async (
  prevState: UpdateUserDetailsFormState,
  formData: FormData,
): Promise<UpdateUserDetailsFormState> => {
  const email = formData.get("email")?.toString();
  const username = formData.get("username")?.toString();
  const about = formData.get("about")?.toString();

  let sendUsername = "";
  let sendAbout = "";

  if (email === "" || email === null)
    return {
      status: "error",
      message: "Please enter a valid email",
    };

  const storedDetails = email && (await getUserByEmail(email));

  if (username) {
    sendUsername = username;
    //if there are details on the db and the new entry is empty, store the old one
  } else if (storedDetails && storedDetails.username) {
    sendUsername = storedDetails.username;
  }

  if (about) {
    sendAbout = about;
    //if there are details on the db and the new entry is empty, store the old one
  } else if (storedDetails && storedDetails.about) {
    sendAbout = storedDetails.about;
  }

  try {
    await db.user.update({
      where: {
        email: email,
      },
      data: {
        username: sendUsername,
        about: sendAbout,
        redeemed: true,
      },
    });
    return {
      status: "success",
      message: `Successfully updated your details - sign in again to see the changes`,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
