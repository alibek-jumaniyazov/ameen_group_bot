import axios from "axios";
import { TokenManager } from "./tokenManager";
import { AdminApi } from "./adminApi";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = TokenManager.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
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
  async (error) => {
    console.log("RESPONSE ERROR:", error?.response?.status);

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("🔄 Token expired, attempting refresh...");

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = TokenManager.getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const { accessToken, refreshToken: newRefresh } =
          await AdminApi.refresh(refreshToken);

        TokenManager.setTokens({ accessToken, refreshToken: newRefresh });
        processQueue(null, accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
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
