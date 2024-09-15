"use server";
import { signIn, signOut } from "@/auth";
import { getApprovedUsers } from "./userActions";

export type SignInFormState = {
  status: "success" | "error";
  message: string;
} | null;

export const resendLogin = async (
  prevState: SignInFormState,
  formData: FormData
): Promise<SignInFormState> => {
  const email = formData.get("email");

  if (email === "" || email === null)
    return {
      status: "error",
      message: "Please enter a valid email",
    };

  const users = await getApprovedUsers();
  const isApproved = users.some((user) => user.email === email);

  if (!isApproved)
    return {
      status: "error",
      message: "This email has not been registered",
    };

  await signIn("resend", formData);

  return {
    status: "success",
    message: `Welcome, ${formData.get("email")}`,
  };
};

export const resendSignOut = async () =>
  await signOut({ redirect: true, redirectTo: "/" });
