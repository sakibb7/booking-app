import Layouts from "../layouts/Layouts";
import ManageHotelForm from "../components/forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../context/AppContext";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";

export default function AddHotel() {
  const { showToast } = useAppContext();
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({ message: "Hotel saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <Layouts>
      <div className="container pt-10">
        <ManageHotelForm onSave={handleSave} isPending={isPending} />
      </div>
    </Layouts>
  );
}
