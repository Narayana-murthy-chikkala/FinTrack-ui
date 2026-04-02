// Mock API with realistic delays and response patterns
// Simulates a real backend API

const API_BASE_URL = "api/v1";
const DELAY_MIN = 200;
const DELAY_MAX = 800;

// Simulate network delay
const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Random delay between DELAY_MIN and DELAY_MAX
const randomDelay = () =>
  delay(Math.random() * (DELAY_MAX - DELAY_MIN) + DELAY_MIN);

// Mock responses with proper error handling
const mockResponses = {
  success: (data, status = 200) => ({
    status,
    statusText: "OK",
    data,
    success: true,
  }),

  error: (message, status = 400) => ({
    status,
    statusText: "Error",
    data: null,
    error: message,
    success: false,
  }),
};

export const mockAPI = {
  // Transactions endpoints
  transactions: {
    getAll: async (filters = {}) => {
      await randomDelay();
      try {
        // Simulating data from context
        return mockResponses.success({
          transactions: [],
          total: 0,
          filters,
        });
      } catch (error) {
        return mockResponses.error("Failed to fetch transactions", 500);
      }
    },

    getById: async (id) => {
      await randomDelay();
      if (!id) {
        return mockResponses.error("Transaction ID is required", 400);
      }
      return mockResponses.success({ id, description: "Mock Transaction" });
    },

    create: async (transactionData) => {
      await randomDelay();
      if (!transactionData.description || !transactionData.amount) {
        return mockResponses.error("Missing required fields", 400);
      }
      return mockResponses.success(
        {
          ...transactionData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        },
        201
      );
    },

    update: async (id, updates) => {
      await randomDelay();
      if (!id) {
        return mockResponses.error("Transaction ID is required", 400);
      }
      return mockResponses.success({
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
      });
    },

    delete: async (id) => {
      await randomDelay();
      if (!id) {
        return mockResponses.error("Transaction ID is required", 400);
      }
      return mockResponses.success({ id, deleted: true });
    },

    bulkDelete: async (ids) => {
      await randomDelay();
      return mockResponses.success({
        deletedCount: ids.length,
        ids,
      });
    },

    export: async (format = "json") => {
      await randomDelay();
      const validFormats = ["json", "csv", "xlsx"];
      if (!validFormats.includes(format)) {
        return mockResponses.error("Invalid export format", 400);
      }
      return mockResponses.success({
        format,
        filename: `transactions.${format}`,
        size: Math.random() * 1000 + 100,
      });
    },
  },

  // Analytics endpoints
  analytics: {
    getSummary: async () => {
      await randomDelay();
      return mockResponses.success({
        totalIncome: 5000,
        totalExpenses: 2500,
        balance: 2500,
        transactionCount: 45,
      });
    },

    getCategoryBreakdown: async () => {
      await randomDelay();
      return mockResponses.success({
        categories: [
          { name: "Food", amount: 450, percentage: 18 },
          { name: "Transport", amount: 300, percentage: 12 },
          { name: "Entertainment", amount: 250, percentage: 10 },
          { name: "Shopping", amount: 800, percentage: 32 },
          { name: "Bills", amount: 700, percentage: 28 },
        ],
      });
    },

    getMonthlyTrend: async (months = 6) => {
      await randomDelay();
      return mockResponses.success({
        months,
        data: Array.from({ length: months }, (_, i) => ({
          month: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          income: Math.random() * 3000 + 2000,
          expenses: Math.random() * 2000 + 1000,
        })),
      });
    },

    getInsights: async () => {
      await randomDelay();
      return mockResponses.success({
        insights: [
          {
            title: "Spending Alert",
            message: "Your shopping expenses are 32% higher than last month",
            type: "warning",
            icon: "TrendingUp",
          },
          {
            title: "Savings Goal",
            message: "You're on track to save 45% of your income this month",
            type: "success",
            icon: "Target",
          },
          {
            title: "Budget Update",
            message: "Food category is near budget limit (85%)",
            type: "info",
            icon: "AlertCircle",
          },
        ],
      });
    },
  },

  // Budget endpoints
  budgets: {
    getAll: async () => {
      await randomDelay();
      return mockResponses.success({
        budgets: [
          { category: "Food", limit: 500, spent: 450 },
          { category: "Transport", limit: 300, spent: 280 },
          { category: "Entertainment", limit: 200, spent: 150 },
        ],
      });
    },

    setBudget: async (category, limit) => {
      await randomDelay();
      return mockResponses.success({ category, limit }, 201);
    },
  },

  // User preferences endpoints
  preferences: {
    get: async () => {
      await randomDelay();
      return mockResponses.success({
        theme: "light",
        currency: "USD",
        language: "en",
        notifications: true,
      });
    },

    update: async (preferences) => {
      await randomDelay();
      return mockResponses.success(preferences);
    },
  },

  // Health check
  health: async () => {
    await randomDelay();
    return mockResponses.success({ status: "OK", timestamp: new Date().toISOString() });
  },
};

// Custom hook for using mock API with error handling
export const useMockAPI = () => {
  const call = async (apiFunc) => {
    try {
      const response = await apiFunc();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  return { call, mockAPI };
};
