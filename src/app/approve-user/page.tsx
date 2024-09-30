import { auth } from "@/auth";
import ApprovedUserForm from "../components/ApprovedUserForm";
import ListUsers from "../components/ListUsers";
import { redirect } from "next/navigation";
import { getApprovedUsers, getUsers } from "../lib/userActions";

const ApprovedUserPage = async () => {
  const session = await auth();

  if (!session) redirect("/");

  if (session) {
    const users = await getUsers();
    const approvedUsers = await getApprovedUsers();

    const isAdmin = session.user?.email === "hannahvdw@duck.com";

    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl my-4 font-bold text-center">
          Add a member to the forum
        </h1>
        <h2 className="text-xl my-4 text-center">
          Adding an email address to the form means
          <br />
          this person can join the LRWC forum
        </h2>
        <ApprovedUserForm />
        <ListUsers
          isAdmin={isAdmin}
          approvedUsers={approvedUsers}
          users={users}
        />
      </div>
    );
  }
};

export default ApprovedUserPage;
