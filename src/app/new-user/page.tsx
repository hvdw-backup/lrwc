"use client";
import { SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FormNewUser } from "../types";
import NewUserForm from "../components/NewUserForm";
import { db } from "../lib/db";
import { useRouter } from "next/navigation";
import { getApprovedUsers } from "../lib/getApprovedUsers";
import { useState } from "react";

const NewUserPage = () => {
  const router = useRouter();
  const [error, setError] = useState<null | Error>(null);

  const query = useQuery({
    queryKey: ["approvedUsers"],
    queryFn: () => getApprovedUsers(),
  });

  const handleCreateUser: SubmitHandler<FormNewUser> = (data) => {
    const matchingEmailsUsers = query.data?.filter(
      (user) => user.email === data.email
    );
    console.log(matchingEmailsUsers, "matchingEmailsUsers");
    console.log(query.data, "query.data");

    const isUserRegistered =
      matchingEmailsUsers && matchingEmailsUsers.length > 0;

    isUserRegistered
      ? createuser(data)
      : setError(new Error("This email is not registered"));
  };

  const { mutate: createuser, isPending: isPendingSubmit } = useMutation({
    mutationFn: (newUser: FormNewUser) => {
      return axios.post("/api/users/create", newUser);
    },
    onError: (error) => {
      console.error(error, "create user error");
      setError(new Error(error.name + error.message));
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl my-4 font-bold text-center">
        Sign up to the LRWC forum
      </h1>
      <NewUserForm
        submit={handleCreateUser}
        isPendingSubmit={isPendingSubmit}
      />
      {error && <h1>ERROR</h1>}
    </div>
  );
};

export default NewUserPage;
