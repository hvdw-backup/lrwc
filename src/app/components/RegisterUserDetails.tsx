"use client";
import { FunctionComponent } from "react";
import { User } from "../types";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import RegisterUserDetailsForm from "./RegisterUserDetailsForm";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

interface RegisterUserDetailsProps {
  email: string | null | undefined;
}

const RegisterUserDetails: FunctionComponent<RegisterUserDetailsProps> = ({
  email,
}) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const handleRegisterUserDetails: SubmitHandler<User> = (data) => {
    registerUser(data);
  };

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: (registerUserDetails: User) => {
      console.log(registerUserDetails, "registerUserDetails");
      return axios.post("/api/user/register", registerUserDetails);
    },
    onError: (error) => {
      console.error(error, "register user details error");
    },
    onSuccess: () => {
      console.log(session, "session is here");
      router.refresh;
    },
  });

  return (
    <RegisterUserDetailsForm
      handleRegisterUserDetails={handleRegisterUserDetails}
      email={email}
    />
  );
};

export default RegisterUserDetails;
