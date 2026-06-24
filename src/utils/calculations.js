// src/utils/calculations.js

export function getTotal(transactions) {
  return transactions.reduce((sum, t) => {
    const amt = Number(t.amount) || 0;
    return t.type === "income" ? sum + amt : sum - amt;
  }, 0);
}

export function getTotalIncome(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
}

export function getTotalExpenses(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
}

export function getTotalsByCategory(transactions) {
  const totals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const cat = t.category || "Uncategorized";
      totals[cat] = (totals[cat] || 0) + (Number(t.amount) || 0);
    });

  return Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}

function isInMonth(dateStr, year, month) {
  const d = new Date(dateStr);
  return d.getFullYear() === year && d.getMonth() === month;
}

export function getMonthlyReport(transactions, referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  const monthTransactions = transactions.filter((t) =>
    isInMonth(t.date, year, month)
  );

  const income = getTotalIncome(monthTransactions);
  const expenses = getTotalExpenses(monthTransactions);

  return {
    year,
    month,
    monthLabel: referenceDate.toLocaleString(undefined, {
      month: "long",
      year: "numeric",
    }),
    income,
    expenses,
    net: income - expenses,
    count: monthTransactions.length,
    transactions: monthTransactions,
  };
}

export function filterTransactions(transactions, keyword = "", category = "All") {
  const kw = keyword.trim().toLowerCase();

  return transactions.filter((t) => {
    const matchesKeyword =
      !kw ||
      t.description?.toLowerCase().includes(kw) ||
      t.category?.toLowerCase().includes(kw);

    const matchesCategory = category === "All" || t.category === category;

    return matchesKeyword && matchesCategory;
  });
}

/**
 * Formats a number as Indian Rupees, e.g. 1234.5 -> "₹1,234.50"
 * Pass an already-positive number; handle the +/- sign separately in the UI.
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
}