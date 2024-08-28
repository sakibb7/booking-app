import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";

export default function SearchBar() {
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <input
          type="text"
          value={destination}
          placeholder="Where are you going?"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
    </form>
  );
}
