import { useMutation } from "@tanstack/react-query";
import {
  PaymentApi,
  type BindCardInitPayload,
  type BindCardConfirmPayload,
  type SchedulerConfirmPayload,
  type CreatePaymentPayload,
} from "../api/paymentApi";

// Atmos Bind card init
export const useBindCardInit = () => {
  return useMutation({
    mutationFn: (data: BindCardInitPayload) => PaymentApi.bindCardInit(data),
  });
};

// Atmos Bind card confirm (with OTP)
export const useBindCardConfirm = () => {
  return useMutation({
    mutationFn: (data: BindCardConfirmPayload) => PaymentApi.bindCardConfirm(data),
  });
};

// Atmos Scheduler confirm
export const useSchedulerConfirm = () => {
  return useMutation({
    mutationFn: (data: SchedulerConfirmPayload) => PaymentApi.schedulerConfirm(data),
  });
};

// OctoBank (Visa/Mastercard)
export const useCreateOctoCheckout = () => {
  return useMutation({
    mutationFn: (data: CreatePaymentPayload) => PaymentApi.createOctoCheckout(data),
  });
};
