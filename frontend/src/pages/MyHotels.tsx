import { Link } from "react-router-dom";
import Layouts from "../layouts/Layouts";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { PiMapPin } from "react-icons/pi";

export default function MyHotels() {
  const { data: hotelData, isPending } = useQuery({
    queryKey: ["fetchMyHotel"],
    queryFn: apiClient.fetchMyHotels,
  });

  if (isPending) {
    return <span>Hotel Searching...</span>;
  }

  if (!hotelData) {
    return <span>No hotels found</span>;
  }

  return (
    <Layouts>
      <div className="container pt-12">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">My Hotels</h2>
          <Link
            to={"/add-hotel"}
            className="bg-green-500 px-6 py-2 rounded-md text-white"
          >
            Add Hotel
          </Link>
        </div>

        <div className="py-8 gap-6 grid grid-cols-12">
          {hotelData.map((hotel, idx) => (
            <div
              className="flex justify-start items-center gap-3 col-span-4 flex-col"
              key={idx}
            >
              <div className="h-[300px] self-stretch">
                <img
                  src={hotel.imageUrls[0]}
                  className=" object-cover w-full h-full rounded-t-xl "
                />
              </div>
              <div className="flex flex-col gap-3 border border-neutral-300 rounded-xl p-6 -mt-20 bg-white text-neutral-500">
                <h2 className="text-2xl font-semibold  text-slate-700">
                  {hotel.name}
                </h2>
                <div className="flex justify-start items-center text-sm gap-1 text-slate-700">
                  <PiMapPin />
                  <p>
                    {hotel.city}, {hotel.country}
                  </p>
                </div>
                <p className="text-sm">{hotel.description.slice(0, 130)}</p>

                <div className="flex justify-start items-center gap-2">
                  {hotel.facilities.slice(0, 3).map((item, idx) => (
                    <p
                      key={idx}
                      className="py-0.5 px-2 border rounded-full text-xs"
                    >
                      {item}
                    </p>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4">
                  <p className="text-3xl font-medium text-slate-800">
                    ${hotel.pricePerNight}{" "}
                    <span className="text-slate-500 text-sm font-medium">
                      /person
                    </span>
                  </p>
                  <Link
                    to={`/edit-hotel/${hotel._id}`}
                    className="bg-blue-600 text-white px-6 py-1 rounded-full"
                  >
                    Edit Hotel
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layouts>
  );
}
