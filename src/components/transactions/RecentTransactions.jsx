import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useTransactions } from "../../context/TransactionContext";
import { formatCurrency, formatShortDate } from "../../utils/formatters";
import { categoryColors } from "../../data/mockData";

export default function RecentTransactions({ onNavigate }) {
  const { transactions } = useTransactions();
  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div className="card-title">Recent Transactions</div>
        <button
          onClick={() => onNavigate("transactions")}
          style={{
            background: "none",
            border: "none",
            color: "var(--accent)",
            fontSize: 12,
            cursor: "pointer",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          View all <ArrowUpRight size={12} />
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-text">No transactions yet</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {recent.map((tx) => (
            <div
              key={tx.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: tx.type === "income" ? "var(--income-bg)" : "var(--expense-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {tx.type === "income" ? (
                  <ArrowDownRight size={15} color="var(--income)" />
                ) : (
                  <ArrowUpRight size={15} color="var(--expense)" />
                )}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {tx.description}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>
                  {formatShortDate(tx.date)} · {tx.category}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  fontWeight: 500,
                  color: tx.type === "income" ? "var(--income)" : "var(--expense)",
                  whiteSpace: "nowrap",
                }}
              >
                {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}