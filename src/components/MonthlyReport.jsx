// src/components/MonthlyReport.jsx
import { useExpenses } from "../context/ExpenseContext";
import { getMonthlyReport, formatCurrency } from "../utils/calculations";

function MonthlyReport() {
  const { transactions } = useExpenses();
  const report = getMonthlyReport(transactions);

  return (
    <section className="monthly-report" aria-label="Monthly report">
      <h2 className="section-title">Monthly Report — {report.monthLabel}</h2>
      <div className="report-grid">
        <div className="report-card">
          <span className="report-label">Income</span>
          <span className="report-value report-value--income">+{formatCurrency(report.income)}</span>
        </div>
        <div className="report-card">
          <span className="report-label">Expenses</span>
          <span className="report-value report-value--expense">-{formatCurrency(report.expenses)}</span>
        </div>
        <div className="report-card">
          <span className="report-label">Net</span>
          <span className={`report-value ${report.net >= 0 ? "report-value--income" : "report-value--expense"}`}>
            {report.net >= 0 ? "+" : "-"}{formatCurrency(Math.abs(report.net))}
          </span>
        </div>
        <div className="report-card">
          <span className="report-label">Transactions</span>
          <span className="report-value">{report.count}</span>
        </div>
      </div>
    </section>
  );
}

export default MonthlyReport;