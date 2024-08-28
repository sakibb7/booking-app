import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function ProtectiveRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useAppContext();

  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/sign-in");
  }

  return children;
}
