# Finance Dashboard - Quick Reference

## 🚀 Quick Links

### Contexts
- **ThemeContext** → `src/context/ThemeContext.jsx` - Theme management
- **RoleContext** → `src/context/RoleContext.jsx` - User role management
- **TransactionContext** → `src/context/TransactionContext.jsx` - Transaction data

### Components
- **ThemeToggle** → `src/components/common/ThemeToggle.jsx` - Dark/light mode toggle
- **ExportButton** → `src/components/common/ExportButton.jsx` - CSV/JSON export
- **AdvancedFilters** → `src/components/transactions/AdvancedFilters.jsx` - Advanced filtering

### Utilities
- **storage.js** → `src/utils/storage.js` - Local storage management
- **export.js** → `src/utils/export.js` - CSV/JSON export utilities  
- **mockAPI.js** → `src/utils/mockAPI.js` - Mock API service
- **calculations.js** → `src/utils/calculations.js` - Financial calculations
- **formatters.js** → `src/utils/formatters.js` - Data formatting

### Stylesheets
- **global.css** → Main global styles
- **animations.css** → Animation definitions
- **darkMode.css** → Dark theme colors
- **premiumComponents.css** → Component styles
- **advancedFilters.css** → Advanced filters styling
- **exportButton.css** → Export button styling
- **themeToggle.css** → Theme toggle styling

---

## 🎯 Common Tasks

### 1. Use Dark Mode
```jsx
import { useTheme } from './context/ThemeContext';

const { isDark, toggleTheme, theme } = useTheme();
```

### 2. Access Transactions
```jsx
import { useTransactions } from './context/TransactionContext';

const {
  transactions,      // All transactions
  filteredTransactions,  // Filtered results
  filters,           // Current filters
  setFilters,        // Update filters
  addTransaction,    // Add new
  editTransaction,   // Edit existing
  deleteTransaction  // Delete
} = useTransactions();
```

### 3. Store Data Locally
```jsx
import { storageManager, preferencesManager } from './utils/storage';

storageManager.set('key', data);        // Any data
const data = storageManager.get('key');

preferencesManager.set('theme', 'dark'); // Preferences
const theme = preferencesManager.get('theme');
```

### 4. Call Mock API
```jsx
import { mockAPI } from './utils/mockAPI';

// Transactions
await mockAPI.transactions.getAll();
await mockAPI.transactions.create(data);
await mockAPI.transactions.update(id, data);
await mockAPI.transactions.delete(id);
await mockAPI.transactions.export('json');

// Analytics
await mockAPI.analytics.getSummary();
await mockAPI.analytics.getCategoryBreakdown();
await mockAPI.analytics.getMonthlyTrend(6);
await mockAPI.analytics.getInsights();

// Preferences
await mockAPI.preferences.get();
await mockAPI.preferences.update(prefs);
```

### 5. Export Data
```jsx
import { exportManager, prepareTransactionsForExport } from './utils/export';

const data = prepareTransactionsForExport(transactions);
exportManager.exportToCSV(data, 'export.csv');
exportManager.exportToJSON(data, 'export.json');
```

### 6. Add Advanced Filters
```jsx
import AdvancedFilters from './components/transactions/AdvancedFilters';

<AdvancedFilters 
  transactions={transactions}
  onFiltersChange={(filters) => console.log(filters)}
/>
```

---

## 🎨 CSS Classes

### Animations
```css
.animate-fade .animate-slide-up .animate-slide-down
.animate-slide-left .animate-slide-right .animate-scale
.animate-pulse .animate-spin .animate-bounce
```

### Hover Effects
```css
.hover-lift .hover-scale .hover-glow
```

### Transitions
```css
.transition-all .transition-colors .transition-transform
```

### Components
```css
.card .btn .btn-primary .btn-secondary
.modal .input .form-group .badge
.table .sidebar .navbar
```

---

## 🔑 Key Props & Options

### useTheme()
```javascript
{
  theme: 'light' | 'dark',
  isDark: boolean,
  toggleTheme: () => void
}
```

### Advanced Filters
```javascript
{
  search: '',
  type: 'all' | 'income' | 'expense',
  category: string,
  minAmount: string,
  maxAmount: string, 
  startDate: string,
  endDate: string,
  sortBy: 'date' | 'amount' | 'description',
  sortOrder: 'asc' | 'desc'
}
```

### Transaction Object
```javascript
{
  id: number,
  date: string,        // ISO format
  description: string,
  category: string,
  type: 'income' | 'expense',
  amount: number,
  account?: string
}
```

---

## 📱 Responsive Breakpoints

```css
Desktop: 1200px+
Tablet:  768px - 1199px
Mobile:  < 768px
```

All components are mobile-responsive out of the box.

---

## 🎯 CSS Variables Available

```css
/* Colors */
--primary, --primary-light, --primary-dark
--secondary, --accent
--success, --income, --expense, --danger, --warning

/* Backgrounds */
--bg-primary, --bg-secondary, --bg-tertiary

/* Text */
--text-primary, --text-secondary, --text-muted

/* Layout */
--border, --shadow-sm, --shadow-md, --shadow-lg
--radius-sm, --radius-md, --radius-lg
--transition
```

---

## 🧪 Testing the Features

### Test Dark Mode
1. Click Sun/Moon icon in navbar
2. Theme should change immediately
3. Refresh page - theme should persist

### Test Advanced Filters
1. Go to Transactions page
2. Click "Filters" button
3. Adjust any filter option
4. Transactions should update
5. Click "Reset Filters"

### Test Export
1. Go to Transactions page
2. Click "CSV" button → file downloads
3. Click "JSON" button → file downloads
4. Open downloaded files in editor/spreadsheet

### Test Local Storage
1. Open DevTools → Application → Local Storage
2. Find entries with 'finance' prefix
3. Make changes and refresh - data persists

### Test Mock API
```javascript
import { mockAPI } from './utils/mockAPI';

// In console:
mockAPI.transactions.getAll().then(r => console.log(r))
mockAPI.analytics.getSummary().then(r => console.log(r))
```

---

## 📚 File Sizes (Approximate)

```
ThemeContext.jsx          - 500 bytes
storage.js                - 1.2 KB
export.js                 - 1.5 KB
mockAPI.js                - 2.8 KB
AdvancedFilters.jsx       - 3.5 KB
animations.css            - 2.0 KB
darkMode.css              - 3.0 KB
premiumComponents.css     - 3.5 KB
```

---

## 🚨 Common Issues & Fixes

### Dark mode not working?
- Check `<html data-theme="dark">` is set
- Verify `darkMode.css` is imported
- Check browser dev tools for CSS errors

### Animations choppy?
- Check for `prefers-reduced-motion` setting
- Verify animations.css is loaded
- Check browser dev tools Performance tab

### Export not downloading?
- Check console for errors
- Verify pop-up blocker isn't blocking
- Try different browser
- Check file name isn't too long

### Filters not working?
- Verify transactions array has data
- Check filter values are set correctly
- Look at console for errors
- Check TransactionContext is wrapping component

---

## 🔗 Dependency Map

```
App.jsx
├── ThemeProvider (ThemeContext.jsx)
├── TransactionProvider (TransactionContext.jsx)
├── RoleProvider (RoleContext.jsx)
└── Layout
    ├── Navbar
    │   ├── ThemeToggle (useTheme hook)
    │   └── RoleSelect (useRole hook)
    └── Pages
        ├── Dashboard
        │   └── Charts, Cards, Insights
        ├── Transactions
        │   ├── AdvancedFilters (storage, export)
        │   ├── ExportButton (export util)
        │   ├── TransactionList
        │   └── TransactionFilter
        └── Insights
            └── Analytics components
```

---

## 📖 Documentation Files

- **FEATURES_GUIDE.md** - Detailed feature documentation
- **ENHANCEMENT_SUMMARY.md** - Summary of all enhancements
- **README.md** - Project overview
- **QUICK_REFERENCE.md** - This file

---

## ✅ Checklist for New Developers

- [ ] Read ENHANCEMENT_SUMMARY.md
- [ ] Review FEATURES_GUIDE.md
- [ ] Check this QUICK_REFERENCE.md
- [ ] Run `npm install` to install dependencies
- [ ] Run `npm run dev` to start dev server
- [ ] Test dark mode toggle
- [ ] Test advanced filters
- [ ] Test export functionality
- [ ] Open DevTools and inspect localStorage
- [ ] Check CSS animations in DevTools

---

## 🎉 You're All Set!

Everything is integrated and ready to use. Start with running `npm run dev` and explore the features!

Happy coding! 🚀
