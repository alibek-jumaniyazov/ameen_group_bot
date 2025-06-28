import { axiosInstance } from "./axiosInstance";

export interface User {
  id: number;
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string;
  lastActiveAt: string;
  lastMessageAt: string;
  phoneNumber: string;
  inGroup: boolean;
  email: string | null;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  subscription: Subscription[];
}
export interface Subscription {
  id: number;
  userId: number;
  expiredDate: string;
  startDate: string;
  alertCount: number;
  price: number;
  paymentType: "STRIPE" | "CLICK" | "PAYME" | string;
  status: "Created" | "Active" | "Expired" | string;
  subscriptionTypeId: number;
  createdAt: string;
  updatedAt: string;
  transactionId: string | null;
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

  getBySubscriptionTypeId: async (
    subscriptionTypeId: string | number,
    subscriptionStatus?: string
  ): Promise<PaginatedResponse<User>> => {
    const { data } = await axiosInstance.get("/user", {
      params: {
        page: 1,
        limit: 100,
        subscriptionTypeId,
        ...(subscriptionStatus ? { subscriptionStatus } : {}),
      },
    });
    return data;
  },
};
