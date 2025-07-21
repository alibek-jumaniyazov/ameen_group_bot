import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SettingsApi,
  type Settings,
  type UpdateSettingsDto,
} from "../api/SettingsApi";

export const useSettings = () =>
  useQuery<Settings>({
    queryKey: ["settings"],
    queryFn: SettingsApi.get,
  });

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateSettingsDto) => SettingsApi.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};
