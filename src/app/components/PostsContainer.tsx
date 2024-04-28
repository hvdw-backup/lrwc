import { db } from "../lib/db";
import PostCard from "./PostCard";

const getPosts = async () => {
  const response = await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      Reply: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response;
};

const getReplies = async () => {
  const response = await db.reply.findMany({
    select: {
      id: true,
      content: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return response;
};

const PostsContainer = async () => {
  // COMING FROM THE SERVER
  const posts = await getPosts();
  const replies = await getReplies();

  return (
    <section>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} replies={replies} />
      ))}
    </section>
  );
};

export default PostsContainer;
