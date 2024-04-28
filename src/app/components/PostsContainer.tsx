import { db } from "../lib/db";
import PostCard from "./PostCard";

const getPosts = async () => {
  const response = await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response;
};

const PostsContainer = async () => {
  // COMING FROM THE SERVER
  const posts = await getPosts();
  return (
    <section>
      {" "}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostsContainer;
