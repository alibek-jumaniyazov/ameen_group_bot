import { axiosInstance } from "./axiosInstance";

export interface CreatePaymentPayload {
  userId: number;
  subscriptionTypeId: number;
}

export interface PreapplyPayload {
  transaction_id: number;
  card_number: number;
  expiry: string;
}

export interface ApplyPayload {
  transaction_id: number;
  otp: string;
}

export const PaymentApi = {
  create: async (payload: CreatePaymentPayload): Promise<any> => {
    const { data } = await axiosInstance.post("/atmos", payload);
    return data;
  },

  preapply: async (payload: PreapplyPayload): Promise<any> => {
    const { data } = await axiosInstance.post("/atmos/preapply", payload);
    return data;
  },

  apply: async (payload: ApplyPayload): Promise<any> => {
    const { data } = await axiosInstance.post("/atmos/apply", payload);
    return data;
  },

  createOctoCheckout: async (payload: CreatePaymentPayload): Promise<any> => {
    const { data } = await axiosInstance.post(
      "/octobank/create-checkout-session",
      payload
    );
    return data;
  },
};
