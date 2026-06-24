// src/context/ExpenseContext.jsx
import { createContext, useContext, useMemo, useCallback, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { filterTransactions } from "../utils/calculations";

const ExpenseContext = createContext(null);
const STORAGE_KEY = "expense-tracker:transactions";

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ExpenseProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage(STORAGE_KEY, []);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");

  const addTransaction = useCallback(
    (transaction) => {
      const newTransaction = {
        id: makeId(),
        date: new Date().toISOString(),
        type: "expense",
        ...transaction,
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    },
    [setTransactions]
  );

  const updateTransaction = useCallback(
    (id, updates) => {
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
    },
    [setTransactions]
  );

  const deleteTransaction = useCallback(
    (id) => {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    },
    [setTransactions]
  );

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, keyword, category),
    [transactions, keyword, category]
  );

  const value = useMemo(
    () => ({
      transactions,
      filteredTransactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      keyword,
      setKeyword,
      category,
      setCategory,
    }),
    [transactions, filteredTransactions, addTransaction, updateTransaction, deleteTransaction, keyword, category]
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpenses() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return ctx;
}

export default ExpenseContext;