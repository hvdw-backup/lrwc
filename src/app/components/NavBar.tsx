import { BookX } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200">
      <div className="container">
        <div className="flex-1">
          <Link href="/">
            <BookX color="#00965f" />
          </Link>
        </div>
        <div className="flex-none">
          <Link href={"/message-board"} className="btn btn-ghost">
            Message Board
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
