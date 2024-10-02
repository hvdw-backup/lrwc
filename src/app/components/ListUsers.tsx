"use client";
import { FunctionComponent, useState } from "react";
import { getApprovedUsers } from "../lib/userActions";
import { Trash2 } from "lucide-react";
import { User } from "../types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ListUsersProps {
  approvedUsers: {
    id: string;
    email: string;
  }[];
  users: {
    id: string;
    email: string;
    username: string | null;
    about: string | null;
  }[];
  isAdmin: boolean;
}

const ListUsers: FunctionComponent<ListUsersProps> = ({
  approvedUsers,
  users,
  isAdmin,
}) => {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: async () => {
      const apiPath = `/api/approved-user/${userId}`;
      return axios.delete(apiPath);
    },
    onError: (error) => {
      console.error(error, `delete approved-user error`);
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="container">
      {isAdmin && (
        <>
          <h3 className="text-2xl my-4 font-bold text-center">
            Registered users
          </h3>
          <ul>
            {approvedUsers?.map((user) => (
              <div key={user.id}>
                <button
                  className="btn btn-sm self-start inline-block mr-3"
                  onClick={() => {
                    setUserId(user.id);
                    deleteUser();
                  }}
                >
                  <Trash2 color="#dd2d53" />
                </button>
                <li className="inline-block mb-3">{user.email}</li>
                <br />
              </div>
            ))}
          </ul>
        </>
      )}
      <h3 className="text-2xl my-4 font-bold text-center">Members</h3>
      <ul>
        {users?.map((user) => (
          <div key={user.id}>
            <li className="inline-block m-3">{user.username}</li>
            <li className="inline-block m-3">{user.email}</li>
            <li className="inline-block m-3">{user.about}</li>
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
