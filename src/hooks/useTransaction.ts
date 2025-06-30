import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TransactionApi,
  type TransactionQueryParams,
  type Transaction,
} from "../api/transactionApi";

export const useTransactions = (params?: TransactionQueryParams) => {
  return useQuery({
    queryKey: ["transaction", params],
    queryFn: () => TransactionApi.getAll(params),
  });
};
export const useTransactionByPaymentType = (type: string) => {
  return useQuery({
    queryKey: ["transaction", { type }],
    queryFn: () => TransactionApi.getByPaymentType(type),
    enabled: !!type,
  });
};

export const useTransactionById = (id: number) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => TransactionApi.getById(id),
    enabled: !!id,
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Transaction> }) =>
      TransactionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => TransactionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
    },
  });
};
