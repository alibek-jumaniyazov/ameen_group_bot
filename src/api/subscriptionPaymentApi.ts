import { axiosInstance } from "./axiosInstance";

export interface SubscriptionPayment {
  id: number;
  userId: number;
  transactionId: number;
  expiredDate: string;
  startDate: string;
  alertCount: number;
  subscriptionTypeId: number;
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE" | "EXPIRED" | string;
  user: SubscriptionPaymentUser;
  subscriptionType: SubscriptionPaymentType;
}
export interface SubscriptionPaymentUserID {
  id: number;
  userId: number;
  transactionId: number;
  expiredDate: string;
  startDate: string;
  alertCount: number;
  subscriptionTypeId: number;
  createdAt: string;
  updatedAt: string;
  subscriptionType: SubscriptionPaymentType;
}

export interface SubscriptionPaymentUser {
  id: number;
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string;
  lastActiveAt: string;
  email: string | null;
  phoneNumber: string;
  inGroup: boolean;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPaymentType {
  id: number;
  price: number;
  title: string;
  description: string;
  expireDays: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPaymentQueryParams {
  page?: number;
  limit?: number;
  userId?: number;
  subscriptionTypeId?: number;
  startDateFrom?: string;
  startDateTo?: string;
  expireDateFrom?: string;
  expireDateTo?: string;
  status?: string;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}

export const SubscriptionApi = {
  getAll: async (
    params?: SubscriptionPaymentQueryParams
  ): Promise<PaginatedResponse<SubscriptionPayment>> => {
    const { data } = await axiosInstance.get("/subscription", { params });
    return data;
  },

  getById: async (id: number): Promise<SubscriptionPayment> => {
    const { data } = await axiosInstance.get(`/subscription/${id}`);
    return data;
  },

  getUserSubscriptionById: async (
    id: number
  ): Promise<PaginatedResponse<SubscriptionPaymentUserID>> => {
    const { data } = await axiosInstance.get(`/subscription/user/${id}`);
    return data;
  },

  update: async (
    id: number,
    updatedFields: Partial<SubscriptionPayment>
  ): Promise<SubscriptionPayment> => {
    const { data } = await axiosInstance.patch(
      `/subscription/${id}`,
      updatedFields
    );
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/subscription/${id}`);
  },
};
