import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";
import { calcByCategory, getInsights, calcMonthlyData } from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";
import { categoryColors } from "../../data/mockData";
import { TrendingUp, TrendingDown, Minus, Award, AlertCircle, PiggyBank } from "lucide-react";

export default function InsightsPanel() {
  const { transactions } = useTransactions();
  const { convertCurrency, formatAmount } = useCurrency();
  const baseByCategory = calcByCategory(transactions);
  const { highest: baseHighest, last, prev, savingsRate } = getInsights(transactions);
  const baseMonthly = calcMonthlyData(transactions);

  const byCategory = baseByCategory.map(cat => ({
    ...cat,
    value: convertCurrency(cat.value, 'INR'),
  }));

  const highest = baseHighest && {
    ...baseHighest,
    value: convertCurrency(baseHighest.value, 'INR'),
  };

  const monthly = baseMonthly.map(month => ({
    ...month,
    income: convertCurrency(month.income, 'INR'),
    expenses: convertCurrency(month.expenses, 'INR'),
    balance: convertCurrency(month.balance, 'INR'),
  }));

  const convertedLast = last && {
    ...last,
    income: convertCurrency(last.income, 'INR'),
    expenses: convertCurrency(last.expenses, 'INR'),
    net: convertCurrency(last.net, 'INR'),
  };

  const convertedPrev = prev && {
    ...prev,
    income: convertCurrency(prev.income, 'INR'),
    expenses: convertCurrency(prev.expenses, 'INR'),
    net: convertCurrency(prev.net, 'INR'),
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="chart-tooltip">
        <div className="chart-tooltip-title">{label}</div>
        {payload.map((p) => (
          <div key={p.name} className="chart-tooltip-row">
            <span className="chart-tooltip-label" style={{ color: p.color }}>{p.name}</span>
            <span className="chart-tooltip-val">{formatAmount(p.value)}</span>
          </div>
        ))}
      </div>
    );
  };

  const expenseChange = convertedPrev
    ? ((convertedLast.expenses - convertedPrev.expenses) / convertedPrev.expenses) * 100
    : 0;

  const totalExpenses = byCategory.reduce((s, d) => s + d.value, 0);

  // Shared style for the large amount display — clamp prevents overflow
  const amountStyle = {
    fontSize: 'clamp(12px, 2vw, 16px)',
    fontFamily: "'DM Mono', monospace",
    fontWeight: 500,
    marginBottom: 6,
    whiteSpace: 'nowrap',
    display: 'block',
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Key Observations */}
      <div className="insights-grid">

        {/* Highest Spending */}
        <div className="insight-card" style={{ minWidth: 0, overflow: 'hidden' }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Award size={16} color="var(--amber)" />
            <div className="insight-title">Top Spending Category</div>
          </div>
          <div className="insight-sub">Biggest expense bucket</div>
          {highest ? (
            <>
              <div
                style={{
                  ...amountStyle,
                  color: categoryColors[highest.name] || "var(--expense)",
                }}
              >
                {formatAmount(highest.value)}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 20,
                  background: (categoryColors[highest.name] || "#6B7280") + "22",
                  color: categoryColors[highest.name] || "var(--text-secondary)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {highest.name}
              </div>
              <div className="progress-bar" style={{ marginTop: 10 }}>
                <div
                  className="progress-fill"
                  style={{
                    width: `${(highest.value / totalExpenses) * 100}%`,
                    background: categoryColors[highest.name] || "var(--expense)",
                  }}
                />
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 5 }}>
                {((highest.value / totalExpenses) * 100).toFixed(1)}% of total expenses
              </div>
            </>
          ) : (
            <div style={{ color: "var(--text-muted)", fontSize: 13 }}>No data</div>
          )}
        </div>

        {/* Monthly Comparison */}
        <div className="insight-card" style={{ minWidth: 0, overflow: 'hidden' }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            {expenseChange > 0 ? (
              <TrendingUp size={16} color="var(--expense)" />
            ) : expenseChange < 0 ? (
              <TrendingDown size={16} color="var(--income)" />
            ) : (
              <Minus size={16} color="var(--text-muted)" />
            )}
            <div className="insight-title">Monthly Comparison</div>
          </div>
          <div className="insight-sub">Expenses vs previous month</div>

          {last && prev ? (
            <>
              <div
                style={{
                  ...amountStyle,
                  color: expenseChange <= 0 ? "var(--income)" : "var(--expense)",
                }}
              >
                {expenseChange > 0 ? "+" : ""}{expenseChange.toFixed(1)}%
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>
                {expenseChange <= 0
                  ? "🎉 Expenses reduced from last month!"
                  : "⚠️ Spending increased this month"}
              </div>
              {/* FIX: flexWrap so long amounts don't push row wide */}
              <div
                className="stat-row"
                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2px 8px' }}
              >
                <span className="stat-label">This month</span>
                <span className="stat-value" style={{ color: "var(--expense)", wordBreak: 'break-all' }}>
                  {formatAmount(convertedLast.expenses)}
                </span>
              </div>
              <div
                className="stat-row"
                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2px 8px' }}
              >
                <span className="stat-label">Last month</span>
                <span className="stat-value" style={{ color: "var(--text-secondary)", wordBreak: 'break-all' }}>
                  {formatAmount(convertedPrev.expenses)}
                </span>
              </div>
            </>
          ) : (
            <div style={{ color: "var(--text-muted)", fontSize: 13 }}>Need 2+ months of data</div>
          )}
        </div>

        {/* Savings Snapshot */}
        <div className="insight-card" style={{ minWidth: 0, overflow: 'hidden' }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <PiggyBank size={16} color="var(--info)" />
            <div className="insight-title">Savings Snapshot</div>
          </div>
          <div className="insight-sub">Net vs gross income</div>
          {last ? (
            <>
              <div
                style={{
                  ...amountStyle,
                  color: convertedLast.net >= 0 ? "var(--income)" : "var(--expense)",
                }}
              >
                {formatAmount(convertedLast.net)}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>
                Net savings this month
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min(100, Math.max(0, (convertedLast.net / convertedLast.income) * 100))}%`,
                    background: convertedLast.net >= 0 ? "var(--income)" : "var(--expense)",
                  }}
                />
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 5 }}>
                {convertedLast.income > 0
                  ? `${((convertedLast.net / convertedLast.income) * 100).toFixed(1)}% savings rate`
                  : "No income data"}
              </div>
            </>
          ) : (
            <div style={{ color: "var(--text-muted)", fontSize: 13 }}>No data</div>
          )}
        </div>

        {/* Financial Observation */}
        <div className="insight-card" style={{ minWidth: 0, overflow: 'hidden' }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <AlertCircle size={16} color="var(--purple)" />
            <div className="insight-title">Financial Observation</div>
          </div>
          <div className="insight-sub">AI-style summary</div>

          <div
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginTop: 4,
              wordBreak: 'break-word',   // FIX: long currency strings wrap
              overflowWrap: 'anywhere',
            }}
          >
            {highest && last && prev ? (
              <>
                Your biggest expense is{" "}
                <strong style={{ color: "var(--text-primary)" }}>{highest.name}</strong> at{" "}
                <strong style={{ color: categoryColors[highest.name] || "var(--expense)" }}>
                  {formatAmount(highest.value)}
                </strong>
                . Expenses{" "}
                {expenseChange <= 0 ? (
                  <strong style={{ color: "var(--income)" }}>
                    dropped {Math.abs(expenseChange).toFixed(1)}%
                  </strong>
                ) : (
                  <strong style={{ color: "var(--expense)" }}>
                    rose {expenseChange.toFixed(1)}%
                  </strong>
                )}{" "}
                from last month.{" "}
                {convertedLast.net >= 0
                  ? `You saved ${formatAmount(convertedLast.net)} this month — great discipline!`
                  : `You overspent by ${formatAmount(Math.abs(convertedLast.net))} — review your budget.`}
              </>
            ) : (
              "Add more transactions across multiple months to see personalized insights here."
            )}
          </div>
        </div>
      </div>

      {/* Category breakdown chart */}
      <div className="card">
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Spending by Category
        </div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 16 }}>
          Total expenses per category
        </div>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={byCategory}
              margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
            >
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "Outfit" }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "DM Mono" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => formatAmount(v)}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Amount" radius={[4, 4, 0, 0]}>
                {byCategory.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={categoryColors[entry.name] || "#6B7280"}
                    opacity={0.85}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly bar chart */}
      <div className="card">
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Monthly Income vs Expenses
        </div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 16 }}>
          Side-by-side comparison
        </div>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthly}
              margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
            >
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "Outfit" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "DM Mono" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => formatAmount(v)}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" name="Income" fill="var(--income)" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey="expenses" name="Expenses" fill="var(--expense)" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}