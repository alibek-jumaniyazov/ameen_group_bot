import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ButtonsApi,
  type CreateButtonDto,
  type UpdateButtonDto,
} from "../api/buttonsApi";

export const useButtons = (page = 1, limit = 10, text?: string) =>
  useQuery({
    queryKey: ["buttons", page, limit, text],
    queryFn: () => ButtonsApi.getAllButtons(page, limit, text),
  });

export const useCreateButton = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateButtonDto) => ButtonsApi.createButton(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buttons"] });
    },
  });
};

export const useUpdateButton = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateButtonDto }) =>
      ButtonsApi.updateButton(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buttons"] });
    },
  });
};

export const useDeleteButton = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => ButtonsApi.deleteButton(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buttons"] });
    },
  });
};

export const useButtonById = (id: number) =>
  useQuery({
    queryKey: ["button", id],
    queryFn: () => ButtonsApi.getButtonById(id),
    enabled: !!id,
  });
