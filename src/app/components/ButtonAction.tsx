"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FunctionComponent, HTMLAttributes } from "react";

interface ButtonActionProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  path: "posts" | "replies";
}

const ButtonAction: FunctionComponent<ButtonActionProps> = ({
  id,
  path,
  ...props
}) => {
  const router = useRouter();

  const { mutate: deleteItem, isPending } = useMutation({
    mutationFn: async () => {
      const apiPath = `/api/${path}/${id}`;
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
      {/* TODO: hmm */}
      <Link href={`/edit/${id}`} className="btn mr-2">
        <Pencil />
        Edit
      </Link>
      <button onClick={() => deleteItem()} className="btn btn-error">
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
