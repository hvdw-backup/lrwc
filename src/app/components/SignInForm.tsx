import { FunctionComponent } from "react";
import { resendLogin } from "../lib/resendActions";

const SignInForm: FunctionComponent = async () => {
  return (
    <form
      action={resendLogin}
      className="flex flex-col items-center gap-5 mt-5 w-1/2"
    >
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        className="input w-full bg-base-200"
      />
      <div className="flex w-full">
        You'll receive an email with a link to access the message board
      </div>
      <button type="submit" className="btn btn-primary self-end w-40">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
