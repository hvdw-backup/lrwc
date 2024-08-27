"use client";
import { BaseSyntheticEvent, FunctionComponent, useState } from "react";
import ButtonAction from "./ButtonAction";
import WriteReply from "./WriteReply";
import { FormInputPost, User } from "../types";
import ReplyCard from "./ReplyCard";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    userId: string | null;
  };
  replies?: {
    id: string;
    content: string;
    postId: string;
    userId: string;
  }[];
  users?: User[];
  author: User;
}

const MAX_CONTENT_LENGTH = 300;

const PostCard: FunctionComponent<PostCardProps> = ({
  post,
  replies,
  users,
  author,
}) => {
  const { id, title, content } = post;
  const shouldTruncate = content.length > MAX_CONTENT_LENGTH;
  const [isTruncated, setIsTruncated] = useState(true);

  const filteredReplies = replies?.filter((reply) => reply.postId === post.id);
  const filteredUser = users?.find((user) => user.id === post.userId);

  return (
    <div className="card w-100 bg-base-300 my-10">
      <div className="card-body">
        <h2 className="card-title">{title + " by " + filteredUser?.email}</h2>
        <p>{isTruncated ? content.slice(0, MAX_CONTENT_LENGTH) : content}</p>
        <div className="card-actions justify-end">
          {shouldTruncate && (
            <button
              onClick={() => setIsTruncated(!isTruncated)}
              className="hover:underline mr-3 self-end"
            >
              {isTruncated ? "Show more" : "Show less"}
            </button>
          )}

          {/* <Link href={`/edit-post/${id}`} className="hover:underline">
            Edit
          </Link> */}
        </div>
        <ButtonAction
          postId={id}
          className="justify-end inline-flex"
          path="posts"
          hasReplies={filteredReplies && filteredReplies.length > 0}
        />
      </div>

      {filteredReplies?.map((reply) => (
        <ReplyCard
          key={reply.id}
          content={reply.content}
          id={reply.id}
          replyUserId={reply.userId}
          users={users}
        />
      ))}
      <WriteReply parentPostId={id} userId={author?.id} />
    </div>
  );
};

export default PostCard;
