import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";
import { calcByCategory } from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";
import { categoryColors } from "../../data/mockData";

export default function ExpensePieChart() {
  const { transactions } = useTransactions();
  const { convertCurrency, formatAmount } = useCurrency();
  const baseData = calcByCategory(transactions);

  // Convert data to selected currency
  const data = baseData.map(cat => ({
    ...cat,
    value: convertCurrency(cat.value, 'INR'),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0];
    return (
      <div className="chart-tooltip">
        <div className="chart-tooltip-title">{d.name}</div>
        <div className="chart-tooltip-row">
          <span className="chart-tooltip-label">Amount</span>
          <span className="chart-tooltip-val">{formatAmount(d.value)}</span>
        </div>
        <div className="chart-tooltip-row">
          <span className="chart-tooltip-label">Share</span>
          <span className="chart-tooltip-val">{(d.payload.percent * 100).toFixed(1)}%</span>
        </div>
      </div>
    );
  };
  const total = data.reduce((s, d) => s + d.value, 0);

  const top5 = data.slice(0, 5);
  const rest = data.slice(5).reduce((s, d) => s + d.value, 0);
  const chartData =
    rest > 0 ? [...top5, { name: "Others", value: rest }] : top5;

  const withPercent = chartData.map((d) => ({ ...d, percent: d.value / total }));

  const COLORS = chartData.map((d) => categoryColors[d.name] || "#6B7280");

  return (
    <div className="card" style={{ height: 280 }}>
      <div className="card-title">Spending Breakdown</div>
      <div style={{ display: "flex", height: "calc(100% - 28px)", gap: 12 }}>
        <ResponsiveContainer width="55%" height="100%">
          <PieChart>
            <Pie
              data={withPercent}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={76}
              paddingAngle={3}
              dataKey="value"
            >
              {withPercent.map((entry, i) => (
                <Cell key={i} fill={COLORS[i]} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 7,
            overflow: "hidden",
          }}
        >
          {withPercent.map((d, i) => (
            <div
              key={d.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: 11,
                color: "var(--text-secondary)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: COLORS[i],
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {d.name}
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: "var(--text-muted)",
                }}
              >
                {(d.percent * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}