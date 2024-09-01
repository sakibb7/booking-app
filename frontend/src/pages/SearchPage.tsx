import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../context/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";

export default function SearchPage() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
  };

  const { data: hotelData } = useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
  });

  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prev) =>
      event.target.checked
        ? [...prev, starRating]
        : prev.filter((star) => star !== starRating)
    );
  };

  return (
    <div>
      <div className="">
        Filter By :{" "}
        <StarRatingFilter
          selectedStars={selectedStars}
          onChange={handleStarChange}
        />{" "}
      </div>
      {hotelData?.data.map((hotel) => (
        <div className="" key={hotel._id}>
          {hotel.name}
          <img src={hotel.imageUrls[0]} alt="" className="h-[200px]" />
          {hotel.starRating}
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
