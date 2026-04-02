# Finance Dashboard

A modern, feature-rich personal finance management application built with React and Vite. Track income, expenses, analyze spending patterns, and manage your finances with an intuitive, responsive interface.

## Overview

Finance Dashboard is a comprehensive financial management tool designed for personal and small-scale financial tracking. It provides real-time insights into spending habits, supports multi-currency management, and offers advanced analytics to help users make informed financial decisions.

## Key Features

### 💰 **Transaction Management**
- Add, edit, and delete income and expense transactions
- Categorize transactions for better organization
- Search and filter transactions with advanced filtering options
- Multi-currency support with automatic conversion
- Transaction history with detailed view

### 📊 **Analytics & Insights**
- Real-time spending analysis by category
- Monthly comparison with expense trends
- Savings rate calculation
- Top spending category identification
- Monthly balance tracking
- Advanced analytics dashboard

### 💱 **Multi-Currency Support**
- Support for multiple currencies (INR, USD, EUR, GBP, JPY, AUD, CAD, SGD)
- Real-time currency conversion
- Consistent amount formatting across the application

### 🎨 **User Experience**
- Dark and light mode themes
- Fully responsive design (mobile, tablet, desktop)
- Intuitive UI with smooth animations
- Role-based feature visibility (Admin/Viewer modes)
- Persistent data storage using localStorage

### 📈 **Advanced Features**
- Balance chart visualization
- Expense pie chart breakdown
- Recent transactions panel
- Data export functionality
- Summary cards with key metrics

## Technology Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Charting Library**: Recharts 2.15.4
- **Icons**: Lucide React 0.378.0
- **Styling**: CSS3 with CSS Variables
- **State Management**: React Context API
- **Data Persistence**: localStorage

## Project Structure

```
finance-dashboard/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── dashboard/       # Dashboard page components
│   │   ├── insights/        # Analytics & insights components
│   │   ├── layout/          # Layout wrappers
│   │   └── transactions/    # Transaction management components
│   ├── context/             # React Context providers
│   ├── pages/               # Page components
│   ├── styles/              # Global and component styles
│   ├── utils/               # Helper functions
│   ├── data/                # Mock data
│   ├── hooks/               # Custom React hooks
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   cd finance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Usage Guide

### Adding Transactions
1. Navigate to the **Transactions** page
2. Click "Add Transaction" button
3. Fill in transaction details:
   - Amount (positive for income, negative for expense)
   - Category
   - Description
   - Date
4. Save the transaction

### Filtering & Sorting
- Use the filter bar to search transactions
- Filter by type (Income/Expense)
- Filter by category
- Sort by Date, Amount, or Category
- Sort in ascending or descending order

### Changing Currency
- Click the currency selector dropdown
- Choose your preferred currency
- All amounts will automatically convert

### Viewing Analytics
- Navigate to the **Insights** tab
- View top spending categories
- Track monthly expense trends
- Monitor savings rate
- Use advanced analytics for detailed breakdown

### Switching Themes
- Click the theme toggle in the navbar
- Choose between Light and Dark modes
- Preference is automatically saved

### Changing User Role
- Click the role badge (Admin/Viewer)
- Select your role
- Select different features based on role

## Architecture & Approach

### State Management
The application uses **React Context API** for efficient state management:
- **TransactionContext**: Manages transactions and filtering logic
- **CurrencyContext**: Handles multi-currency conversion
- **ThemeContext**: Controls light/dark mode
- **RoleContext**: Manages user role & permissions

### Data Persistence
All data is stored in browser's **localStorage** under the key `finance_dashboard_transactions`. This ensures:
- Data persists across browser sessions
- Offline functionality
- No backend requirements (optional)

### Styling Approach
- **CSS Variables**: Centralized color and spacing system
- **Responsive Design**: Mobile-first approach using media queries
- **Theming**: Dynamic theme switching with CSS custom properties
- **Animation**: Smooth transitions and modal animations

### Component Architecture
- **Presentational Components**: Reusable UI elements (Button, Card, Modal)
- **Container Components**: Page-level components managing state
- **Custom Hooks**: Encapsulated logic (useTransactions)

## Key Components

### Dashboard (`Dashboard.jsx`)
Main overview with balance chart, expense breakdown, recent transactions, and summary cards.

### Transactions (`Transactions.jsx`)
Complete transaction management with advanced filtering, sorting, and CRUD operations.

### Insights (`Insights.jsx`)
Analytics dashboard showing spending patterns, trends, and financial metrics.

### Transaction Management
- `TransactionList.jsx`: Displays filtered transactions
- `TransactionFilter.jsx`: Advanced filtering interface
- `AddTransaction.jsx`: Transaction creation form
- `TransactionItem.jsx`: Individual transaction display

### Analytics Components
- `AdvancedAnalytics.jsx`: Detailed analytics view
- `BalanceChart.jsx`: Balance trend visualization
- `ExpensePieChart.jsx`: Expense breakdown
- `SpendingInsights.jsx`: Spending analysis

## Features Deep Dive

### Multi-Currency System
- Supports 8 major currencies with real-time conversion
- Currency selection persists across sessions
- All calculations and displays use converted amounts

### Advanced Filtering
- Keyword search across descriptions and categories
- Type filtering (Income/Expense)
- Category filtering
- Amount range filtering
- Date range filtering

### Analytics Engine
- Category-based expense breakdown
- Monthly trend comparison
- Savings rate calculation
- Top spending identification
- Percentage calculations for visualizations

### Role-Based Access
- **Admin**: Full access to all features
- **Viewer**: Read-only access with limited operations
- Roles affect UI visibility and functionality

## Customization

### Adding New Currencies
Edit `mockData.js` and `CurrencyContext.jsx`:
```javascript
const currencies = ['INR', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'SGD', 'YOUR_CURRENCY'];
```

### Customizing Categories
Add categories in the transaction form or modify `mockData.js` to include preset categories.

### Changing Colors/Theme
Modify CSS variables in `src/styles/global.css`:
```css
:root {
  --primary: #6366f1;
  --accent: #06b6d4;
  --expense: #ef4444;
  /* ... more variables */
}
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint checks |
| `npm run preview` | Preview production build |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Data Management

### Exporting Data
Click the export button to download transactions as a file for backup or analysis.

### Resetting Data
Use the reset functionality to restore mock data (clears localStorage).

### Local Storage
- **Key**: `finance_dashboard_transactions`
- **Format**: JSON array of transaction objects

## Performance Considerations

- Efficient filtering and sorting algorithms
- Memoized components to prevent unnecessary re-renders
- Responsive chart rendering with Recharts
- Optimized CSS animations

## Future Enhancements

- Backend API integration
- Cloud data synchronization
- Budget planning and alerts
- Recurring transaction support
- PDF report generation
- Mobile app version

## Contributing

To contribute improvements:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is provided as-is for personal and educational use.

## Support

For issues or questions, please check the existing documentation or create an issue with details about:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information

---

**Built with ❤️ using React and Vite**
