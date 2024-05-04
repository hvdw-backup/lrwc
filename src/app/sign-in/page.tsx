import SignInForm from "../components/SignInForm";
import SignOutButton from "../components/SignOutButton";

const NewUserPage = async () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-10 font-bold text-center">
        Sign in to the LRWC Forum
      </h1>
      <SignInForm />
    </div>
  );
};

export default NewUserPage;
