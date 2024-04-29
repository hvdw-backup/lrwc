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
    <div className="card w-100 bg-base-300 ml-20 mr-10 card-body p-2">
      <span className="divider divider-primary" />
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
        <ButtonAction postId={id} path="replies" />
      </div>
      <span className="divider divider-primary" />
    </div>
  );
};

export default ReplyCard;
