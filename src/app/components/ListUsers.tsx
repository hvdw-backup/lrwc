import { FunctionComponent } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "../../../prisma/db";

const getApprovedUsers = async () => {
  noStore();
  const response = await db.approvedUsers?.findMany({
    select: {
      id: true,
      email: true,
    },
  });

  return response;
};

const ListUsers: FunctionComponent = async () => {
  const users = await getApprovedUsers();

  return (
    <div className="container">
      <h3 className="text-2xl my-4 font-bold text-center">Registered users</h3>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
