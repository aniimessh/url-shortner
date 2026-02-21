"use client";

import axios, { AxiosResponse } from "axios";
import { ApiResponse, SignupFormData, LoginFormData } from "@/types/auth.types";

const BASE_URL = "http://localhost:8000";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function registerUser(data: SignupFormData): Promise<ApiResponse> {
  const response: AxiosResponse<ApiResponse> = await axiosInstance.post(
    `${BASE_URL}/api/v1/auth/signup`,
    data,
  );
  return response.data;
}

export async function loginUser(data: LoginFormData): Promise<ApiResponse> {
  console.log(data);
  const response: AxiosResponse<ApiResponse> = await axiosInstance.post(
    `${BASE_URL}/api/v1/auth/login`,
    data,
  );
  return response.data;
}
