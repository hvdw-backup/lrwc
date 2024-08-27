import { FunctionComponent } from "react";
import { User } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { getApprovedUsers } from "../lib/getApprovedUsers";

interface RegisterUserFormProps {
  email: string | null | undefined;
  handleRegisterUserDetails: SubmitHandler<User>;
  isEdit?: boolean;
  isPendingSubmit?: boolean;
}

const RegisterUserDetailsForm: FunctionComponent<RegisterUserFormProps> = ({
  email,
  handleRegisterUserDetails,
  isEdit,
  isPendingSubmit,
}) => {
  // TODO: for checking whether username is already registered
  // const approvedUsers = await getApprovedUsers();

  const { register, handleSubmit, reset, formState } = useForm<User>({
    defaultValues: {
      username: "",
      //@ts-ignore
      email: email,
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
      {/* {error && <h1>{error.message}</h1>} */}
      <button
        type="submit"
        className="btn btn-primary self-end w-40"
        // disabled={formState.isValid}
      >
        Register username
      </button>
    </form>
    // TODO: can add image and description etc
  );
};

export default RegisterUserDetailsForm;
