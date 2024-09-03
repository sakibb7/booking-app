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
    >
      ${pricePerNight}
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
          wrapperClassName="max-w-[150px]"
        />
      </div>
      <div className="border p-4 rounded-md flex justify-center items-center">
        <p className="text-slate-400">Adults:</p>
        <label>
          <input
            type="number"
            min={1}
            max={20}
            className="outline-none max-w-10 text-center"
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
      <div className="border p-4 rounded-md flex justify-center items-center">
        <p className="text-slate-400">Child:</p>
        <label>
          <input
            type="number"
            min={0}
            max={20}
            className="outline-none pl-4 max-w-16 "
            {...register("childCount", {
              valueAsNumber: true,
            })}
          />
        </label>
        {errors.adultCount && (
          <span className="text-red-600">{errors.adultCount.message}</span>
        )}
      </div>
      {isLoggedIn ? (
        <button>Book Now</button>
      ) : (
        <button>Please Sign in to book</button>
      )}
    </form>
  );
}
