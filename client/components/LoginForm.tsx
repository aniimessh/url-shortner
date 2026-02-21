"use client";
import { useLoginForm } from "@/hooks/useLoginForm";
import React from "react";

const LoginForm = () => {
  const {
    formData,
    errors,
    isLoading,
    changeHandler,
    submitHandler,
  } = useLoginForm();

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center w-1/2"
      >
        {/* Email */}
        <label htmlFor="email" className="flex flex-col w-full mb-4">
          <p className="text-sm mb-1">
            Email<span className="text-red-500">*</span>
          </p>
          <input
            type="email"
            className="border p-2 rounded-lg focus:outline-none"
            placeholder="johndoe@example.com"
            name="email"
            id="email"
            value={formData.email}
            onChange={changeHandler}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </label>

        {/* Password */}
        <label htmlFor="password" className="flex flex-col w-full mb-4">
          <p className="text-sm mb-1">
            Password<span className="text-red-500">*</span>
          </p>
          <input
            type="password"
            className="border p-2 rounded-lg focus:outline-none"
            placeholder="*******"
            name="password"
            id="password"
            value={formData.password}
            onChange={changeHandler}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password}</span>
          )}
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-400 w-full mt-2 rounded-md p-2 text-white hover:bg-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
