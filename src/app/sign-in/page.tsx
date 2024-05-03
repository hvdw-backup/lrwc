import SignInForm from "../components/SignInForm";

const NewUserPage = async () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl my-4 font-bold text-center">
        Sign in to the LRWC forum
      </h1>
      <SignInForm />
    </div>
  );
};

export default NewUserPage;
