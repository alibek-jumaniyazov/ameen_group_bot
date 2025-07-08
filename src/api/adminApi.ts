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
    const { data } = await axios.post("http://localhost:3000/api/admin/refresh", {
      refreshToken,
    });
    return data;
  },

  logout: async (accessToken: string): Promise<void> => {
    await axiosInstance.post("/logout", null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};
