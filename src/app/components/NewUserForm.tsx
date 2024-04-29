import { FunctionComponent, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormNewUser } from "../types";

interface NewUserFormProps {
  submit: SubmitHandler<FormNewUser>;
  isPendingSubmit: boolean;
}

const NewUserForm: FunctionComponent<NewUserFormProps> = ({
  submit,
  isPendingSubmit,
}) => {
  const { register, handleSubmit, reset, formState } = useForm<FormNewUser>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
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
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Choose your password"
        className="input w-full bg-base-200"
      />
      <button type="submit" className="btn btn-primary self-end w-40">
        Sign up
      </button>
    </form>
  );
};

export default NewUserForm;
