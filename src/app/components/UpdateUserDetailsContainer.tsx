"use client";
import { FunctionComponent } from "react";
import { User } from "../types";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import UpdateUserDetailsForm from "./UpdateUserDetailsForm";

interface UpdateUserDetailsContainerProps {
  user: User;
}

const UpdateUserDetailsContainer: FunctionComponent<
  UpdateUserDetailsContainerProps
> = ({ user }) => {
  const handleRegisterUserDetails: SubmitHandler<User> = (data) => {
    updateUser(data);
  };

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (updateUserDetails: User) => {
      return axios.post("/api/user/update-details", updateUserDetails);
    },
    onError: (error) => {
      console.error(error, "register user details error");
    },
    onSuccess: () => {
      redirect("/message-board");
    },
  });

  return (
    <UpdateUserDetailsForm
      user={user}
      handleRegisterUserDetails={handleRegisterUserDetails}
    />
  );
};

export default UpdateUserDetailsContainer;
