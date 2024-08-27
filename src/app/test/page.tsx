import { auth } from "@/auth";
import resendLogin from "../lib/resendLogin";

const TestPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-3xl my-10 font-bold text-center">
          Sign in to the LRWC Forum
        </h1>
        <form
          action={resendLogin}
          name="email"
          className="flex flex-col items-center gap-5 mt-5 w-1/2"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="input w-full bg-base-200"
          />
          <button>Sign In with Resend</button>
        </form>
      </div>
    );
  }

  if (session) {
    return <h1>you're signed in {session.user?.email}</h1>;
  }
};

export default TestPage;
