import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import ProtectiveRoutes from "./components/ProtectiveRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

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
      </Routes>
    </Router>
  );
}
