import { useTransactions } from "../../context/TransactionContext";
import SummaryCards from "./SummaryCards";
import BalanceChart from "./BalanceChart";
import ExpensePieChart from "./ExpensePieChart";

export default function DashboardOverview() {
  const { transactions } = useTransactions();
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div>
      <SummaryCards />
      <div className="charts-grid">
        <BalanceChart />
        <ExpensePieChart />
      </div>
    </div>
  );
}
