import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import Card from "../common/Card";
import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";
import { calcSummary } from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";

export default function SummaryCards() {
  const { transactions } = useTransactions();
  const { convertCurrency, formatAmount } = useCurrency();
  const { income, expenses, balance } = calcSummary(transactions);

  // Convert amounts to selected currency
  const convertedBalance = convertCurrency(balance, 'INR');
  const convertedIncome = convertCurrency(income, 'INR');
  const convertedExpenses = convertCurrency(expenses, 'INR');

  const cards = [
    {
      id: "balance",
      title: "Total Balance",
      amount: convertedBalance,
      color: "card-primary",
      icon: Wallet,
      change: "+2.5%",
    },
    {
      id: "income",
      title: "Income",
      amount: convertedIncome,
      color: "card-success",
      icon: TrendingUp,
      change: "+5.2%",
    },
    {
      id: "expenses",
      title: "Expenses",
      amount: convertedExpenses,
      color: "card-danger",
      icon: TrendingDown,
      change: "-3.1%",
    },
  ];

  return (
    <div className="summary-cards-grid">
      {cards.map(({ id, title, amount, color, icon: Icon, change }) => (
        <Card key={id} className={`summary-card ${color}`}>
          <div className="summary-card-header">
            <div className="summary-card-title">{title}</div>
            <Icon size={24} className="summary-card-icon" />
          </div>
          <div className="summary-card-amount">{formatAmount(amount)}</div>
          <div className="summary-card-change">{change} from last month</div>
        </Card>
      ))}
    </div>
  );
}
