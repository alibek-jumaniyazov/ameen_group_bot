import { axiosInstance } from "./axiosInstance";

export interface Settings {
  id: number;
  aboutAminGroup: string;
  aboutKozimxonTorayev: string;
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
