import CreatePost from "../components/CreatePost";
import BackButton from "../components/BackButton";
import PostsContainer from "../components/PostsContainer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UpdateUserDetailsContainer from "../components/UpdateUserDetailsContainer";
import { useSession } from "next-auth/react";

const MessageBoard = async () => {
  const session = await auth();

  if (!session) redirect("/");

  if (session) {
    return (
      <main className="container">
        <BackButton />
        <h1 className="text-2xl my-4 font-bold text-center">
          LRWC Message Board
        </h1>
        {/* <FormPost isPendingSubmit submit={handleCreatePost} /> */}

        <CreatePost user={session.user} />
        <PostsContainer author={session.user} />
      </main>
    );
  }
};

export default MessageBoard;
