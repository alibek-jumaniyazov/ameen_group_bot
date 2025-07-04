import { axiosInstance } from "./axiosInstance";
import type { User } from "./userApi";

export interface Message {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  users?: number | any[];
}

export interface CreateMessageDto {
  text: string;
  userIds: number[];
  status: string;
  subscriptionTypeId: number;
}

export interface UpdateMessageDto {
  text?: string;
  userIds?: number[];
  status?: string;
  subscriptionTypeId?: number;
}

export interface MessageQueryParams {
  page?: number;
  limit?: number;
  text?: string;
  status?: string;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}
export interface MessageUser {
  id: number;
  userId: number;
  messageId: number;
  status: "DELIVERED" | "NOTSENT";
  createdAt: string;
  updatedAt: string;
  user: User;
}
export const MessageApi = {
  getAll: async (
    params?: MessageQueryParams
  ): Promise<PaginatedResponse<Message>> => {
    const { data } = await axiosInstance.get("/message", { params });
    return data;
  },

  getById: async (id: number): Promise<Message> => {
    const { data } = await axiosInstance.get(`/message/${id}`);
    return data;
  },

  getUserMessage: async (id: number): Promise<Message> => {
    const { data } = await axiosInstance.get(`/message/user/${id}`);
    return data;
  },

  getUserMessagesByStatus: async (
    params?: MessageQueryParams
  ): Promise<Message[]> => {
    const { data } = await axiosInstance.get("/message/user", { params });
    return data.data;
  },

  create: async (payload: CreateMessageDto): Promise<Message> => {
    const { data } = await axiosInstance.post("/message", payload);
    return data;
  },

  update: async (
    id: number,
    updatedFields: UpdateMessageDto
  ): Promise<Message> => {
    const { data } = await axiosInstance.patch(`/message/${id}`, updatedFields);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/message/${id}`);
  },
};
