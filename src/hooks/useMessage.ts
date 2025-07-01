import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MessageApi,
  type CreateMessageDto,
  type UpdateMessageDto,
  type MessageQueryParams,
} from "../api/messageApi";

export const useMessages = (params?: MessageQueryParams) => {
  return useQuery({
    queryKey: ["messages", params],
    queryFn: () => MessageApi.getAll(params),
  });
};

export const useMessageById = (id: number) => {
  return useQuery({
    queryKey: ["message", id],
    queryFn: () => MessageApi.getById(id),
    enabled: !!id,
  });
};

export const useUserMessage = (id: number) => {
  return useQuery({
    queryKey: ["message-user", id],
    queryFn: () => MessageApi.getUserMessage(id),
    enabled: !!id,
  });
};

export const useUserMessagesByStatus = (params?: MessageQueryParams) => {
  return useQuery({
    queryKey: ["message-users", params],
    queryFn: () => MessageApi.getUserMessagesByStatus(params),
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMessageDto) => MessageApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

export const useUpdateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: number; data: UpdateMessageDto }) =>
      MessageApi.update(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => MessageApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};
