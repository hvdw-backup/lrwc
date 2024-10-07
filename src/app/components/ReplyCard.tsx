"use client";
import { FunctionComponent, useState } from "react";
import DeleteButton from "./DeleteButton";
import { User } from "../types";
import { isReadyToRead, normaliseTime } from "../lib/getReadTime";

interface ReplyCardProps {
  id: string;
  userId: string | null;
  content: string;
  replyUserId: string;
  users?: User[];
  readTime: string;
}

const MAX_CONTENT_LENGTH = 300;

const ReplyCard: FunctionComponent<ReplyCardProps> = ({
  id,
  userId,
  content,
  replyUserId,
  users,
  readTime,
}) => {
  const shouldTruncate = content.length > MAX_CONTENT_LENGTH;
  const [isTruncated, setIsTruncated] = useState(true);

  const filteredUser = users?.find((user) => user.id === replyUserId);

  if (isReadyToRead(readTime)) {
    return (
      <div className="card w-100 bg-base-300 ml-20 mr-10 card-body p-2">
        <span className="divider divider-primary" />
        <p>{filteredUser?.email}</p>
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
          {userId === replyUserId && (
            <DeleteButton postId={id} path="replies" />
          )}
        </div>
        <span className="divider divider-primary" />
      </div>
    );
  }

  if (!isReadyToRead(readTime)) {
    return (
      <div className="card w-100 bg-base-300 ml-20 mr-10 card-body p-2">
        <span className="divider divider-primary" />
        <p>
          This message will be available for everyone to read in{" "}
          {normaliseTime(readTime)} hours
        </p>
        <span className="divider divider-primary" />
      </div>
    );
  }
};

export default ReplyCard;
