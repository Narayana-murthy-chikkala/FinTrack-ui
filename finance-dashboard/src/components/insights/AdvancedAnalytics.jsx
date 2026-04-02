import React from 'react';
import { TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { predictNextMonth, getCategoryTrends, getMonthlyGrowthRate, predictCategoryExpense } from '../../utils/forecasting';
import { useTransactions } from '../../context/TransactionContext';
import { useCurrency } from '../../context/CurrencyContext';
import './AdvancedAnalytics.css';

export default function AdvancedAnalytics() {
  const { transactions } = useTransactions();
  const { convertCurrency, formatAmount } = useCurrency();

  const prediction = predictNextMonth(transactions);
  const categoryTrends = getCategoryTrends(transactions);
  const growthRate = getMonthlyGrowthRate(transactions);

  // Get base amounts (in INR)
  const baseIncome = Math.round(transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) / 4);
  const baseExpenses = Math.round(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) / 4);

  // Convert to selected currency
  const convertedIncome = convertCurrency(baseIncome, 'INR');
  const convertedExpenses = convertCurrency(baseExpenses, 'INR');
  const convertedPredictedIncome = convertCurrency(prediction.predictedIncome, 'INR');
  const convertedPredictedExpenses = convertCurrency(prediction.predictedExpenses, 'INR');

  // Prepare forecast data for chart
  const forecastData = [
    {
      month: 'Current Avg',
      income: convertedIncome,
      expenses: convertedExpenses,
    },
    {
      month: 'Next Month (Predicted)',
      income: convertedPredictedIncome,
      expenses: convertedPredictedExpenses,
    },
  ];

  // Top spending categories with trends
  const topCategories = categoryTrends.slice(0, 5);

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>📊 Advanced Analytics & Forecasting</h2>
        <p className="analytics-subtitle">AI-powered predictions based on your spending patterns</p>
      </div>

      {/* Prediction Cards */}
      <div className="prediction-cards">
        <div className="prediction-card">
          <div className="prediction-icon income">
            <TrendingUp size={24} />
          </div>
          <div className="prediction-content">
            <p className="prediction-label">Predicted Income (Next Month)</p>
            <p className="prediction-amount">{formatAmount(convertedPredictedIncome)}</p>
            <p className="prediction-meta">Based on 3-month average</p>
          </div>
        </div>

        <div className="prediction-card">
          <div className="prediction-icon expense">
            <TrendingDown size={24} />
          </div>
          <div className="prediction-content">
            <p className="prediction-label">Predicted Expenses (Next Month)</p>
            <p className="prediction-amount">{formatAmount(convertedPredictedExpenses)}</p>
            <p className="prediction-meta">
              Trend: <span className={`trend-badge ${prediction.trend}`}>
                {prediction.trend === 'increasing' ? '↑ Increasing' : '↓ Decreasing'}
              </span>
            </p>
          </div>
        </div>

        <div className="prediction-card">
          <div className="prediction-icon growth">
            <Target size={24} />
          </div>
          <div className="prediction-content">
            <p className="prediction-label">Monthly Growth Rate</p>
            <p className="prediction-amount">{growthRate}%</p>
            <p className="prediction-meta">Change from last month</p>
          </div>
        </div>

        <div className="prediction-card">
          <div className="prediction-icon confidence">
            <AlertCircle size={24} />
          </div>
          <div className="prediction-content">
            <p className="prediction-label">Prediction Confidence</p>
            <p className="prediction-amount">{prediction.confidence}%</p>
            <p className="prediction-meta">Based on data consistency</p>
          </div>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="analytics-section">
        <h3>📈 Income vs Expenses Forecast</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatAmount(value)} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Income" />
              <Bar dataKey="expenses" fill="#f43f5e" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Trends */}
      <div className="analytics-section">
        <h3>📉 Top Spending Categories & Trends</h3>
        <div className="category-trends">
          {topCategories.map((cat, idx) => (
            <div key={idx} className="trend-card">
              <div className="trend-header">
                <span className="trend-rank">#{idx + 1}</span>
                <h4>{cat.category}</h4>
                <span className={`trend-indicator ${cat.trend}`}>
                  {cat.trend === 'up' ? '↑' : '↓'} {cat.trendChange}
                </span>
              </div>
              <div className="trend-value">
                <p className="trend-amount">{formatAmount(convertCurrency(cat.average, 'INR'))}</p>
                <p className="trend-desc">Average monthly spend</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
