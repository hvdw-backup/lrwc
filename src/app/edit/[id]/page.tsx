"use client";
import Form from "@/app/components/Form";
import { FormInputPost } from "@/app/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface EditPostPageProps {
  params: {
    id: string;
  };
}
const EditPostPage: FunctionComponent<EditPostPageProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const { data: dataPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const response = await axios.get(`/api/posts/${id}`);
      return response.data;
    },
  });

  const { mutate: updatePost, isPending: isPendingSubmit } = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      return axios.patch(`/api/posts/${id}`, newPost);
    },
    onError: (error) => {
      console.error(error, "create post error");
    },
    onSuccess: () => {
      router.push("/message-board");
      router.refresh();
    },
  });

  const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
    updatePost(data);
  };

  return (
    <div>
      <h1 className="text-2xl my-4 font-bold text-center">Edit Post</h1>
      {isLoadingPost ? (
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <Form
            isPendingSubmit
            submit={handleEditPost}
            initialValue={dataPost}
            isEdit
          />
        </>
      )}
    </div>
  );
};

export default EditPostPage;
