import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function SignOutButton() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: apiClient.signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validate-token"] });
      showToast({ message: "Sign Out Successfully", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <div onClick={handleClick} className=" cursor-pointer">
      Sign Out
    </div>
  );
}

export default SignOutButton;
