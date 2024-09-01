import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../context/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import Pagination from "../components/Pagination";

export default function SearchPage() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  const { data: hotelData } = useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
  });

  return (
    <div>
      {hotelData?.data.map((hotel) => (
        <div className="" key={hotel._id}>
          {hotel.name}
          <img src={hotel.imageUrls[0]} alt="" />
        </div>
      ))}
      <Pagination
        page={hotelData?.pagination.page || 1}
        pages={hotelData?.pagination.pages || 1}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
}
