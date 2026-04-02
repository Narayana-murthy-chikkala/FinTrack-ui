import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CurrencyProvider>
          <TransactionProvider>
            <RoleProvider>
              <AppContent />
            </RoleProvider>
          </TransactionProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
