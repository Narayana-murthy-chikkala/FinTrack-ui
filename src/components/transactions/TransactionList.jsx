import { useTransactions } from "../../context/TransactionContext";
import TransactionItem from "./TransactionItem";

export default function TransactionList({ onDelete }) {
  const { filteredTransactions } = useTransactions();

  if (!filteredTransactions || filteredTransactions.length === 0) {
    return (
      <div className="card">
        <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
          <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>No transactions found</p>
          <p style={{ fontSize: "0.9rem" }}>Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      {filteredTransactions.map((tx) => (
        <TransactionItem key={tx.id} transaction={tx} onDelete={onDelete} />
      ))}
    </div>
  );
}