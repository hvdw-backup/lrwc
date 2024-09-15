"use client";
import { FunctionComponent, useEffect } from "react";
import { SignInFormState, resendLogin } from "../lib/resendActions";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";

export type SignInForm = {
  email: string;
};

const SignInForm: FunctionComponent = () => {
  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<SignInForm>();

  const [state, formAction] = useFormState<SignInFormState, FormData>(
    resendLogin,
    null
  );

  useEffect(() => {
    if (!state) {
      return;
    }
    setError("email", { message: state.message });
  }, [state, setError]);

  return (
    <form
      action={formAction}
      className="flex flex-col items-center gap-5 mt-5 w-1/2"
      noValidate
    >
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        className="input w-full bg-base-200"
        {...register("email", {
          required: "Please enter an email",
        })}
      />
      <button type="submit" className="btn btn-primary self-end w-40">
        Sign In
      </button>
      <h1 style={{ color: "#dd2d53" }} className="text-xl">
        {errors.email?.message}
      </h1>
    </form>
  );
};

export default SignInForm;
