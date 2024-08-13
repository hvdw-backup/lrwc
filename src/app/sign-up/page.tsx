"use client";
import { getServerSession } from "next-auth";
import NewUserForm from "../components/NewUserForm";
import { getApprovedUsers } from "../lib/getApprovedUsers";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

const NewUserPage = () => {
  // const approvedUsers = await getApprovedUsers();

  // const data = await getServerSession(authOptions);

  const { data } = useSession();

  console.log(data, "data");

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-10 font-bold text-center">
        Sign up to the LRWC forum
      </h1>
      {/* <NewUserForm approvedUsers={approvedUsers} /> */}
    </div>
  );
};

export default NewUserPage;
