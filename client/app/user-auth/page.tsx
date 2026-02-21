"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

const Home = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error on change
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  }

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitted(true);
    console.log("Form Submitted:", formData);

    // Reset form
    setFormData({ username: "", email: "", password: "" });
    setErrors({});
  }

  return (
    <div className="w-screen h-screen bg-red-50 flex">
      {/* Left - Form Section */}
      <div className="w-3/4 bg-yellow-300 h-full flex items-center justify-center">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center w-1/2"
        >
          {/* Username */}
          <label htmlFor="username" className="flex flex-col w-full mb-4">
            <p className="text-sm mb-1">
              Username<span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              className="border p-2 rounded-lg focus:outline-none"
              placeholder="john-doe"
              name="username"
              id="username"
              value={formData.username}
              onChange={changeHandler}
            />
            {errors.username && (
              <span className="text-red-500 text-sm mt-1">
                {errors.username}
              </span>
            )}
          </label>

          {/* Email */}
          <label htmlFor="email" className="flex flex-col w-full mb-4">
            <p className="text-md mb-1">
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
            <p className="text-md mb-1">
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
              <span className="text-red-500 text-sm mt-1">
                {errors.password}
              </span>
            )}
          </label>

          <button
            type="submit"
            className="bg-blue-400 w-full mt-2 rounded-md p-2 text-white hover:bg-blue-500 transition-all duration-200"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-1/4 h-full bg-red-50 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Right Panel</p>
      </div>
    </div>
  );
};

export default Home;
