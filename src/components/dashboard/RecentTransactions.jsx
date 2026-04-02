import { Trash2, Edit } from "lucide-react";
import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useRole } from "../../context/RoleContext";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "../common/Table";

export default function RecentTransactions({ onEdit, onDelete, limit = 5 }) {
  const { transactions } = useTransactions();
  const { convertCurrency, formatAmount } = useCurrency();
  const { canDelete } = useRole();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  if (recent.length === 0) {
    return (
      <div className="card">
        <div className="card-title">Recent Transactions</div>
        <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
          No transactions yet
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-title">Recent Transactions</div>
      <div style={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Description</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader align="right">Amount</TableHeader>
              {canDelete && <TableHeader align="center">Actions</TableHeader>}
            </TableRow>
          </TableHead>
          <TableBody>
            {recent.map((tx) => (
              <TableRow key={tx.id} className={tx.type === "income" ? "row-income" : "row-expense"}>
                <TableCell>
                  <span className="transaction-description">{tx.description}</span>
                </TableCell>
                <TableCell>{tx.category}</TableCell>
                <TableCell>{formatDate(tx.date)}</TableCell>
                <TableCell align="right">
                  <span className={`amount-${tx.type}`}>
                    {tx.type === "income" ? "+" : "-"} {formatAmount(convertCurrency(tx.amount, 'INR'))}
                  </span>
                </TableCell>
                {canDelete && (
                  <TableCell align="center">
                    <button
                      className="btn-icon"
                      onClick={() => onDelete && onDelete(tx.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
