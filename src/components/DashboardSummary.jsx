// src/components/DashboardSummary.jsx
import { useExpenses } from "../context/ExpenseContext";
import { getTotal, getTotalIncome, getTotalExpenses, formatCurrency } from "../utils/calculations";

function DashboardSummary() {
  const { transactions } = useExpenses();

  const balance = getTotal(transactions);
  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);

  return (
    <section className="dashboard-summary" aria-label="Dashboard summary">
      <div className="summary-card">
        <span className="summary-label">Balance</span>
        <span className={`summary-value ${balance >= 0 ? "summary-value--income" : "summary-value--expense"}`}>
          {balance >= 0 ? "+" : "-"}{formatCurrency(Math.abs(balance))}
        </span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Total Income</span>
        <span className="summary-value summary-value--income">+{formatCurrency(income)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Total Expenses</span>
        <span className="summary-value summary-value--expense">-{formatCurrency(expenses)}</span>
      </div>
    </section>
  );
}

export default DashboardSummary;