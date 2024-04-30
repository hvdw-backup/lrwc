"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormApprovedUser, FormNewUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const ApprovedUserForm: FunctionComponent = () => {
  const router = useRouter();

  const handleCreateApprovedUser: SubmitHandler<FormApprovedUser> = (data) => {
    createuser(data);
  };

  const { mutate: createuser, isPending } = useMutation({
    mutationFn: (approvedUser: FormApprovedUser) => {
      return axios.post("/api/approved-user/create", approvedUser);
    },
    onError: (error) => {
      console.error(error, "create approved user error");
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const { register, handleSubmit, reset, formState } =
    useForm<FormApprovedUser>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleCreateApprovedUser)}
      className="flex flex-col items-center gap-5 my-10 w-1/2"
    >
      <input
        {...register("email", { required: true })}
        type="text"
        placeholder="Enter their email - check for typos!"
        className="input w-full bg-base-200"
      />
      <button type="submit" className="btn btn-primary self-end w-40">
        {isPending ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Add to LRWC forum"
        )}
      </button>
    </form>
  );
};

export default ApprovedUserForm;
