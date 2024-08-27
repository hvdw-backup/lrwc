import CreatePost from "../components/CreatePost";
import BackButton from "../components/BackButton";
import PostsContainer from "../components/PostsContainer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RegisterUserDetails from "../components/RegisterUserDetails";

const MessageBoard = async () => {
  const session = await auth();

  if (!session) redirect("/");

  //@ts-ignore - need to find out how to update the expected Session types
  if (session.user?.username === "lovely") {
    return <RegisterUserDetails email={session.user?.email} />;
  }

  if (session) {
    return (
      <main className="container">
        <BackButton />
        <h1 className="text-2xl my-4 font-bold text-center">
          LRWC Message Board
        </h1>
        {/* <FormPost isPendingSubmit submit={handleCreatePost} /> */}

        <h1>user: {JSON.stringify(session)}</h1>
        <CreatePost />
        <PostsContainer />
      </main>
    );
  }
};

export default MessageBoard;
