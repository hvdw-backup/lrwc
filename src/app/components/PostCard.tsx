"use client";
import { Tag } from "@prisma/client";
import { FunctionComponent, useState } from "react";
import ButtonAction from "./ButtonAction";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    tag: Tag;
  };
}

const MAX_CONTENT_LENGTH = 300;

const PostCard: FunctionComponent<PostCardProps> = ({ post }) => {
  const { id, title, content, tag } = post;
  const shouldTruncate = content.length > MAX_CONTENT_LENGTH;
  const [isTruncated, setIsTruncated] = useState(true);

  return (
    <div className="card w-100 bg-base-100 shadow-sm border my-10">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{isTruncated ? content.slice(0, MAX_CONTENT_LENGTH) : content}</p>
        <div className="card-actions justify-end">
          <span className="badge badge neutral">{tag.name}</span>

          {shouldTruncate && (
            <button
              onClick={() => setIsTruncated(!isTruncated)}
              className="hover:underline"
            >
              {isTruncated ? "Show more" : "Show less"}
            </button>
          )}

          {/* <Link href={`/edit-post/${id}`} className="hover:underline">
            Edit
          </Link> */}
        </div>
        <ButtonAction id={id} className="justify-end inline-flex" />
      </div>
    </div>
  );
};

export default PostCard;
