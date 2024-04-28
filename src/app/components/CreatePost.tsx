"use client";
import { FunctionComponent } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { FormInputPost } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "./Form";
import { useRouter } from "next/navigation";

const CreatePost: FunctionComponent = () => {
  const router = useRouter();

  const initialVlaues = {
    title: "",
    content: "",
    tagId: "",
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
    <Form
      submit={handleCreatePost}
      isPendingSubmit={isPending}
      initialValue={initialVlaues}
    />
  );
};

export default CreatePost;
