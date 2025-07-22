import { axiosInstance } from "./axiosInstance";

export interface Button {
  id: number;
  text: string;
  data: string;
  url: string | null;
  default?: boolean;
}

export interface CreateButtonDto {
  text: string;
  data: string;
  url?: string;
}

export interface UpdateButtonDto {
  text?: string;
  data?: string;
  url?: string | null;
}

export interface ButtonListResponse {
  total: number;
  page: number;
  limit: number;
  data: Button[];
}

export const ButtonsApi = {
  createButton: async (payload: CreateButtonDto): Promise<Button> => {
    const { data } = await axiosInstance.post("/buttons", payload);
    return data;
  },

  getAllButtons: async (
    page = 1,
    limit = 10,
    text?: string
  ): Promise<ButtonListResponse> => {
    const params: Record<string, any> = { page, limit };
    if (text) params.text = text;

    const { data } = await axiosInstance.get("/buttons", { params });
    return data;
  },

  getButtonById: async (id: number): Promise<Button> => {
    const { data } = await axiosInstance.get(`/buttons/${id}`);
    return data;
  },

  updateButton: async (
    id: number,
    payload: UpdateButtonDto
  ): Promise<Button> => {
    const { data } = await axiosInstance.patch(`/buttons/${id}`, payload);
    return data;
  },

  deleteButton: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/buttons/${id}`);
  },
};
