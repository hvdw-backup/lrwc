"use client";
import { FunctionComponent, useEffect } from "react";
import { User } from "../types";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import {
  UpdateUserDetailsFormState,
  updateDetails,
} from "../lib/updateUserDetailsActions";

interface UpdateUserDetailsFormProps {
  user: User;
}

const UpdateUserDetailsForm: FunctionComponent<UpdateUserDetailsFormProps> = ({
  user,
}) => {
  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<User>({
    defaultValues: {
      email: user.email,
    },
  });

  const [state, formAction] = useFormState<
    UpdateUserDetailsFormState,
    FormData
  >(updateDetails, null);

  useEffect(() => {
    if (!state) {
      return;
    }
    setError("email", { message: state.message });
  }, [state, setError]);

  return (
    <form
      action={formAction}
      className="flex flex-col items-center gap-5 mt-5 w-1/2"
    >
      <input
        {...register("email", { required: true })}
        type="text"
        id="email"
        placeholder={user.email}
        value={user.email}
        className="input w-full bg-base-200"
        disabled
      />
      <input
        {...register("username", { required: "Please enter a username" })}
        type="text"
        id="username"
        placeholder={user.username || "Choose a username"}
        className="input w-full bg-base-200"
      />
      <textarea
        {...register("about")}
        id="about"
        placeholder={
          user.about || "Add your bio or calling card info here (optional)"
        }
        className="textarea textarea-lg bg-base-200 w-full h-60"
      />
      {/* {error && <h1>{error.message}</h1>} */}
      Please note you will have to sign in again to see the changes
      <button
        type="submit"
        className="btn btn-primary self-end w-40"
        // disabled={formState.isValid}
      >
        Update details
      </button>
      <h1 style={{ color: "#dd2d53" }} className="text-xl">
        {errors.email?.message}
      </h1>
    </form>
    // TODO: can add image and description etc
  );
};

export default UpdateUserDetailsForm;
