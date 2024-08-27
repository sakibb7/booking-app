import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./context/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";

export default function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        {isLoggedIn && (
          <>
            <Route path="/add-hotel" element={<AddHotel />} />
            <Route path="/my-hotels" element={<MyHotels />} />
            <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
