import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTransactions } from "../../context/TransactionContext";
import { calcMonthlyData } from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-title">{label}</div>
      {payload.map((p) => (
        <div key={p.name} className="chart-tooltip-row">
          <span className="chart-tooltip-label" style={{ color: p.color }}>
            {p.name}
          </span>
          <span className="chart-tooltip-val">{formatCurrency(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
};

export default function MonthlyComparison() {
  const { transactions } = useTransactions();
  const data = calcMonthlyData(transactions);

  return (
    <div className="card" style={{ height: 340 }}>
      <div className="card-title">Monthly Income vs Expenses</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
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
            tickFormatter={(v) => formatCurrency(v, true)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, fontFamily: "Outfit", paddingTop: 8 }}
          />
          <Bar
            dataKey="income"
            name="Income"
            fill="var(--income)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            name="Expenses"
            fill="var(--expense)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="net"
            name="Net"
            fill="var(--primary)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
