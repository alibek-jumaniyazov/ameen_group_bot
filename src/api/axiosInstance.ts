import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

import { AdminApi } from "./adminApi";
import { TokenManager } from "./tokenManager";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = TokenManager.getAccessToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;
    const data = error.response?.data as { error?: string };

    console.log("❌ RESPONSE ERROR:", status, data);

    if (status === 400 && data?.error === "JWT_INVALID") {
      console.log("⛔ JWT invalid, redirecting to login...");
      TokenManager.clearTokens();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("🔄 Token expired, attempting refresh...");

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              if (token) {
                originalRequest.headers.set("Authorization", `Bearer ${token}`);
              }
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = TokenManager.getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token found");

        const { accessToken, refreshToken: newRefresh } =
          await AdminApi.refresh(refreshToken);

        TokenManager.setTokens({ accessToken, refreshToken: newRefresh });

        processQueue(null, accessToken);

        originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        TokenManager.clearTokens();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
