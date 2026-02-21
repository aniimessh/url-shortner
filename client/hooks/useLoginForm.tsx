import { useState, ChangeEvent, FormEvent } from "react";
import { FormErrors, LoginFormData } from "@/types/auth.types";
import { loginUser } from "@/services/authServices";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const INITIAL_FORM_STATE: LoginFormData = {
  email: "",
  password: "",
};

export function useLoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setApiError] = useState<string>("");

  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError(""); // clear api error on input change
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
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

      await toast.promise(loginUser(formData), {
        loading: "Logging in...",
        success: "Logged in successfully! 🎉",
        error: (err) =>
          axios.isAxiosError(err)
            ? err.response?.data?.message || "Login failed. Try again."
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
    changeHandler,
    submitHandler,
  };
}
