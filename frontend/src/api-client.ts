import { RegisterFormData } from "./pages/SignUpPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const signUp = async (formData: RegisterFormData) => {
//   const response = await fetch(`${API_BASE_URL}/api/users/sign-up`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });

//   const responseBody = await response.json();

//   if (!response.ok) {
//     throw new Error(responseBody.message);
//   }
// };

export const signUp = (formData: RegisterFormData) =>
  fetch(`${API_BASE_URL}/api/users/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
