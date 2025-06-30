import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SubscriptionApi,
  type SubscriptionPayment,
  type SubscriptionPaymentQueryParams,
} from "../api/subscriptionPaymentApi";

export const useSubscriptionsPayment = (params?: SubscriptionPaymentQueryParams) => {
  return useQuery({
    queryKey: ["Subscriptions", params],
    queryFn: () => SubscriptionApi.getAll(params),
  });
};

export const useSubscriptionPaymentById = (id: number) => {
  return useQuery({
    queryKey: ["Subscription", id],
    queryFn: () => SubscriptionApi.getById(id),
    enabled: !!id,
  });
};

export const useUpdateSubscriptionPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<SubscriptionPayment>;
    }) => SubscriptionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Subscriptions"] });
    },
  });
};

export const useDeleteSubscriptionPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => SubscriptionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Subscriptions"] });
    },
  });
};
