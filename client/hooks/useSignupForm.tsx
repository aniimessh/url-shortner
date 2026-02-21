import { useState, ChangeEvent, FormEvent } from "react";
import { FormErrors, SignupFormData } from "@/types/auth.types";
import { registerUser } from "@/services/authServices";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const INITIAL_FORM_STATE: SignupFormData = {
  username: "",
  email: "",
  password: "",
};

export function useSignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError(""); // clear api error on input change
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

  async function submitHandler(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      setIsLoading(true);

      await toast.promise(registerUser(formData), {
        loading: "Creating your account...",
        success: "Account created successfully! 🎉",
        error: (err) =>
          axios.isAxiosError(err)
            ? err.response?.data?.message || "Signup failed. Try again."
            : "An unexpected error occurred.",
      });

      setFormData(INITIAL_FORM_STATE);
      setErrors({});

      router.push("/");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    formData,
    errors,
    isLoading,
    apiError,
    changeHandler,
    submitHandler,
  };
}
