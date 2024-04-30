"use client";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormNewUser } from "../types";
import NewUserForm from "../components/NewUserForm";

const NewUserPage = () => {
  const router = useRouter();
  const handleCreateUser: SubmitHandler<FormNewUser> = (data) => {
    createuser(data);
  };

  const { mutate: createuser, isPending: isPendingSubmit } = useMutation({
    mutationFn: (newUser: FormNewUser) => {
      return axios.post("/api/users/create", newUser);
    },
    onError: (error) => {
      console.error(error, "create user error");
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
    </div>
  );
};

export default NewUserPage;
