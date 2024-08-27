"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface NewUserFormProps {
  approvedUsers: User[];
  email: string | undefined | null;
}

const NewUserForm: FunctionComponent<NewUserFormProps> = ({
  approvedUsers,
  email,
}) => {
  const router = useRouter();
  const [error, setError] = useState<null | Error>(null);

  console.log("error: ", error);

  const { register, handleSubmit, reset, formState } = useForm<User>();

  const handleCreateUser: SubmitHandler<User> = async (data) => {
    const matchingUser = approvedUsers.filter(
      (user) => user.username === data.username
    );

    console.log("data: ", data);

    if (matchingUser.length > 0) {
      setError(new Error("Someone has already registered with this username"));
      return;
    }

    createuser({ ...data });
  };

  const { mutate: createuser } = useMutation({
    mutationFn: (newUser: User) => {
      return axios.post("/api/user/register", newUser);
    },
    onError: (error) => {
      console.error(error, "create user error");
      setError(new Error(error.name + error.message));
    },
    onSuccess: () => {
      router.push("/message-board");
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleCreateUser)}
      className="flex flex-col items-center gap-5 mt-5 w-1/2"
    >
      <input
        {...register("email", { required: true })}
        type="text"
        placeholder={email || "test"}
        value={email || "test"}
        className="input w-full bg-base-200"
        disabled
      />
      <input
        {...register("username", { required: true })}
        type="text"
        placeholder="Choose your username"
        className="input w-full bg-base-200"
      />
      {error && <h1>{error.message}</h1>}
      <button
        type="submit"
        className="btn btn-primary self-end w-40"
        disabled={!!error}
      >
        Register username
      </button>
      <h1>{error?.message}</h1>
    </form>
    // TODO: can add image and description etc
  );
};

export default NewUserForm;
