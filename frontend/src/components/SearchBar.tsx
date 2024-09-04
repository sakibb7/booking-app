import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { PiMapPin } from "react-icons/pi";

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
    <form
      onSubmit={handleSubmit}
      className=" bg-white box-shadow-3 w-[1000px] relative z-10 flex justify-between items-center p-6 text-slate-700 text-sm rounded-md border border-slate-200"
    >
      <div className=" flex justify-start items-center gap-2 border p-4 rounded-md ">
        <PiMapPin />
        <input
          type="text"
          value={destination}
          placeholder="Select Location"
          onChange={(e) => setDestination(e.target.value)}
          className="bg-transparent text-sm placeholder:text-sm outline-none max-w-[150px] w-full"
        />
      </div>
      <div className="border p-4 rounded-md flex justify-center items-center">
        <p className="text-slate-400">Adults:</p>
        <label>
          <input
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
            className="outline-none max-w-10 text-center"
          />
        </label>
      </div>
      <div className="border p-4 rounded-md flex justify-center items-center">
        <p className="text-slate-400">Child:</p>
        <label>
          <input
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
            className="outline-none pl-4 max-w-16 "
          />
        </label>
      </div>
      <div className="border p-1 pl-4 rounded-md overflow-hidden ">
        <p className="pb-1 text-slate-400">Start Date:</p>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check In Date"
          className="relative z-50 outline-none "
          wrapperClassName="max-w-[150px]"
        />
      </div>
      <div className="border p-1 pl-4 rounded-md overflow-hidden ">
        <p className="pb-1 text-slate-400">End Date:</p>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check In Date"
          className="relative z-50 outline-none"
          wrapperClassName="max-w-[150px]"
        />
      </div>
      {/* 
      
      
      */}

      <button className=" px-6 py-4 rounded-md bg-slate-700 text-white">
        Search
      </button>
    </form>
  );
}
