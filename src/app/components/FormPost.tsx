"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputPost } from "../types";
import { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tag } from "@prisma/client";

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing?: boolean;
}

const FormPost: FunctionComponent<FormPostProps> = ({ submit, isEditing }) => {
  const { register, handleSubmit } = useForm<FormInputPost>();

  // fetch list of tags
  const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get("api/tags");
      return response.data;
    },
  });

  console.log("hi", dataTags);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-5 mt-10"
    >
      <input
        {...(register("title"), { required: true })}
        type="text"
        placeholder="Post title..."
        className="input input-bordered w-full max-w-lg"
      />

      <textarea
        {...(register("content"), { required: true })}
        className="textarea textarea-bordered w-full max-w-lg"
        placeholder="Post content..."
      ></textarea>

      {/* {isLoadingTags ? (
        // TODO: could get loading ring from lucide
        "loading..."
      ) : (
        <select
          {...(register("tagId"), { required: true })}
          className="select select-bordered w-full max-w-lg"
          defaultValue={""}
        >
          <option disabled value="">
            Select tags
          </option>
          {dataTags?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      )} */}

      <button type="submit" className="btn btn-primary w-full max-w-lg">
        {isEditing ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default FormPost;
