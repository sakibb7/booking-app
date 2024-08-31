import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../context/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";

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

  console.log(hotelData);

  return (
    <div>
      {page}{" "}
      <button className="" onClick={() => setPage(3)}>
        set Page
      </button>
    </div>
  );
}
