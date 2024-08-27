import { auth } from "@/auth";
import SignInForm from "../components/SignInForm";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();

  if (session) redirect("/message-board");

  if (!session) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-3xl my-10 font-bold text-center">
          Sign in to the LRWC Forum
        </h1>
        <SignInForm />
      </div>
    );
  }
};

export default SignInPage;
