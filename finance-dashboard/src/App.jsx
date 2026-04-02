import { useState } from "react";
import { TransactionProvider } from "./context/TransactionContext";
import { RoleProvider } from "./context/RoleContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import "./styles/global.css";
import "./styles/animations.css";
import "./styles/darkMode.css";
import "./styles/themeToggle.css";
import "./styles/premiumComponents.css";
import "./App.css";

function AppContent() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "transactions":
        return <Transactions />;
      case "insights":
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <TransactionProvider>
          <RoleProvider>
            <AppContent />
          </RoleProvider>
        </TransactionProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
