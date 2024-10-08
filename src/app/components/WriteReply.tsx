import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputReply } from "../types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface FormInputReplyProps {
  parentPostId: string;
  userId: string;
}

const WriteReply: FunctionComponent<FormInputReplyProps> = ({
  parentPostId,
  userId,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const router = useRouter();

  const handleCreateReply: SubmitHandler<FormInputReply> = (data) => {
    createReply({ ...data, postId: parentPostId, userId: userId });
  };

  const { mutate: createReply, isPending } = useMutation({
    mutationFn: (newReply: FormInputReply) => {
      return axios.post("/api/replies/create", newReply);
    },
    onError: (error) => {
      console.error(error, "create replies error");
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const { register, handleSubmit, reset, formState } =
    useForm<FormInputReply>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleCreateReply)}
      className="flex flex-col items-end gap-5 mb-5 ml-20 mr-10"
    >
      {isReplying ? (
        <>
          <textarea
            {...register("content", { required: true })}
            className="textarea textarea-md bg-base-200 w-full h-40"
            placeholder="Write a reply..."
          ></textarea>
          <button type="submit" className="btn btn-primary w-40">
            {isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Reply"
            )}
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setIsReplying(!isReplying)}
          className="btn btn-primary w-40"
        >
          Write a reply
        </button>
      )}
    </form>
  );
};

export default WriteReply;
