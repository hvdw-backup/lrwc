"use client";
import { SubmitHandler } from "react-hook-form";
import FormPost from "../components/FormPost";
import { FormInputPost } from "../types";
import BackButton from "../components/BackButton";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const router = useRouter();
  const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
    createPost(data);
  };

  const { mutate: createPost, isPending: isPendingSubmit } = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      return axios.post("/api/posts/create", newPost);
    },
    onError: (error) => {
      console.error(error, "create post error");
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  return (
    <div>
      <BackButton />
      <h1 className="text-2xl my-4 font-bold text-center">Add new post</h1>
      <FormPost isPendingSubmit submit={handleCreatePost} />
    </div>
  );
};

export default CreatePage;
