"use client";
import { FunctionComponent } from "react";
// import { authenticate } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";

const SignInForm: FunctionComponent = () => {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form
      // action={dispatch}
      className="flex flex-col items-center gap-5 mt-5 w-1/2"
    >
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter your username"
        className="input w-full bg-base-200"
      />
      <div className="flex w-full">
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          className="input w-full bg-base-200"
        />
      </div>
      <LoginButton />

      {/* {errorMessage && <h1>Errors: {errorMessage}</h1>} */}
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="btn btn-primary self-end w-40"
    >
      Sign In
    </button>
  );
}

export default SignInForm;
