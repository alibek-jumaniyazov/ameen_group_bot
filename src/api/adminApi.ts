import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export interface AdminLoginRequest {
  name: string;
  password: string;
}

export interface AdminLoginResponse {
  admin: {
    id: number;
    name: string;
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
  refreshToken: string;
}
export interface Admin {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAdminDto {
  name: string;
  oldPassword: string;
  newPassword: string;
}
export const AdminApi = {
  login: async (
    credentials: AdminLoginRequest
  ): Promise<AdminLoginResponse> => {
    const { data } = await axiosInstance.post("/admin/login", credentials);
    return data;
  },
  refresh: async (
    refreshToken: string
  ): Promise<Pick<AdminLoginResponse, "accessToken" | "refreshToken">> => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/admin/refresh`,
      {
        refreshToken,
      }
    );
    return data;
  },

  logout: async (accessToken: string): Promise<void> => {
    await axiosInstance.post("/logout", null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  getProfile: async (): Promise<Admin> => {
    const { data } = await axiosInstance.get("/admin/1");
    return data;
  },

  updateAdmin: async (payload: UpdateAdminDto) => {
    const { data } = await axiosInstance.patch(`/admin/1`, payload);
    return data;
  },
};
