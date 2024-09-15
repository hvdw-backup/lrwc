import { BookX } from "lucide-react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  return (
    <div className="navbar bg-base-200">
      <div className="container">
        <div className="flex-1">
          <Link href="/">
            <BookX color="#00965f" />
          </Link>
        </div>
        <div className="flex">
          <Link href={"/approve-user"} className="btn btn-ghost">
            Add a user
          </Link>
          <Link href={"/message-board"} className="btn btn-ghost mr-5">
            Message Board
          </Link>{" "}
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
