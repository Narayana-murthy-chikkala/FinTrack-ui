import { createContext, useContext, useState, useEffect } from "react";
import { mockTransactions } from "../data/mockData";

const TransactionContext = createContext(null);

const STORAGE_KEY = "finance_dashboard_transactions";

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : mockTransactions;
    } catch {
      return mockTransactions;
    }
  });

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
    sortBy: "amount",
    sortOrder: {
      date: "desc",
      amount: "desc",
      category: "asc",
      description: "asc",
    },
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (tx) => {
    const newTx = { ...tx, id: Date.now() };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const editTransaction = (id, updated) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updated } : tx))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const resetData = () => {
    setTransactions(mockTransactions);
    localStorage.removeItem(STORAGE_KEY);
  };

  const filteredTransactions = transactions
    .filter((tx) => {
      const matchSearch =
        !filters.search ||
        tx.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        tx.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchType = filters.type === "all" || tx.type === filters.type;
      const matchCategory =
        filters.category === "all" || tx.category === filters.category;
      
      // Amount filtering
      const amount = Math.abs(tx.amount);
      const minAmount = filters.minAmount ? parseFloat(filters.minAmount) : 0;
      const maxAmount = filters.maxAmount ? parseFloat(filters.maxAmount) : Infinity;
      const matchAmount = amount >= minAmount && amount <= maxAmount;
      
      // Date range filtering
      let matchDateRange = true;
      if (filters.startDate || filters.endDate) {
        const txDate = new Date(tx.date);
        if (filters.startDate) {
          const startDate = new Date(filters.startDate);
          matchDateRange = matchDateRange && txDate >= startDate;
        }
        if (filters.endDate) {
          const endDate = new Date(filters.endDate);
          endDate.setHours(23, 59, 59, 999);
          matchDateRange = matchDateRange && txDate <= endDate;
        }
      }
      
      return matchSearch && matchType && matchCategory && matchAmount && matchDateRange;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (filters.sortBy === "date") cmp = a.date.localeCompare(b.date);
      else if (filters.sortBy === "amount") cmp = Math.abs(a.amount) - Math.abs(b.amount);
      else if (filters.sortBy === "category") cmp = a.category.localeCompare(b.category);
      else if (filters.sortBy === "description") cmp = a.description.localeCompare(b.description);
      
      const currentSortOrder = filters.sortOrder[filters.sortBy] || "asc";
      return currentSortOrder === "asc" ? cmp : -cmp;
    });

  const categories = [...new Set(transactions.map((t) => t.category))].sort();

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        filteredTransactions,
        filters,
        setFilters,
        addTransaction,
        editTransaction,
        deleteTransaction,
        resetData,
        categories,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be within TransactionProvider");
  return ctx;
};