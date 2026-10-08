"use server";
import { signIn, signOut } from "@/auth";
import { getApprovedUsers } from "./userActions";
import { z } from "zod";

export type SignInFormState = {
  email: string;
  message: string;
} | null;

const emailSchema = z.string().trim().email();

export const resendLogin = async (
  _previousState: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> => {
  const rawEmail = formData.get("email");
  const submittedEmail = typeof rawEmail === "string" ? rawEmail : "";
  const result = emailSchema.safeParse(submittedEmail);

  if (!result.success)
    return {
      email: submittedEmail,
      message: "Please enter a valid email",
    };

  const email = result.data.toLowerCase();
  const users = await getApprovedUsers();
  const isApproved = users.some((user) => user.email.toLowerCase() === email);

  if (!isApproved)
    return {
      email: submittedEmail,
      message: "This email has not been registered",
    };

  formData.set("email", email);
  await signIn("resend", formData);

  return null;
};

export const resendSignOut = async () =>
  await signOut({ redirect: true, redirectTo: "/" });
