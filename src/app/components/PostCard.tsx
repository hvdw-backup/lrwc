import { Tag } from "@prisma/client";
import Link from "next/link";
import { FunctionComponent } from "react";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    tag: Tag;
  };
}

const PostCard: FunctionComponent<PostCardProps> = ({ post }) => {
  const { id, title, content, tag } = post;
  return (
    <div className="card w-full bg-base-100 shadow-xl border">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        <div className="card-actions justify-end">
          <span className="badge badge neutral">{tag.name}</span>
          {/* <button className="btn btn-primary">Buy Now</button> */}
          <Link href={`/blog/${id}`} className="hover:underline">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
