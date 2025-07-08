import { useQuery } from "@tanstack/react-query";
import { StatisticsApi } from "../api/statisticsApi";

export const useStatistics = () =>
  useQuery({
    queryKey: ["statistics"],
    queryFn: StatisticsApi.getStatistics,
  });

export const useUserCountBySubscription = () =>
  useQuery({
    queryKey: ["userCountBySubscription"],
    queryFn: StatisticsApi.getUserCountBySubscription,
  });
