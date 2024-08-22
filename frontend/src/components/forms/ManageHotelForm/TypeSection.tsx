import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

export default function TypeSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");
  return (
    <div className="">
      <h2 className="text-2xl font-bold">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((item, idx) => (
          <label
            key={idx}
            className={`${typeWatch === item ? "text-red-600" : ""}`}
          >
            <input
              type="radio"
              value={item}
              {...register("type", {
                required: "this field is required",
              })}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500">{errors.type.message}</span>
      )}
    </div>
  );
}
