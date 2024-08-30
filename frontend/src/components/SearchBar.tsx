import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const search = useSearchContext();
  const navigate = useNavigate();

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

    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);

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
      <div className="">
        <label>
          Aduls:
          <input
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div className="">
        <label>
          Child Count:
          <input
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </label>
      </div>
      <DatePicker
        selected={checkIn}
        onChange={(date) => setCheckIn(date as Date)}
        selectsStart
        startDate={checkIn}
        endDate={checkOut}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText="Check In Date"
        className="relative z-50"
        wrapperClassName="min-w-full"
      />
      <DatePicker
        selected={checkOut}
        onChange={(date) => setCheckOut(date as Date)}
        selectsStart
        startDate={checkIn}
        endDate={checkOut}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText="Check In Date"
        className="relative z-50"
      />

      <button>Search</button>
    </form>
  );
}
