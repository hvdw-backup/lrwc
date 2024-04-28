import Image from "next/image";
import PostCard from "./components/PostCard";
import { db } from "./lib/db";

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

export default async function Home() {
  // COMING FROM THE SERVER
  const posts = await getPosts();
  console.log(posts, "posts");

  return (
    <main className="grid item-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
