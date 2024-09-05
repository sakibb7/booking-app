import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../context/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypeFilter from "../components/HotelTypeFilter";
import HotelFacilities from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import { Link } from "react-router-dom";
import Layouts from "../layouts/Layouts";
import searchBg from "../assets/images/hotel-breadcrumb.jpg";
import SearchBar from "../components/SearchBar";
import { PiHeart, PiHouse, PiMapPin } from "react-icons/pi";
import { AiFillStar } from "react-icons/ai";

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
    <Layouts>
      <div className="relative flex justify-center items-center flex-col py-20 ">
        <img
          src={searchBg}
          alt=""
          className=" h-full w-full object-cover absolute top-0 left-0 right-0"
        />
        <div className="absolute z-10 inset-0 bg-black opacity-50"></div>
        <h1 className="text-5xl font-bold text-center pb-12 relative z-10 text-white">
          Book Your Hotel Now
        </h1>
        <SearchBar />
      </div>
      <div className="container grid grid-cols-12 gap-6 py-30">
        <div className="col-span-3 flex flex-col gap-6">
          <div className="">
            <PriceFilter
              selectedPrice={selectedPrice}
              onChange={(value?: number) => setSelectedPrice(value)}
            />
          </div>
          <div className="">
            <StarRatingFilter
              selectedStars={selectedStars}
              onChange={handleStarChange}
            />{" "}
          </div>
          <div className="">
            <HotelTypeFilter
              onChange={handleHotelTypeChange}
              selectedHotelTypes={selectedHotelTypes}
            />
          </div>

          <div className="">
            <HotelFacilities
              onChange={handleFacilitiesChange}
              selectedFacilities={selectedFacilites}
            />
          </div>
        </div>
        <div className="col-span-8">
          <div>
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
              }}
            >
              <option value="">Sort By</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">
                Price Per Night (Low To High)
              </option>
              <option value="pricePerNightDesc">
                Price Per Night (High To Low)
              </option>
            </select>
            <div className="flex justify-between items-start gap-6 flex-col pt-8">
              {hotelData?.data.map((hotel) => (
                <div
                  className="flex justify-start items-center gap-6 bg-slate-50 rounded-xl w-full"
                  key={hotel._id}
                >
                  <div className=" w-[350px] h-[250px] rounded-xl overflow-hidden">
                    <img
                      src={hotel.imageUrls[0]}
                      alt=""
                      className=" h-full w-full object-cover"
                    />
                  </div>
                  <div className="pr-6 w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-start items-center pb-1">
                        {Array.from({ length: hotel.starRating }).map(() => (
                          <AiFillStar className="text-yellow-400" />
                        ))}
                      </div>
                      <div className="flex justify-start items-center gap-2 text-lg">
                        <PiHeart />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-slate-800">
                      {hotel.name}
                    </h2>
                    <p className="text-slate-600 flex justify-start items-center gap-1">
                      <PiMapPin />
                      {hotel.country}
                    </p>

                    <p className="text-slate-700 font-medium pt-4 flex justify-start items-center gap-1">
                      <PiHouse /> {hotel.type} Hotel{" "}
                    </p>
                    <p className="text-sm text-slate-600 py-3">
                      {hotel.description.slice(0, 120)}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-medium text-slate-800">
                        {" "}
                        ${hotel.pricePerNight}
                        <span className="text-sm text-slate-500">/night</span>
                      </p>
                      <Link
                        to={`/details/${hotel._id}`}
                        className="text-white bg-p1 py-2 px-4 rounded-lg text-sm"
                      >
                        See Availability
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              page={hotelData?.pagination.page || 1}
              pages={hotelData?.pagination.pages || 1}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>
    </Layouts>
  );
}
