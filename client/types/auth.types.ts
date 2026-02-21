export interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

export interface ApiResponse {
  message: string;
  success: boolean;
  token?: string;
}
