import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  PaymentApi,
  type CreatePaymentPayload,
  type PreapplyPayload,
  type ApplyPayload,
} from "../api/paymentApi";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePaymentPayload) => PaymentApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment"] });
    },
  });
};

export const usePreapplyPayment = () => {
  return useMutation({
    mutationFn: (data: PreapplyPayload) => PaymentApi.preapply(data),
  });
};

export const useApplyPayment = () => {
  return useMutation({
    mutationFn: (data: ApplyPayload) => PaymentApi.apply(data),
  });
};
