"use client";
import { FunctionComponent } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { FormInputPost } from "../types";
import { SubmitHandler } from "react-hook-form";
import PostForm from "./PostForm";
import { useRouter } from "next/navigation";

const CreatePost: FunctionComponent = () => {
  const router = useRouter();

  const initialValues = {
    title: "",
    content: "",
  };

  const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
    createPost(data);
  };

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      return axios.post("/api/posts/create", newPost);
    },
    onError: (error) => {
      console.error(error, "create post error");
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <PostForm
      submit={handleCreatePost}
      isPendingSubmit={isPending}
      initialValue={initialValues}
    />
  );
};

export default CreatePost;
