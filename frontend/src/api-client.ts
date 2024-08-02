import { RegisterFormData } from "./pages/SignUpPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signUp = async (formData: RegisterFormData) => {
  console.log(API_BASE_URL)
  const response = await fetch(`http://localhost:7000/api/users/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody
};
