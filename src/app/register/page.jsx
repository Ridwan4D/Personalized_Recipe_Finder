"use client";
import SocialLogin from "@/component/SocialLogin/SocialLogin";
import React from "react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      imageUrl: data.imageUrl,
      password: data.password,
    };
    console.log("Form Data:", newUser);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-emerald-600">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`w-full rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } p-2 text-sm focus:ring-emerald-500`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } p-2 text-sm focus:ring-emerald-500`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              {...register("imageUrl", {
                required: "Image URL is required",
              })}
              className={`w-full rounded-lg border ${
                errors.imageUrl ? "border-red-500" : "border-gray-300"
              } p-2 text-sm focus:ring-emerald-500`}
              placeholder="Enter profile image URL"
            />
            {errors.imageUrl && (
              <p className="mt-1 text-sm text-red-500">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`w-full rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } p-2 text-sm focus:ring-emerald-500`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
          >
            Register
          </button>

          <div className="divider text-gray-400">or signup with</div>
          <SocialLogin />
          {/* Already have an account */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
