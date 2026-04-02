import { TrendingUp } from "lucide-react";
import { useTransactions } from "../../context/TransactionContext";
import { getInsights } from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";

export default function SpendingInsights() {
  const { transactions } = useTransactions();
  const { highest, savingsRate } = getInsights(transactions);

  const insights = [
    {
      id: 1,
      title: "Highest Expense Category",
      value: highest?.name || "N/A",
      secondary: highest ? `₹${highest.value.toLocaleString("en-IN")}` : "-",
      color: "insight-primary",
    },
    {
      id: 2,
      title: "Overall Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      secondary: "Of total income",
      color: "insight-success",
    },
    {
      id: 3,
      title: "Total Expenses",
      value: formatCurrency(
        transactions
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0),
        true
      ),
      secondary: "All time",
      color: "insight-danger",
    },
  ];

  return (
    <div className="insights-grid">
      {insights.map((insight) => (
        <div key={insight.id} className={`insight-card ${insight.color}`}>
          <div className="insight-icon">
            <TrendingUp size={20} />
          </div>
          <div className="insight-content">
            <div className="insight-title">{insight.title}</div>
            <div className="insight-value">{insight.value}</div>
            <div className="insight-secondary">{insight.secondary}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
