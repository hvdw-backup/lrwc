"use client";

import { useActionState, useState } from "react";
import { resendLogin, type SignInFormState } from "../lib/resendActions";

// TODO: can't the form use the regex for email?
const SignInForm = () => {
  const [state, formAction, isPending] = useActionState<
    SignInFormState,
    FormData
  >(resendLogin, null);
  const [email, setEmail] = useState("");
  const errorMessage = state?.email === email ? state.message : null;

  return (
    <form
      action={formAction}
      className="flex flex-col items-center gap-5 mt-5 w-1/2"
    >
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        autoComplete="email"
        required
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? "email-error" : undefined}
        className="input w-full bg-base-200"
      />
      {/* TODO: highlight colour */}
      <button
        type="submit"
        className="btn btn-primary self-end w-40"
        disabled={isPending} //TODO: disable if form is empty
      >
        {isPending ? "Sending..." : "Sign In"}
      </button>
      {errorMessage && (
        <p id="email-error" role="alert" className="text-xl text-[#dd2d53]">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default SignInForm;
