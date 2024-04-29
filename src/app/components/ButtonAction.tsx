"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FunctionComponent, HTMLAttributes } from "react";

interface ButtonActionProps extends HTMLAttributes<HTMLDivElement> {
  postId: string;
  path: "posts" | "replies";
  hasReplies?: boolean;
}

const ButtonAction: FunctionComponent<ButtonActionProps> = ({
  postId,
  path,
  hasReplies,
  ...props
}) => {
  const router = useRouter();

  const { mutate: deleteItem, isPending } = useMutation({
    mutationFn: async () => {
      const apiPath = `/api/${path}/${postId}`;
      return axios.delete(apiPath);
    },
    onError: (error) => {
      console.error(error, `delete ${path} error`);
    },
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <div {...props}>
      {!hasReplies && (
        <button onClick={() => deleteItem()} className="btn btn-error">
          {isPending ? (
            <>
              <span className="loading loading-spinner"></span>
            </>
          ) : (
            <>
              <Trash2 />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ButtonAction;
