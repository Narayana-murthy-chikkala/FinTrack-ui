import { Trash2, Edit } from "lucide-react";
import { useRole } from "../../context/RoleContext";
import { useCurrency } from "../../context/CurrencyContext";
import { formatCurrency, formatDate } from "../../utils/formatters";

export default function TransactionItem({ transaction, onEdit, onDelete }) {
  const { canDelete } = useRole();
  const { convertCurrency, formatAmount } = useCurrency();

  return (
    <div className={`transaction-item ${transaction.type}`}>
      <div className="transaction-item-left">
        <div className="transaction-category">{transaction.category}</div>
        <div className="transaction-description">{transaction.description}</div>
        <div className="transaction-date">{formatDate(transaction.date)}</div>
      </div>
      <div className="transaction-item-right">
        <div className={`transaction-amount amount-${transaction.type}`}>
          {transaction.type === "income" ? "+" : "-"} {formatAmount(convertCurrency(transaction.amount, 'INR'))}
        </div>
        {canDelete && (
          <div className="transaction-actions">
            <button
              className="btn-icon-sm"
              onClick={() => onDelete(transaction.id)}
              title="Delete transaction"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
