import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

export default function MyBookings() {
  const { data: hotels } = useQuery({
    queryKey: ["fetchMyBookings"],
    queryFn: apiClient.fetchMyBookings,
  });

  if (!hotels || hotels.length === 0) {
    return <p>No bookings found</p>;
  }

  return (
    <div>
      {hotels.map((hotel) => (
        <div className="">
          <p>{hotel.name}</p>
          <div className="">
            {hotel.bookings.map((booking) => (
              <p>{booking.email}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
