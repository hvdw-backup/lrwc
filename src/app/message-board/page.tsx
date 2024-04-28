import CreatePost from "../components/CreatePost";
import BackButton from "../components/BackButton";
import PostsContainer from "../components/PostsContainer";

const MessageBoard = () => {
  return (
    <main className="container">
      <BackButton />
      <h1 className="text-2xl my-4 font-bold text-center">
        LRWC Message Board
      </h1>
      {/* <FormPost isPendingSubmit submit={handleCreatePost} /> */}
      <CreatePost />
      <PostsContainer />
    </main>
  );
};

export default MessageBoard;
