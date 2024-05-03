"use client";
import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { FormSignIn } from "../types";
import { authenticate } from "../lib/actions";

const SignInForm: FunctionComponent = () => {
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignIn>();

  return (
    <form
      onSubmit={handleSubmit(authenticate)}
      className="flex flex-col items-center gap-5 mt-5 w-1/2"
    >
      <input
        {...register("username", { required: true })}
        type="text"
        placeholder="Enter your username"
        className="input w-full bg-base-200"
      />
      <div className="flex w-full">
        <input
          {...register("password", { required: true })}
          type={isPasswordRevealed ? "text" : "password"}
          placeholder="Enter your password"
          className="input w-full bg-base-200"
        />
      </div>
      <button type="submit" className="btn btn-primary self-end w-40">
        Sign up
      </button>

      <h1>Username errors: {errors.username?.message}</h1>
      <h1>Password errors: {errors.password?.message}</h1>
    </form>
  );
};

export default SignInForm;
