import { axiosInstance } from "./axiosInstance";

export interface BindCardInitPayload {
  card_number: string;
  expiry: string; // format YYMM
}

export interface BindCardConfirmPayload {
  transaction_id: number;
  otp: string;
  userId: number;
  subscriptionTypeId: number;
}

export interface SchedulerConfirmPayload {
  scheduler_id: string;
  otp: string;
}

export interface CreatePaymentPayload {
  userId: number;
  subscriptionTypeId: number;
}

export const PaymentApi = {
  // Atmos bind card init
  bindCardInit: async (payload: BindCardInitPayload): Promise<any> => {
    const { data } = await axiosInstance.post("/atmos/bind-card/init", payload);
    return data;
  },

  // Atmos bind card confirm (with OTP)
  bindCardConfirm: async (payload: BindCardConfirmPayload): Promise<any> => {
    const { data } = await axiosInstance.post("/atmos/bind-card/confirm", payload);
    return data;
  },

  // Atmos scheduler confirm
  schedulerConfirm: async (payload: SchedulerConfirmPayload): Promise<any> => {
    const { data } = await axiosInstance.post("/atmos/scheduler/confirm", payload);
    return data;
  },

  // Visa / Mastercard → OctoBank
  createOctoCheckout: async (payload: CreatePaymentPayload): Promise<any> => {
    const { data } = await axiosInstance.post(
      "/octobank/create-checkout-session",
      payload
    );
    return data;
  },
};
