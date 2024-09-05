import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../components/GuestInfoForm";
import Layouts from "../layouts/Layouts";
import { PiArrowRight, PiMapPin } from "react-icons/pi";

export default function HotelDetails() {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelById"],
    queryFn: () => apiClient.fetchHotelById(hotelId as string),
    enabled: !!hotelId,
  });

  if (!hotel) {
    return <p>Hotel Not Found</p>;
  }

  return (
    <Layouts>
      <div className="grid grid-cols-12 gap-6 container pb-30">
        <div className=" col-span-8 gap-4 grid grid-cols-12">
          {hotel.imageUrls.map((image, idx) => (
            <div className="col-span-4">
              <img
                src={image}
                alt=""
                key={idx}
                className="h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
        <div className="col-span-4">
          <GuestInfoForm
            hotelId={hotel._id}
            pricePerNight={hotel.pricePerNight}
          />
        </div>
        <div className="col-span-8">
          <h1 className="text-3xl font-semibold text-slate-800">
            {hotel.name}
          </h1>
          <div className="flex justify-start items-center">
            {Array.from({ length: hotel.starRating }).map(() => (
              <AiFillStar className="text-yellow-500" />
            ))}
          </div>
          <div className="flex justify-start items-center gap-1 text-slate-500 pt-1">
            <PiMapPin />
            {hotel.country}
          </div>
          <p className="text-slate-500 text-sm pt-4">{hotel.description}</p>

          <ul className="flex flex-col gap-2 pt-6">
            {hotel.facilities.map((item, idx) => (
              <li key={idx} className="flex justify-start items-center gap-1">
                {" "}
                <PiArrowRight /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layouts>
  );
}
