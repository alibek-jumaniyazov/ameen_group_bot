import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserApi, type UserQueryParams, type User } from "../api/userApi";

export const useUsers = (params?: UserQueryParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => UserApi.getAll(params),
  });
};

export const useUserById = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => UserApi.getById(id),
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      UserApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => UserApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
