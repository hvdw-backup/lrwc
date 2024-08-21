import CreatePost from "../components/CreatePost";
import BackButton from "../components/BackButton";
import PostsContainer from "../components/PostsContainer";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

const MessageBoard = async () => {
  const session = await auth();

  return (
    <main className="container">
      <BackButton />
      <h1 className="text-2xl my-4 font-bold text-center">
        LRWC Message Board
      </h1>
      {/* <FormPost isPendingSubmit submit={handleCreatePost} /> */}

      <h1>user: {JSON.stringify(session?.user)}</h1>
      <CreatePost />
      <PostsContainer />
    </main>
  );
};

export default MessageBoard;
