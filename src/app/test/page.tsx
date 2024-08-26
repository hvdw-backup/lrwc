"use client";
// import { Button } from '@/components/ui/button'
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
// import { toast } from 'sonner'

type Input = {
  email: string;
};

export default function Test() {
  // const form = useForm();

  const { handleSubmit } = useForm<Input>();
  const [isPending, startTransition] = useTransition();

  async function sendMagicLink(data: { email: string }) {
    startTransition(async () => {
      try {
        await signIn("resend", {
          email: data.email,
          redirect: false,
          callbackUrl: "/protected",
        });
      } catch (error: any) {
        console.log("ERROR" + error);
      }
    });
  }

  return (
    <main className="flex  min-h-screen flex-col items-center justify-center">
      {/* <Form {...form}> */}
      <form onSubmit={handleSubmit(sendMagicLink)}>
        <label>
          email:
          <input placeholder="you@email.com" type="email" name="email" />
        </label>

        <button className="w-full" type="submit">
          {isPending ? "..." : "Sign in with Resend"}
        </button>
      </form>
      {/* </Form> */}
    </main>
  );
}
