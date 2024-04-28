import { FunctionComponent, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputPost, FormInputReply } from "../types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface WriteReplyProps {
  submit?: SubmitHandler<FormInputPost>;
  isEdit?: boolean;
  initialValue?: FormInputPost;
  isPendingSubmit?: boolean;
}

const WriteReply: FunctionComponent<WriteReplyProps> = ({
  submit,
  isEdit,
  initialValue,
  isPendingSubmit,
}) => {
  const router = useRouter();

  const initialVlaues = {
    title: "",
    content: "",
  };

  const handleCreateReply: SubmitHandler<FormInputReply> = (data) => {
    createReply(data);
  };

  const { mutate: createReply, isPending } = useMutation({
    mutationFn: (newPost: FormInputReply) => {
      return axios.post("/api/replies/create", newPost);
    },
    onError: (error) => {
      console.error(error, "create replies error");
    },
    onSuccess: () => {
      router.refresh();
    },
  });

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
      onSubmit={handleSubmit(handleCreateReply)}
      className="flex flex-col items-end gap-5 m-5"
    >
      <textarea
        {...register("content", { required: true })}
        className="textarea textarea-md bg-base-200 w-3/4 h-40"
        placeholder="Message body"
      ></textarea>
      <button type="submit" className="btn btn-primary w-40">
        {isPending ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Reply"
        )}
      </button>
    </form>
  );
};

export default WriteReply;
