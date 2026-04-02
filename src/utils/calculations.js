import { getMonthYear } from "./formatters";

export const calcSummary = (transactions) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  return { income, expenses, balance: income - expenses };
};

export const calcByCategory = (transactions) => {
  const map = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const calcMonthlyData = (transactions) => {
  const map = {};
  transactions.forEach((t) => {
    const key = getMonthYear(t.date);
    if (!map[key]) map[key] = { income: 0, expenses: 0 };
    if (t.type === "income") map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => {
      const [year, month] = key.split("-");
      const monthName = new Date(+year, +month - 1, 1).toLocaleDateString("en-IN", {
        month: "short",
      });
      // Include year suffix to avoid duplicates across different years
      const yearSuffix = year.slice(-2);
      const label = `${monthName} '${yearSuffix}`;
      return { month: label, ...val, net: val.income - val.expenses };
    });
};

export const getInsights = (transactions) => {
  const byCategory = calcByCategory(transactions);
  const highest = byCategory[0] || null;

  const monthly = calcMonthlyData(transactions);
  const last = monthly[monthly.length - 1];
  const prev = monthly[monthly.length - 2];

  const savingsRate =
    transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0) > 0
      ? ((last?.net || 0) /
          transactions
            .filter((t) => t.type === "income")
            .reduce((s, t) => s + t.amount, 0)) *
        100
      : 0;

  return { highest, monthly, last, prev, savingsRate };
};