import { LuDollarSign } from "react-icons/lu";
import { Link } from "react-router-dom";
import usaLogo from "../../assets/images/usa-logo.png";

export default function Header() {
  return (
    <header>
      <div className="container flex justify-between items-center pt-3">
        <Link
          to={"/"}
          className="text-2xl font-semibold tracking-wide text-[#22668D]"
        >
          Bookinger
        </Link>

        <div className="flex justify-end items-center gap-4">
          <div className="flex justify-center items-center gap-4">
            <div className="flex justify-center items-center gap-1 ">
              <p className="leading-none pt-1 font-medium ">USD</p>
              <LuDollarSign />
            </div>
            <img src={usaLogo} alt="" className="size-6" />
          </div>
          <div className="flex justify-end items-center gap-3">
            <Link
              to={"/sign-in"}
              className="text-lg text-p1 font-medium  hover:underline duration-500"
            >
              Sign In
            </Link>
            <Link
              to={"/sign-up"}
              className="text-lg  font-medium border bg-p1 border-p1 rounded-md px-3 py-1 text-white duration-500 hover:bg-white hover:text-p1"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
