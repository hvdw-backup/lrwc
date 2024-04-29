"use client";
import { FunctionComponent, useState } from "react";
import ButtonAction from "./ButtonAction";

interface ReplyCardProps {
  id: string;
  content: string;
}

const MAX_CONTENT_LENGTH = 300;

const ReplyCard: FunctionComponent<ReplyCardProps> = ({ id, content }) => {
  const shouldTruncate = content.length > MAX_CONTENT_LENGTH;
  const [isTruncated, setIsTruncated] = useState(true);

  return (
    <div className="card w-100 bg-base-300 border my-3 mx-10 card-body p-4">
      <p>{isTruncated ? content.slice(0, MAX_CONTENT_LENGTH) : content}</p>
      <div className="card-actions justify-end">
        {shouldTruncate && (
          <button
            onClick={() => setIsTruncated(!isTruncated)}
            className="hover:underline"
          >
            {isTruncated ? "Show more" : "Show less"}
          </button>
        )}
        <ButtonAction postId={id} path="replies" />
      </div>
    </div>
  );
};

export default ReplyCard;
