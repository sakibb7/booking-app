import { HotelFormData } from "./ManageHotelForm";
import { useFormContext } from "react-hook-form";

export default function GuestsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-3"> Guests</h2>
      <div className="flex justify-between items-center gap-3">
        <label className="w-full">
          Adults
          <input
            type="number"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
            className="border"
          />
        </label>
        {errors.adultCount && (
          <span className="text-red-500 text-sm font-bold">
            {errors.adultCount.message}
          </span>
        )}
        <label className="w-full">
          Childrens
          <input
            type="number"
            {...register("childCount", {
              required: "This field is required",
            })}
            min={0}
            className="border"
          />
        </label>
        {errors.childCount && (
          <span className="text-red-500 text-sm font-bold">
            {errors.childCount.message}
          </span>
        )}
      </div>
    </div>
  );
}
