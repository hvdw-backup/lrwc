import { FunctionComponent } from "react";
import { User } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";

interface UpdateUserDetailsFormProps {
  user: User;
  handleRegisterUserDetails: SubmitHandler<User>;
  isEdit?: boolean;
  isPendingSubmit?: boolean;
}

const UpdateUserDetailsForm: FunctionComponent<
  UpdateUserDetailsFormProps
> = async ({ user, handleRegisterUserDetails, isEdit, isPendingSubmit }) => {
  const { register, handleSubmit, reset, formState } = useForm<User>({
    defaultValues: {
      email: user.email,
      username: user.username || "",
      about: user.about || "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(handleRegisterUserDetails)}
      className="flex flex-col items-center gap-5 mt-5 w-1/2"
    >
      <input
        {...register("email", { required: true })}
        type="text"
        placeholder={user.email}
        value={user.email}
        className="input w-full bg-base-200"
        disabled
      />
      <input
        {...(register("username"), { required: true })}
        type="text"
        placeholder={user.username || "Please choose a username (required)"}
        className="input w-full bg-base-200"
      />
      <textarea
        {...register("about")}
        placeholder={
          user.about || "Add your bio or calling card info here (optional)"
        }
        className="textarea textarea-lg bg-base-200 w-full h-60"
      />
      {/* {error && <h1>{error.message}</h1>} */}
      <button
        type="submit"
        className="btn btn-primary self-end w-40"
        // disabled={formState.isValid}
      >
        Update details
      </button>
      Please note you will be asked to sign in again
    </form>
    // TODO: can add image and description etc
  );
};

export default UpdateUserDetailsForm;
