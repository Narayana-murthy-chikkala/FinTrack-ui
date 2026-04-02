import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext(null);

const CURRENCY_STORAGE_KEY = "finance_dashboard_currency";

// Mock exchange rates (in real app, this would come from an API)
const EXCHANGE_RATES = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  JPY: 1.85,
  AUD: 0.018,
  CAD: 0.017,
  SGD: 0.016,
  AED: 0.044,
  SAR: 0.045,
};

const CURRENCY_SYMBOLS = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  SGD: "S$",
  AED: "د.إ",
  SAR: "﷼",
};

const CURRENCY_NAMES = {
  INR: "Indian Rupee",
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  SGD: "Singapore Dollar",
  AED: "UAE Dirham",
  SAR: "Saudi Riyal",
};

export function CurrencyProvider({ children }) {
  const [baseCurrency, setBaseCurrency] = useState(() => {
    try {
      const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
      return stored || "INR";
    } catch {
      return "INR";
    }
  });

  useEffect(() => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, baseCurrency);
  }, [baseCurrency]);

  const convertCurrency = (amount, fromCurrency = "INR", toCurrency = baseCurrency) => {
    if (fromCurrency === toCurrency) return amount;

    const amountInINR = amount / (EXCHANGE_RATES[fromCurrency] || 1);
    const convertedAmount = amountInINR * (EXCHANGE_RATES[toCurrency] || 1);

    return convertedAmount;
  };

  const formatAmount = (amount, currency = baseCurrency) => {
    const symbol = CURRENCY_SYMBOLS[currency] || currency;
    const formatted = amount.toLocaleString("en-US", {
      minimumFractionDigits: currency === "JPY" ? 0 : 2,
      maximumFractionDigits: currency === "JPY" ? 0 : 2,
    });
    return `${symbol}${formatted}`;
  };

  const getExchangeRate = (fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return 1;
    const rate = convertCurrency(1, fromCurrency, toCurrency);
    return rate;
  };

  return (
    <CurrencyContext.Provider
      value={{
        baseCurrency,
        setBaseCurrency,
        convertCurrency,
        formatAmount,
        getExchangeRate,
        currencies: Object.keys(EXCHANGE_RATES),
        currencySymbols: CURRENCY_SYMBOLS,
        currencyNames: CURRENCY_NAMES,
        exchangeRates: EXCHANGE_RATES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be within CurrencyProvider");
  return ctx;
};
