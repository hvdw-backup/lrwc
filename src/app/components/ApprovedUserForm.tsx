"use client";
import { FunctionComponent, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { FormApprovedUser } from "../types";
import email from "next-auth/providers/email";
import { useFormState } from "react-dom";
import { ApprovedUserFormState, makeApprovedUser } from "../lib/userActions";

const ApprovedUserForm: FunctionComponent = () => {
  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<FormApprovedUser>();

  const [state, formAction] = useFormState<ApprovedUserFormState, FormData>(
    makeApprovedUser,
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
      className="flex flex-col items-center gap-5 my-10 w-1/2"
    >
      <input
        {...register("email", { required: true })}
        type="text"
        placeholder="Enter their email - check for typos!"
        className="input w-full bg-base-200"
      />
      <button type="submit" className="btn btn-primary self-end w-40">
        Add to LRWC forum
      </button>
      <h1 style={{ color: "#dd2d53" }} className="text-xl">
        {errors.email?.message}
      </h1>
    </form>
  );
};

export default ApprovedUserForm;
