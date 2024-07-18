import ApprovedUserForm from "../components/ApprovedUserForm";
import ListUsers from "../components/ListUsers";

const ApprovedUserPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl my-4 font-bold text-center">
        Add users to the forum
      </h1>
      <h2 className="text-xl my-4 text-center">
        Adding an email address to the form means the PERSON <br />
        with this email will be able to join the LRWC forum
      </h2>
      <ApprovedUserForm />
      <ListUsers />
    </div>
  );
};

export default ApprovedUserPage;
