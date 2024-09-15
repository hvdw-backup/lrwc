import { auth } from "@/auth";
import SignInForm from "../components/SignInForm";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();

  if (session) redirect("/message-board");

  if (!session) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-3xl my-5 font-bold text-center">
          Sign in to the LRWC Forum
        </h1>
        <div className="flex w-1/2 mb-10">
          Approved users will receive an email with a link to access the message
          board
        </div>
        <SignInForm />
      </div>
    );
  }
};

export default SignInPage;
