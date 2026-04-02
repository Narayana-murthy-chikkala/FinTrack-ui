import { useTransactions as useTransactionsContext } from "../context/TransactionContext";

export default function useTransactions() {
  return useTransactionsContext();
}
