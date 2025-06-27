import { axiosInstance } from "./axiosInstance";

export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  telegramId: string;
  status: string;
  subscriptionTypeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  name?: string;
  phoneNumber?: string;
  telegramId?: string;
  status?: string;
  subscriptionTypeId?: number;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}

export const UserApi = {
  getAll: async (
    params?: UserQueryParams
  ): Promise<PaginatedResponse<User>> => {
    const { data } = await axiosInstance.get("/user", { params });
    return data;
  },

  getById: async (id: number): Promise<User> => {
    const { data } = await axiosInstance.get(`/user/${id}`);
    return data;
  },

  update: async (id: number, updatedFields: Partial<User>): Promise<User> => {
    const { data } = await axiosInstance.patch(`/user/${id}`, updatedFields);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/user/${id}`);
  },
};
