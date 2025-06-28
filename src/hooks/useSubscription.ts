import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  SubscriptionTypeApi,
  type SubscriptionType,
  type SubscriptionTypeQueryParams,
} from "../api/subscriptionApi";

export const useSubscriptions = (params?: SubscriptionTypeQueryParams) => {
  return useQuery({
    queryKey: ["subscription-type", params],
    queryFn: () => SubscriptionTypeApi.getAll(params),
  });
};

export const useSubscriptionStatistics = (
  params?: SubscriptionTypeQueryParams
) => {
  return useQuery({
    queryKey: ["statistics/user/subscriptionType", params],
    queryFn: () => SubscriptionTypeApi.getAllStatis(params),
  });
};

export const useSubscriptionById = (id: number) => {
  return useQuery({
    queryKey: ["subscription-type", id],
    queryFn: () => SubscriptionTypeApi.getById(id),
    enabled: !!id,
  });
};

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<SubscriptionType>;
    }) => SubscriptionTypeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-type"] });
    },
  });
};
export const useCreateSubscriptionType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SubscriptionTypeApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-types"] });
    },
  });
};

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => SubscriptionTypeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-type"] });
    },
  });
};
