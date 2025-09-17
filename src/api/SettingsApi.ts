import { axiosInstance } from "./axiosInstance";

export interface Settings {
  id: number;
  aboutAminGroup: string;
  contactMessage: string;
  alertMessage: string;
  startMessage: string;
  contactImageId: number | null | undefined;
  aboutAminGroupImageId: number | null | undefined;
  aboutAminGroupImage?: { id: number; url: string };
  contactImage?: { id: number; url: string };
}

export type UpdateSettingsDto = Omit<Settings, "id">;

export const SettingsApi = {
  get: async (): Promise<Settings> => {
    const { data } = await axiosInstance.get("/settings");
    return data;
  },

  update: async (payload: UpdateSettingsDto): Promise<Settings> => {
    const { data } = await axiosInstance.patch("/settings", payload);
    return data;
  },
};
