import { axiosInstance } from "./axiosInstance";

export interface Transaction {
  id: number;
  price: number;
  transactionId: string;
  paymentType: string;
  userId: string;
  subscriptionTypeId: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  user: UserTransaction;
  status: string;
  subscriptionType: SubscriptionTransaction;
}
export interface TransactionUserId {
  id: number;
  price: number;
  transactionId: string;
  paymentType: string;
  userId: string;
  subscriptionTypeId: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  subscriptionType: SubscriptionTransaction;
}
export interface UserTransaction {
  id: number;
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string;
  lastActiveAt: string;
  email: null;
  phoneNumber: string;
  inGroup: true;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export interface SubscriptionTransaction {
  id: number;
  price: number;
  title: string;
  description: string;
  expireDays: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface TransactionQueryParams {
  page?: number;
  limit?: number;
  userId?: string;
  subscriptionTypeId?: number;
  type?: string;
  paymentType?: string;
  username?: string;
  phone?: string;
  createdAt?: string;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}
export const TransactionApi = {
  getAll: async (
    params?: TransactionQueryParams
  ): Promise<PaginatedResponse<Transaction>> => {
    const { data } = await axiosInstance.get("/transaction", { params });
    return data;
  },

  getById: async (id: number): Promise<Transaction> => {
    const { data } = await axiosInstance.get(`/transaction/${id}`);
    return data;
  },
  getUserPaymentHistoryById: async (
    id: number
  ): Promise<PaginatedResponse<TransactionUserId>> => {
    const { data } = await axiosInstance.get(`/transaction/user/${id}`);
    return data;
  },
  update: async (
    id: number,
    updatedFields: Partial<Transaction>
  ): Promise<Transaction> => {
    const { data } = await axiosInstance.patch(
      `/transaction/${id}`,
      updatedFields
    );
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/transaction/${id}`);
  },

  getByPaymentType: async (
    type: string
  ): Promise<PaginatedResponse<Transaction>> => {
    const { data } = await axiosInstance.get("/transaction", {
      params: {
        page: 1,
        limit: 100,
        ...(type ? { type } : {}),
      },
    });
    return data;
  },
};
