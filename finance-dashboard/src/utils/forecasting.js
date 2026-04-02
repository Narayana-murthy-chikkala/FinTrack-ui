// Forecasting utility functions for predicting future expenses and income

export const predictNextMonth = (transactions, months = 3) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get transactions for the last 3-4 months to make predictions
  const recentMonths = [];
  for (let i = months; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    recentMonths.push(monthKey);
  }

  // Group transactions by month
  const monthlyData = {};
  recentMonths.forEach(month => {
    monthlyData[month] = { income: 0, expenses: 0, count: 0 };
  });

  transactions.forEach(tx => {
    const [year, month] = tx.date.split('-').slice(0, 2).join('-').split('-');
    const monthKey = `${year}-${month}`;
    
    if (monthlyData[monthKey]) {
      if (tx.type === 'income') {
        monthlyData[monthKey].income += tx.amount;
      } else {
        monthlyData[monthKey].expenses += tx.amount;
      }
      monthlyData[monthKey].count += 1;
    }
  });

  // Calculate averages
  const monthValues = Object.values(monthlyData);
  const avgIncome = monthValues.reduce((sum, m) => sum + m.income, 0) / monthValues.length;
  const avgExpenses = monthValues.reduce((sum, m) => sum + m.expenses, 0) / monthValues.length;
  const avgTransactions = monthValues.reduce((sum, m) => sum + m.count, 0) / monthValues.length;

  // Calculate trend (simple linear trend)
  const expenses = monthValues.map(m => m.expenses);
  const trend = (expenses[expenses.length - 1] - expenses[0]) / expenses.length;

  return {
    predictedIncome: Math.round(avgIncome),
    predictedExpenses: Math.round(avgExpenses + trend),
    avgTransactions: Math.round(avgTransactions),
    confidence: 75, // confidence percentage
    trend: trend > 0 ? 'increasing' : 'decreasing',
    trendValue: Math.round(Math.abs(trend)),
  };
};

export const getCategoryTrends = (transactions) => {
  const categoryMonthly = {};
  
  transactions.forEach(tx => {
    if (tx.type === 'expense') {
      const [year, month] = tx.date.split('-').slice(0, 2).join('-').split('-');
      const monthKey = `${year}-${month}`;
      
      if (!categoryMonthly[tx.category]) {
        categoryMonthly[tx.category] = {};
      }
      
      if (!categoryMonthly[tx.category][monthKey]) {
        categoryMonthly[tx.category][monthKey] = 0;
      }
      
      categoryMonthly[tx.category][monthKey] += tx.amount;
    }
  });

  // Calculate average by category
  const categoryTrends = Object.entries(categoryMonthly).map(([category, months]) => {
    const values = Object.values(months);
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    const trend = (values[values.length - 1] - values[0]) / values.length;
    
    return {
      category,
      average: Math.round(average),
      trend: trend > 0 ? 'up' : 'down',
      trendChange: Math.round(Math.abs(trend)),
    };
  });

  return categoryTrends.sort((a, b) => b.average - a.average);
};

export const getMonthlyGrowthRate = (transactions) => {
  const monthlyData = {};
  
  transactions.forEach(tx => {
    const [year, month] = tx.date.split('-').slice(0, 2).join('-').split('-');
    const monthKey = `${year}-${month}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = 0;
    }
    
    if (tx.type === 'expense') {
      monthlyData[monthKey] += tx.amount;
    }
  });

  const months = Object.entries(monthlyData).sort((a, b) => a[0].localeCompare(b[0]));
  
  if (months.length < 2) return 0;
  
  const lastMonth = months[months.length - 1][1];
  const previousMonth = months[months.length - 2][1];
  
  if (previousMonth === 0) return 0;
  
  return Math.round(((lastMonth - previousMonth) / previousMonth) * 100);
};

export const predictCategoryExpense = (transactions, category) => {
  const categoryTransactions = transactions.filter(
    tx => tx.category === category && tx.type === 'expense'
  );

  if (categoryTransactions.length === 0) return 0;

  const amounts = categoryTransactions.map(tx => tx.amount);
  const average = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;
  
  return Math.round(average);
};
