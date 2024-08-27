"use server";
import { signIn, signOut } from "@/auth";

export const resendLogin = async (formData: FormData) =>
  await signIn("resend", formData);

export const resendSignOut = async () =>
  await signOut({ redirect: true, redirectTo: "/" });
