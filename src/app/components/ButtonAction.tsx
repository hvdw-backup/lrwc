"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Reply, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FunctionComponent,
  HTMLAttributes,
  SetStateAction,
} from "react";

interface ButtonActionProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  reply: {
    isReply: boolean;
    setIsReply: Dispatch<SetStateAction<boolean>>;
  };
}

const ButtonAction: FunctionComponent<ButtonActionProps> = ({
  id,
  reply,
  ...props
}) => {
  const router = useRouter();

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`);
    },
    onError: (error) => {
      console.error(error, "delete post error");
    },
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <div {...props}>
      <Link href={`/edit/${id}`} className="btn mr-2">
        <Pencil />
        Edit
      </Link>
      <button
        onClick={() => reply.setIsReply(!reply.isReply)}
        className="btn mr-2 btn-secondary"
      >
        <Reply />
        Reply
      </button>
      <button onClick={() => deletePost()} className="btn btn-error">
        {isPending ? (
          <>
            <span className="loading loading-spinner"></span>
            Deleting...
          </>
        ) : (
          <>
            <Trash2 />
            Delete
          </>
        )}
      </button>
    </div>
  );
};

export default ButtonAction;
