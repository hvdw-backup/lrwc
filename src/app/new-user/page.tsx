import NewUserForm from "../components/NewUserForm";
import { getApprovedUsers } from "../lib/getApprovedUsers";

const NewUserPage = async () => {
  const approvedUsers = await getApprovedUsers();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl my-4 font-bold text-center">
        Sign up to the LRWC forum
      </h1>
      <NewUserForm approvedUsers={approvedUsers} />
    </div>
  );
};

export default NewUserPage;
