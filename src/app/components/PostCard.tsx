"use client";
import { FunctionComponent, useState } from "react";
import DeleteButton from "./DeleteButton";
import WriteReply from "./WriteReply";
import { User } from "../types";
import ReplyCard from "./ReplyCard";
import {
  getRemainingHours,
  isReadyToRead,
  normaliseTime,
} from "../lib/getReadTime";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    userId: string | null;
    readTime: string;
  };
  replies?: {
    id: string;
    content: string;
    postId: string;
    userId: string;
    readTime: string;
  }[];
  users?: User[];
  user: User;
}

const MAX_CONTENT_LENGTH = 300;

const PostCard: FunctionComponent<PostCardProps> = ({
  post,
  replies,
  users,
  user,
}) => {
  const { id, title, content, readTime, userId } = post;
  const shouldTruncate = content.length > MAX_CONTENT_LENGTH;
  const [isTruncated, setIsTruncated] = useState(true);

  const filteredReplies = replies?.filter((reply) => reply.postId === post.id);
  const filteredUser = users?.find((user) => user.id === post.userId);

  const background =
    "https://img.freepik.com/premium-photo/fog-textured-background_761958-406.jpg";

  const timeRemaining = getRemainingHours(readTime);
  const opacity = timeRemaining >= 10 ? 1 : `0.${timeRemaining}`;

  const styles = {
    backgroundImage: "url(" + background + ")",
    borderRadius: "16px",
    backgroundSize: "cover",
    // opacity: opacity,
  };

  if (isReadyToRead(readTime)) {
    return (
      <div className="card w-100 bg-base-300 my-10">
        <div className="card-body">
          <h2 className="card-title">{title + " | " + filteredUser?.email}</h2>
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
          {userId === user.id && (
            <DeleteButton
              postId={id}
              className="justify-end inline-flex"
              path="posts"
              hasReplies={filteredReplies && filteredReplies.length > 0}
            />
          )}
        </div>

        {filteredReplies?.map((reply) => (
          <ReplyCard
            key={reply.id}
            userId={user.id}
            content={reply.content}
            id={reply.id}
            replyUserId={reply.userId}
            users={users}
            readTime={reply.readTime}
          />
        ))}
        <WriteReply parentPostId={id} userId={user?.id} />
      </div>
    );
  }

  if (!isReadyToRead(readTime)) {
    return (
      <div className="card w-100 bg-base-300 my-10">
        <div className="card-body" style={timeRemaining > 1 ? styles : {}}>
          {/* <div className="card-body" style={styles}> */}
          <h2 className="card-title">
            You can read this post in {normaliseTime(readTime)} hours
          </h2>
        </div>
      </div>
    );
  }
};

export default PostCard;
