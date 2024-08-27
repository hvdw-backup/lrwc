import { BookX } from "lucide-react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200">
      <div className="container">
        <div className="flex-1">
          <Link href="/">
            <BookX color="#00965f" />
          </Link>
        </div>
        <div className="flex">
          <Link href={"/message-board"} className="btn btn-ghost">
            Message Board
          </Link>
          {/* TODO: conditionally render */}
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
