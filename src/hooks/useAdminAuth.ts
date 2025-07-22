import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AdminApi,
  type Admin,
  type AdminLoginRequest,
  type AdminLoginResponse,
} from "../api/adminApi";
import { TokenManager } from "../api/tokenManager";

export const useAdminLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<AdminLoginResponse, Error, AdminLoginRequest>({
    mutationFn: AdminApi.login,
    onSuccess: (data) => {
      TokenManager.setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
};

export const useRefreshToken = () =>
  useMutation<
    Pick<AdminLoginResponse, "accessToken" | "refreshToken">,
    Error,
    void
  >({
    mutationFn: () => {
      const refresh = TokenManager.getRefreshToken();
      if (!refresh) throw new Error("No refresh token found");
      return AdminApi.refresh(refresh);
    },
    onSuccess: (data) => {
      TokenManager.setTokens(data);
    },
  });

export const useAdminLogout = () =>
  useMutation<void, Error, void>({
    mutationFn: () => {
      const access = TokenManager.getAccessToken();
      if (!access) throw new Error("No access token found");
      return AdminApi.logout(access);
    },
    onSuccess: () => {
      TokenManager.clearTokens();
    },
  });

export const useAdminProfile = () =>
  useQuery<Admin>({
    queryKey: ["adminProfile"],
    queryFn: AdminApi.getProfile,
  });

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminApi.updateAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProfile"] });
    },
  });
};
