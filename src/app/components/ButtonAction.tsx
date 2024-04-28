"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

interface ButtonActionProps {
  id: string;
}

const ButtonAction: FunctionComponent<ButtonActionProps> = ({ id }) => {
  const router = useRouter();

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`);
    },
    onError: (error) => {
      console.error(error, "delete post error");
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });
  return (
    <div>
      <Link href={`/edit/${id}`} className="btn mr-2">
        <Pencil />
        Edit
      </Link>
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
