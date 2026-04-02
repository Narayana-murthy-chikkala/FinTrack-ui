import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceChart from "../components/dashboard/BalanceChart";
import ExpensePieChart from "../components/dashboard/ExpensePieChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { useTransactions } from "../context/TransactionContext";

export default function Dashboard() {
  const { deleteTransaction } = useTransactions();

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="page-title">Good day! 👋</div>
        <div className="page-subtitle">
          Here's a snapshot of your financial health
        </div>
      </div>

      <SummaryCards />

      <div className="charts-grid">
        <BalanceChart />
        <ExpensePieChart />
      </div>

      <RecentTransactions onDelete={handleDelete} limit={10} />
    </div>
  );
}