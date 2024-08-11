import Layouts from "../layouts/Layouts";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

function SignInPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const { showToast } = useAppContext();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: () => {
      showToast({ message: "Sign In Successfully", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data: SignInFormData) => {
    mutate(data);
  });

  return (
    <Layouts>
      <div className="container flex justify-center items-center">
        <form onSubmit={onSubmit} className="pt-12 w-2/3 flex flex-col gap-5">
          <h2 className="text-3xl font-semibold">Create an Account</h2>

          <label className="w-full">
            Email
            <div className="border border-gray-500 rounded-md p-2">
              <input
                type="email"
                placeholder="example@mail.com"
                className="w-full outline-none bg-transparent text-gray-700"
                {...register("email", {
                  required: "This field is required",
                })}
              />
            </div>
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>
          <label className="w-full">
            Password
            <div className="border border-gray-500 rounded-md p-2">
              <input
                type="password"
                placeholder="password"
                className="w-full outline-none bg-transparent text-gray-700"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 charectersd",
                  },
                })}
              />
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>

          <div className="">
            <button
              type="submit"
              className="text-white bg-yellow-500 px-6 py-3 rounded-md"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </Layouts>
  );
}

export default SignInPage;
