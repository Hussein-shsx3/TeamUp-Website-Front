"use client";

import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api/v1";
const AUTH_TOKEN_KEY = "teamup-auth-token";
const COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax" as const,
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getStoredAuthToken = () => {
  return Cookies.get(AUTH_TOKEN_KEY) ?? null;
};

export const setStoredAuthToken = (token: string) => {
  Cookies.set(AUTH_TOKEN_KEY, token, COOKIE_OPTIONS);
};

export const clearStoredAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_KEY, COOKIE_OPTIONS);
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearStoredAuthToken();
    }

    return Promise.reject(error);
  },
);

export default api;