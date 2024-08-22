import Layouts from "../layouts/Layouts";
import ManageHotelForm from "../components/forms/ManageHotelForm/ManageHotelForm";

export default function AddHotel() {
  return (
    <Layouts>
      <div className="container pt-10">
        <ManageHotelForm />
      </div>
    </Layouts>
  );
}
