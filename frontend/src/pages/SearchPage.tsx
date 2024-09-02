import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../context/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypeFilter from "../components/HotelTypeFilter";
import HotelFacilities from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

export default function SearchPage() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilites, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilites,
    maxPrice: selectedPrice?.toString(),
    sortOption,
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

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prev) =>
      event.target.checked
        ? [...prev, hotelType]
        : prev.filter((type) => type !== hotelType)
    );
  };

  const handleFacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelFacility = event.target.value;

    setSelectedFacilities((prev) =>
      event.target.checked
        ? [...prev, hotelFacility]
        : prev.filter((facility) => facility !== hotelFacility)
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
      <div className="">
        Filter By Types
        <HotelTypeFilter
          onChange={handleHotelTypeChange}
          selectedHotelTypes={selectedHotelTypes}
        />
      </div>

      <div className="">
        Filter by facility
        <HotelFacilities
          onChange={handleFacilitiesChange}
          selectedFacilities={selectedFacilites}
        />
      </div>

      <div className="">
        <PriceFilter
          selectedPrice={selectedPrice}
          onChange={(value?: number) => setSelectedPrice(value)}
        />
      </div>
      <select
        value={sortOption}
        onChange={(e) => {
          setSortOption(e.target.value);
        }}
      >
        <option value="">Sort By</option>
        <option value="starRating">Star Rating</option>
        <option value="pricePerNightAsc">Price Per Night (Low To High)</option>
        <option value="pricePerNightDesc">Price Per Night (High To Low)</option>
      </select>
      {hotelData?.data.map((hotel) => (
        <div className="" key={hotel._id}>
          {hotel.name}
          <img src={hotel.imageUrls[0]} alt="" className="h-[200px]" />
          {hotel.starRating}
          {hotel.type}
          {hotel.pricePerNight}
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
