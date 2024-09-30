import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UpdateUserDetailsForm from "../components/UpdateUserDetailsForm";

const UpdateUserDetailsPage = async () => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  //@ts-ignore - need to find out how to update the expected Session types
  if (session) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-3xl my-10 font-bold text-center">
          Update your profile
        </h1>
        {/* @ts-ignore */}
        <UpdateUserDetailsForm user={session.user} />
      </div>
    );
  }
};

export default UpdateUserDetailsPage;
