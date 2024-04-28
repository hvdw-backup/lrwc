import { FunctionComponent, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputPost } from "../types";

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEdit?: boolean;
  initialValue?: FormInputPost;
  isPendingSubmit?: boolean;
}

const Form: FunctionComponent<FormPostProps> = ({
  submit,
  isEdit,
  initialValue,
  isPendingSubmit,
}) => {
  const { register, handleSubmit, reset, formState } = useForm<FormInputPost>({
    defaultValues: initialValue,
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset, initialValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center gap-5 mt-5"
    >
      <input
        {...register("title", { required: true })}
        type="text"
        placeholder="Message title"
        className="input input-bordered w-full"
      />

      <textarea
        {...register("content", { required: true })}
        className="textarea textarea-lg textarea-bordered w-full h-40"
        placeholder="Message body"
      ></textarea>

      <button type="submit" className="btn btn-primary self-end w-40">
        {isPendingSubmit ? (
          <span className="loading loading-spinner"></span>
        ) : isEdit ? (
          "Update"
        ) : (
          "Add"
        )}
      </button>
    </form>
  );
};

export default Form;
