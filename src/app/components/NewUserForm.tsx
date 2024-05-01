"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormNewUser } from "../types";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { generateHash } from "../lib/hash";

interface NewUserFormProps {
  approvedUsers: {
    id: string;
    email: string;
    redeemed: boolean;
  }[];
}

const NewUserForm: FunctionComponent<NewUserFormProps> = ({
  approvedUsers,
}) => {
  const router = useRouter();
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const { register, handleSubmit, reset, formState } = useForm<FormNewUser>();

  const handleCreateUser: SubmitHandler<FormNewUser> = async (data) => {
    const matchingEmailsUsers = approvedUsers.filter(
      (user) => user.email === data.email
    );

    if (matchingEmailsUsers.length === 0) {
      setError(new Error("This email is not registered"));
      return;
    }

    if (matchingEmailsUsers[0].redeemed) {
      setError(
        new Error("Someone has already registered with this email address")
      );
      return;
    }

    if (data.password.length < 6) {
      setError(new Error("Please enter a password of at least 7 characters"));
    }

    const safePassword = await generateHash(data.password);

    createuser({ ...data, password: safePassword });
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
        placeholder="Enter your email"
        className="input w-full bg-base-200"
      />
      <input
        {...register("username", { required: true })}
        type="text"
        placeholder="Choose your username"
        className="input w-full bg-base-200"
      />
      <div className="flex w-full">
        <input
          {...register("password", { required: true })}
          type={isPasswordRevealed ? "text" : "password"}
          placeholder="Choose your password"
          className="input w-full bg-base-200"
        />
        {/* TODO: Gotta fix this button, it's submitting the form when clicked */}
        {/* <button
          onClick={() => setIsPasswordRevealed(!isPasswordRevealed)}
          className="ml-3 border p-2.5 rounded-lg"
        >
          {isPasswordRevealed ? <EyeOff /> : <Eye />}
        </button> */}
      </div>
      <button type="submit" className="btn btn-primary self-end w-40">
        Sign up
      </button>

      <h1>{error?.message}</h1>
    </form>
  );
};

export default NewUserForm;
