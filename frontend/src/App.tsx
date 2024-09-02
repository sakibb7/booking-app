import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import ProtectiveRoutes from "./components/ProtectiveRoutes";
import SearchPage from "./pages/SearchPage";
import HotelDetails from "./pages/HotelDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route
          path="/add-hotel"
          element={
            <ProtectiveRoutes>
              <AddHotel />
            </ProtectiveRoutes>
          }
        />
        <Route
          path="/my-hotels"
          element={
            <ProtectiveRoutes>
              <MyHotels />
            </ProtectiveRoutes>
          }
        />
        <Route
          path="/edit-hotel/:hotelId"
          element={
            <ProtectiveRoutes>
              <EditHotel />
            </ProtectiveRoutes>
          }
        />
        <Route path="/details/:hotelId" element={<HotelDetails />} />
      </Routes>
    </Router>
  );
}
