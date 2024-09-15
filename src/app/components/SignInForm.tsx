"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { SignInFormState, resendLogin } from "../lib/resendActions";
import { useForm } from "react-hook-form";
import { getApprovedUsers } from "../lib/getUsers";
import { useFormState } from "react-dom";

export type SignInForm = {
  email: string;
};

const SignInForm: FunctionComponent = async () => {
  const form = useForm<SignInForm>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  // const onSubmit = (data: SignInForm) => {
  //   resendLogin(data);
  // };

  const [state, formAction] = useFormState<SignInFormState, FormData>(
    resendLogin,
    null
  );
  const [status, setStatus] = useState("hey :)");

  useEffect(() => {
    if (!state) {
      return;
    }
    setStatus(state.message);
  }, [state]);

  return (
    <form
      action={formAction}
      // onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-5 mt-5 w-1/2"
      noValidate
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        className="input w-full bg-base-200"
        {...register("email", {
          required: "Please enter an email",
          pattern: {
            value:
              /^[a-zA-Z0-9 !#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Invalid email",
          },
          // validate: (fieldValue) => {
          //   return (
          //     //as long as case one doesn't happen, validation is satisfied
          //     !users.some((user) => user.email === fieldValue) ||
          //     "This email has not been registered"
          //   );
          // },
        })}
      />
      <div className="flex w-full">
        Approved users will receive an email with a link to access the message
        board
      </div>
      <h1>{errors.email?.message}</h1>
      <p>{status}</p>
      <p>{JSON.stringify(state)}</p>
      <button type="submit" className="btn btn-primary self-end w-40">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
