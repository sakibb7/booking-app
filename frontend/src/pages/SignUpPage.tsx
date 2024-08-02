import { useForm } from "react-hook-form";
import Layouts from "../layouts/Layouts";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignUpPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { mutate } = useMutation({
    mutationFn: apiClient.signUp,
    onSuccess: () => {
      console.log("Registration Successfully");
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormData) => {
    mutate(data);
  });
  return (
    <Layouts>
      <div className="container flex justify-center items-center">
        <form onSubmit={onSubmit} className="pt-12 w-2/3 flex flex-col gap-5">
          <h2 className="text-3xl font-semibold">Create an Account</h2>

          <div className="flex flex-col md:flex-row gap-5 pt-8 w-full">
            <label className="w-full">
              First Name
              <div
                className={`border ${
                  errors.firstName ? "border-red-500" : "border-gray-500"
                } rounded-md p-2`}
              >
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full outline-none bg-transparent text-gray-700"
                  {...register("firstName", {
                    required: "This field is required",
                  })}
                />
              </div>
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}
            </label>
            <label className="w-full">
              Last Name
              <div className="border border-gray-500 rounded-md p-2">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full outline-none bg-transparent text-gray-700"
                  {...register("lastName", {
                    required: "This field is required",
                  })}
                />
              </div>
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}
            </label>
          </div>
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
          <label className="w-full">
            Confirm Password
            <div className="border border-gray-500 rounded-md p-2">
              <input
                type="password"
                placeholder="password"
                className="w-full outline-none bg-transparent text-gray-700"
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (!val) {
                      return "This Field is required";
                    } else if (watch("password") !== val) {
                      return "Password doesn't match ";
                    }
                  },
                })}
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>

          <div className="">
            <button
              type="submit"
              className="text-white bg-yellow-500 px-6 py-3 rounded-md"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </Layouts>
  );
}

export default SignUpPage;
