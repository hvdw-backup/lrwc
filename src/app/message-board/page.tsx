import CreatePost from "../components/CreatePost";
import BackButton from "../components/BackButton";
import PostsContainer from "../components/PostsContainer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

const MessageBoard = async () => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  if (session) {
    return (
      <main className="container">
        <BackButton />
        <h1 className="text-2xl my-4 font-bold text-center">
          LRWC Message Board
        </h1>
        {/* <FormPost isPendingSubmit submit={handleCreatePost} /> */}
        {/* @ts-ignore */}
        <CreatePost user={session.user} />
        {/* @ts-ignore */}
        <PostsContainer author={session.user} />
      </main>
    );
  }
};

export default MessageBoard;
