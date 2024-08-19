import { LuDollarSign } from "react-icons/lu";
import { Link } from "react-router-dom";
import usaLogo from "../../assets/images/usa-logo.png";
import logo from "../../assets/images/icon.png";
import { useAppContext } from "../../context/AppContext";
import SignOutButton from "../ui/SignOutButton";

export default function Header() {
  const { isLoggedIn } = useAppContext();
  return (
    <header className="bg-gray-900 py-4">
      <div className="container flex justify-between items-center ">
        <div className="flex justify-start items-center gap-2">
          <img src={logo} alt="" className="size-10" />
          <Link to={"/"} className="text-3xl font-semibold  text-white">
            Bookinger
          </Link>
        </div>

        <div className="flex justify-end items-center gap-4">
          <div className="flex justify-center items-center gap-4">
            <div className="flex justify-center items-center gap-1 text-white">
              <p className="leading-none pt-1 font-medium ">USD</p>
              <LuDollarSign />
            </div>
            <img src={usaLogo} alt="" className="size-6" />
          </div>
          {isLoggedIn ? (
            <>
              <Link
                to={"/profile"}
                className=" font-medium text-p1  hover:underline duration-500"
              >
                My Profile
              </Link>

              <SignOutButton />
            </>
          ) : (
            <div className="flex justify-end items-center gap-3">
              <Link
                to={"/sign-in"}
                className=" font-medium text-p1  hover:underline duration-500"
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
          )}
        </div>
      </div>
    </header>
  );
}
