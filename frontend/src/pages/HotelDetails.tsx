import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../components/GuestInfoForm";

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
    <div>
      <h1>{hotel.name}</h1>
      {Array.from({ length: hotel.starRating }).map(() => (
        <AiFillStar className="text-yellow-500" />
      ))}
      <GuestInfoForm hotelId={hotel._id} pricePerNight={hotel.pricePerNight} />
    </div>
  );
}
