import { FunctionComponent } from "react";
import { db } from "../../../prisma/db";
import { User } from "../types";
import PostCard from "./PostCard";
import { unstable_noStore as noStore } from "next/cache";

export const getUsers = async () => {
  noStore();
  const response = await db.user?.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      about: true,
    },
  });

  return response;
};

const getPosts = async () => {
  noStore();
  const response = await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      userId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response;
};

const getReplies = async () => {
  noStore();
  const response = await db.reply.findMany({
    select: {
      id: true,
      content: true,
      postId: true,
      userId: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return response;
};

interface PostsContainerProps {
  author: User;
}

const PostsContainer: FunctionComponent<PostsContainerProps> = async ({
  author,
}) => {
  const posts = await getPosts();
  const replies = await getReplies();
  const users = await getUsers();

  return (
    <section>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          replies={replies}
          users={users}
          author={author}
        />
      ))}
    </section>
  );
};

export default PostsContainer;
