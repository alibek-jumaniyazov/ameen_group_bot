import { axiosInstance } from "./axiosInstance";

export interface StatisticsResponse {
  usersCount: number;
  activeSubscriptionsCount: number;
  totalRevenueThisMonth: number;
  pendingPaymentsThisMonth: number;
  monthlyRevenue: { month: string; revenue: number }[];
  monthlyActiveSubscriptions: { month: string; activeSubscriptions: number }[];
}

export interface SubscriptionStat {
  activeCount: number;
  expiredCount: number;
  total: number;
  subscriptionType: {
    id: number;
    price: number;
    title: string;
    description: string;
    expireDays: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export const StatisticsApi = {
  getStatistics: async (): Promise<StatisticsResponse> => {
    const { data } = await axiosInstance.get("/statistics");
    return data;
  },

  getUserCountBySubscription: async (): Promise<SubscriptionStat[]> => {
    const { data } = await axiosInstance.get(
      "/statistics/user/subscriptionType"
    );
    return data;
  },
};
