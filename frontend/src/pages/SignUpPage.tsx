import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import signInBg from "../assets/images/sign-in-img.jpg";
import logo from "../assets/images/icon.png";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignUpPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { mutate } = useMutation({
    mutationFn: apiClient.signUp,
    onSuccess: async () => {
      showToast({ message: "Sign Up Successfully", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validate-token"] });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormData) => {
    mutate(data);
  });
  return (
    <div className=" h-screen overflow-hidden relative">
      <img src={signInBg} alt="" />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className=" flex justify-center items-start flex-col p-12 rounded-xl bg-white w-[500px]">
          <div className="flex justify-start items-center">
            <img src={logo} alt="" className="size-10" />
            <Link to={"/"} className="text-xl font-semibold  ">
              Bookingly
            </Link>
          </div>
          <p className="text-3xl font-bold text-slate-700 text-start pt-4">
            {" "}
            Create an account
          </p>
          <p className="text-sm text-slate-700 pt-1">
            Already a member?{" "}
            <Link to={"/sign-in"} className="text-p1 underline">
              Sign in
            </Link>
          </p>
          <form onSubmit={onSubmit} className="pt-6 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <label className="w-full text-slate-500 text-sm">
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
                  <span className="text-red-500">
                    {errors.firstName.message}
                  </span>
                )}
              </label>
              <label className="w-full text-slate-500 text-sm">
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
                  <span className="text-red-500">
                    {errors.lastName.message}
                  </span>
                )}
              </label>
            </div>
            <label className="w-full text-slate-500 text-sm">
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
            <label className="w-full text-slate-500 text-sm">
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
            <label className="w-full text-slate-500 text-sm">
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

            <div className="pt-2">
              <button
                type="submit"
                className="text-white bg-p1 px-6 py-2 rounded-md text-sm font-medium"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
