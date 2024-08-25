import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function ImagesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-3"> Images</h2>
      <div className="border">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0) {
                return " At Least one image should be added";
              }

              if (totalLength > 6) {
                return "Total no of images cannot be more than 6";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
}
