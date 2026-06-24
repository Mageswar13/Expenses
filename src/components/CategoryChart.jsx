// src/components/CategoryChart.jsx
import { useExpenses } from "../context/ExpenseContext";
import { getTotalsByCategory, formatCurrency } from "../utils/calculations";

const CHART_HEIGHT = 200;
const BAR_WIDTH = 48;
const BAR_GAP = 24;
const CHART_PADDING = 32;

function CategoryChart() {
  const { transactions } = useExpenses();
  const totals = getTotalsByCategory(transactions);

  if (totals.length === 0) {
    return (
      <section className="category-chart" aria-label="Spending by category">
        <h2 className="section-title">Spending by Category</h2>
        <p className="empty-state">Add an expense to see the breakdown.</p>
      </section>
    );
  }

  const maxTotal = Math.max(...totals.map((t) => t.total));
  const chartWidth = totals.length * (BAR_WIDTH + BAR_GAP) + CHART_PADDING;

  return (
    <section className="category-chart" aria-label="Spending by category">
      <h2 className="section-title">Spending by Category</h2>
      <svg
        viewBox={`0 0 ${chartWidth} ${CHART_HEIGHT + 40}`}
        width="100%"
        height={CHART_HEIGHT + 40}
        role="img"
        aria-label={`Bar chart of spending by category: ${totals.map((t) => `${t.category} ${formatCurrency(t.total)}`).join(", ")}`}
      >
        {totals.map((item, i) => {
          const barHeight = maxTotal > 0 ? (item.total / maxTotal) * CHART_HEIGHT : 0;
          const x = CHART_PADDING / 2 + i * (BAR_WIDTH + BAR_GAP);
          const y = CHART_HEIGHT - barHeight;

          return (
            <g key={item.category}>
              <rect x={x} y={y} width={BAR_WIDTH} height={barHeight} rx="4" className="chart-bar">
                <title>{`${item.category}: ${formatCurrency(item.total)}`}</title>
              </rect>
              <text x={x + BAR_WIDTH / 2} y={y - 8} textAnchor="middle" className="chart-value-label">
                ₹{item.total.toFixed(0)}
              </text>
              <text x={x + BAR_WIDTH / 2} y={CHART_HEIGHT + 20} textAnchor="middle" className="chart-category-label">
                {item.category}
              </text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}

export default CategoryChart;