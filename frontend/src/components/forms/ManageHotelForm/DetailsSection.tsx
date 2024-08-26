import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function DetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-semibold">Add Hotel</h2>

      <label className="w-full">
        Name
        <div className="border border-gray-500 rounded-md p-2">
          <input
            type="text"
            placeholder="name"
            className="w-full outline-none bg-transparent text-gray-700"
            {...register("name", {
              required: "This field is required",
            })}
          />
        </div>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <label className="w-full">
        City
        <div className="border border-gray-500 rounded-md p-2">
          <input
            type="text"
            placeholder="City"
            className="w-full outline-none bg-transparent text-gray-700"
            {...register("city", {
              required: "This field is required",
            })}
          />
        </div>
        {errors.city && (
          <span className="text-red-500">{errors.city.message}</span>
        )}
      </label>
      <label className="w-full">
        Country
        <div className="border border-gray-500 rounded-md p-2">
          <input
            type="text"
            placeholder="Country"
            className="w-full outline-none bg-transparent text-gray-700"
            {...register("country", {
              required: "This field is required",
            })}
          />
        </div>
        {errors.country && (
          <span className="text-red-500">{errors.country.message}</span>
        )}
      </label>
      <label className="w-full">
        Description
        <div className="border border-gray-500 rounded-md p-2">
          <textarea
            rows={10}
            placeholder="description"
            className="w-full outline-none bg-transparent text-gray-700"
            {...register("description", {
              required: "This field is required",
            })}
          ></textarea>
        </div>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="w-full">
        Price Per Night
        <div className="border border-gray-500 rounded-md p-2">
          <input
            type="number"
            placeholder="Price"
            className="w-full outline-none bg-transparent text-gray-700"
            {...register("pricePerNight", {
              required: "This field is required",
            })}
          />
        </div>
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="w-full">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
}
