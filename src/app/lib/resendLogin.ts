"use server";
import { signIn } from "@/auth";

export default async function resendLogin(formData: FormData) {
  console.log("form data: ", formData);
  await signIn("resend", formData);
}
