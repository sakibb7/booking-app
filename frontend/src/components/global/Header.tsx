import { LuChevronDown } from "react-icons/lu";
import { Link } from "react-router-dom";
import usaLogo from "../../assets/images/usa-logo.png";
import logo from "../../assets/images/icon.png";
import { useAppContext } from "../../context/AppContext";
import SignOutButton from "../ui/SignOutButton";
import { useState } from "react";

export default function Header() {
  const { isLoggedIn } = useAppContext();
  const [showRegionModal, setShowRegionModal] = useState(false);
  return (
    <header className=" py-4">
      <div className="container flex justify-between items-center ">
        <div className="flex justify-start items-center">
          <img src={logo} alt="" className="size-10" />
          <Link to={"/"} className="text-xl font-semibold  ">
            Bookinger
          </Link>
        </div>

        <div className="flex justify-end items-center gap-4">
          <div className="flex justify-center items-center gap-4">
            <div className=" relative">
              <div
                onClick={() => setShowRegionModal((prev) => !prev)}
                className="flex justify-start items-center gap-0.5 relative cursor-pointer"
              >
                <img src={usaLogo} alt="" className="size-6" />
                <span className="pl-1 text-sm text-slate-700">USD</span>
                <LuChevronDown />
              </div>
              <div
                className={`absolute top-8 right-0 bg-white py-4 flex justify-start items-start shadow-2xl z-20 rounded-md max-h-[180px] overflow-y-auto duration-300 ${
                  showRegionModal
                    ? "translate-y-0 opacity-100 visible"
                    : "translate-y-2 opacity-0 invisible"
                }`}
              >
                <div className=" border-r ">
                  <p className="text-sm font-medium pl-5">Country</p>
                  <ul className="text-sm pt-2">
                    <li className="py-1 pr-20 pl-5 hover:bg-slate-100 duration-300">
                      USA
                    </li>
                    <li className="py-1 pr-20 pl-5 hover:bg-slate-100 duration-300">
                      UK
                    </li>
                    <li className="py-1 pr-20 pl-5 hover:bg-slate-100 duration-300">
                      UAE
                    </li>
                    <li className="py-1 pr-20 pl-5 hover:bg-slate-100 duration-300">
                      Aus
                    </li>
                    <li className="py-1 pr-20 pl-5 hover:bg-slate-100 duration-300">
                      NZ
                    </li>
                    <li className="py-1 pr-20 pl-5 hover:bg-slate-100 duration-300">
                      Ger
                    </li>
                  </ul>
                </div>
                <div className=" ">
                  <p className="text-sm font-medium pl-5">Region</p>
                  <ul className="text-sm pt-2">
                    <li className="py-1 pr-16 pl-5 hover:bg-slate-100 duration-300">
                      USD
                    </li>
                    <li className="py-1 pr-16 pl-5 hover:bg-slate-100 duration-300">
                      UKD
                    </li>
                    <li className="py-1 pr-16 pl-5 hover:bg-slate-100 duration-300">
                      UAE
                    </li>
                    <li className="py-1 pr-16 pl-5 hover:bg-slate-100 duration-300">
                      Aus
                    </li>
                    <li className="py-1 pr-16 pl-5 hover:bg-slate-100 duration-300">
                      NZ
                    </li>
                    <li className="py-1 pr-16 pl-5 hover:bg-slate-100 duration-300">
                      Ger
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {isLoggedIn ? (
            <>
              <Link
                to={"/my-hotels"}
                className=" font-medium text-p1  hover:underline duration-500"
              >
                My Hotels
              </Link>

              <SignOutButton />
            </>
          ) : (
            <div className="flex justify-end items-center gap-3">
              <Link
                to={"/sign-in"}
                className="text-slate-700 border border-slate-700 py-1 px-3 rounded-md hover:bg-slate-700 hover:text-white duration-300 text-sm"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
