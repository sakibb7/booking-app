import { Link } from "react-router-dom";
import heroImg from "../../assets/images/hero_img.jpg";
import { PiPlayFill } from "react-icons/pi";
import SearchBar from "../SearchBar";
function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12">
      <section className=" container flex justify-between items-center gap-8">
        <div className="w-1/2">
          <h1 className="text-6xl font-bold text-slate-800">
            <span className="text-orange-500">Best Holiday</span> Starts From
            Here
          </h1>
          <p className=" font-medium pt-3 text-slate-500">
            Planning for a trip? We will organize your trip with the best places
            and within best budget!
          </p>

          <div className="flex justify-start items-center gap-4 pt-6">
            <Link
              to={"/all-hotels"}
              className="text-orange-500 py-2 px-3 rounded-md font-medium bg-orange-50"
            >
              Discover Now
            </Link>
            <div className="flex justify-start items-center gap-2 text-sm font-medium text-slate-700">
              <div className="relative">
                {" "}
                <img
                  src={heroImg}
                  alt=""
                  className="size-9 rounded-full object-cover"
                />{" "}
                <PiPlayFill className="absolute top-2 left-2 text-xl text-white" />
              </div>
              <span>Watch Our Story</span>
            </div>
          </div>

          <SearchBar />
        </div>
        <div className="">
          <img src={heroImg} alt="" className="rounded-xl max-w-[550px]" />
        </div>
      </section>
    </section>
  );
}

export default HeroSection;
