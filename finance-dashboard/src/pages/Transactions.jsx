import TransactionFilter from "../components/transactions/TransactionFilter";
import TransactionList from "../components/transactions/TransactionList";
import ExportButton from "../components/common/ExportButton";
import { useTransactions } from "../context/TransactionContext";

export default function Transactions() {
  const { deleteTransaction, filteredTransactions } = useTransactions();

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="page-title">Transactions 💳</div>
        <div className="page-subtitle">
          View, filter, and manage your financial transactions
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <ExportButton transactions={filteredTransactions} />
      </div>

      <TransactionFilter />
      <TransactionList onDelete={handleDelete} />
    </div>
  );
}
