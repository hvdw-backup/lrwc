import { signOut } from "../../../auth";

const SignOutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="btn btn-primary">Sign out</button>
    </form>
  );
};

export default SignOutButton;
