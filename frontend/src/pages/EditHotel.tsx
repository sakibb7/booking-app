import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../components/forms/ManageHotelForm/ManageHotelForm";
import Layouts from "../layouts/Layouts";
import { useAppContext } from "../context/AppContext";

export default function EditHotel() {
  const { showToast } = useAppContext();
  const { hotelId } = useParams();

  const { data: hotel } = useQuery({
    queryKey: ["fetchMyHotelById"],
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateMyHotelById,
    onSuccess: () => {
      showToast({ message: "Hotel updated!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Updating Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <Layouts>
      <div className="container">
        <ManageHotelForm
          hotel={hotel}
          onSave={handleSave}
          isPending={isPending}
        />
      </div>
    </Layouts>
  );
}
