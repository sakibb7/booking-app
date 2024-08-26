import { Link } from "react-router-dom";
import Layouts from "../layouts/Layouts";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

export default function MyHotels() {
  const { data: hotelData } = useQuery({
    queryKey: ["fetchMyHotel"],
    queryFn: apiClient.fetchMyHotels,
  });

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

        <div className="py-8">
          {hotelData.map((hotel, idx) => (
            <div className="" key={idx}>
              {hotel.name}
              {hotel.description}
            </div>
          ))}
        </div>
      </div>
    </Layouts>
  );
}
