import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../context/SearchContext";
import { useAppContext } from "../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

export default function GuestInfoForm({ hotelId, pricePerNight }: Props) {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <form
      onSubmit={
        isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
      }
      className="border p-4 rounded-xl"
    >
      <div className=" pb-4">
        <p className="text-slate-500 text-sm">Price Starts from</p>
        <p className="text-3xl font-medium">${pricePerNight}</p>
      </div>
      <div className="flex justify-between items-center gap-4 overflow-hidden pb-4">
        <div className="">
          <DatePicker
            required
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date as Date)}
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
        <div className="">
          <DatePicker
            required
            selected={checkOut}
            onChange={(date) => setValue("checkOut", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check In Date"
            className="relative z-50 outline-none "
            wrapperClassName="max-w-min"
          />
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 pb-4">
        <div className="border p-4 rounded-md flex justify-center items-center w-full">
          <p className="text-slate-400">Adults:</p>
          <label>
            <input
              type="number"
              min={1}
              max={20}
              className="outline-none  text-center w-full"
              {...register("adultCount", {
                required: "this field is required",
                min: {
                  value: 1,
                  message: "there must be at least one adult",
                },
                valueAsNumber: true,
              })}
            />
          </label>
        </div>
        <div className="border p-4 rounded-md flex justify-center items-center w-full">
          <p className="text-slate-400">Child:</p>
          <label>
            <input
              type="number"
              min={0}
              max={20}
              className="outline-none pl-4 w-full"
              {...register("childCount", {
                valueAsNumber: true,
              })}
            />
          </label>
          {errors.adultCount && (
            <span className="text-red-600">{errors.adultCount.message}</span>
          )}
        </div>
      </div>
      {isLoggedIn ? (
        <button className="w-full bg-slate-700 text-white py-3 font-medium rounded-xl hover:bg-p1 duration-300">
          Book Now
        </button>
      ) : (
        <button>Please Sign in to book</button>
      )}
    </form>
  );
}
