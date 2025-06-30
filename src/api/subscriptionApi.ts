import { axiosInstance } from "./axiosInstance";

export interface SubscriptionType {
  id: number;
  price: number;
  title: string;
  description: string;
  expireDays: number;
  createdAt: string;
  updatedAt: string;
}
export interface SubscriptionTypeQueryParams {
  title?: string;
  price?: number;
  expireDays?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}
export interface PaginatedResponseStatis<T> {
  total: number;
  activeCount: number;
  expiredCount: number;
  subscriptionType: T[];
}

export const SubscriptionTypeApi = {
  getAll: async (
    params?: SubscriptionTypeQueryParams
  ): Promise<PaginatedResponse<SubscriptionType>> => {
    const { data } = await axiosInstance.get("/subscription-type", { params });
    return data;
  },
  getAllStatis: async (
    params?: SubscriptionTypeQueryParams
  ): Promise<PaginatedResponseStatis<SubscriptionType>> => {
    const { data } = await axiosInstance.get(
      "/statistics/user/subscriptionType",
      { params }
    );
    return data;
  },
  getById: async (id: number): Promise<SubscriptionType> => {
    const { data } = await axiosInstance.get(`/subscription-type/${id}`);
    return data;
  },

  create: async (
    payload: Omit<SubscriptionType, "id" | "createdAt" | "updatedAt">
  ): Promise<SubscriptionType> => {
    const { data } = await axiosInstance.post("/subscription-type", payload);
    return data;
  },

  update: async (
    id: number,
    updatedFields: Partial<SubscriptionType>
  ): Promise<SubscriptionType> => {
    const { data } = await axiosInstance.patch(
      `/subscription-type/${id}`,
      updatedFields
    );
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/subscription-type/${id}`);
  },
};
