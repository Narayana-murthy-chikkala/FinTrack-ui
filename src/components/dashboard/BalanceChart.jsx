import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";
import { calcMonthlyData } from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";

export default function BalanceChart() {
  const { transactions } = useTransactions();
  const { convertCurrency, formatAmount } = useCurrency();
  const baseData = calcMonthlyData(transactions);

  // Convert data to selected currency
  const data = baseData.map(month => ({
    ...month,
    income: convertCurrency(month.income, 'INR'),
    expenses: convertCurrency(month.expenses, 'INR'),
    balance: convertCurrency(month.balance, 'INR'),
  }));

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
            <span className="chart-tooltip-val">{formatAmount(p.value)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="card" style={{ height: 280 }}>
      <div className="card-title">Balance Trend</div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--income)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--income)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--expense)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--expense)" stopOpacity={0} />
            </linearGradient>
          </defs>
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
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, fontFamily: "Outfit", paddingTop: 8 }}
            iconType="circle"
            iconSize={7}
          />
          <Area
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="var(--income)"
            strokeWidth={2}
            fill="url(#incomeGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "var(--income)" }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="var(--expense)"
            strokeWidth={2}
            fill="url(#expenseGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "var(--expense)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}