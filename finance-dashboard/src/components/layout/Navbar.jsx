import { useRole } from "../../context/RoleContext";
import { Plus } from "lucide-react";
import AddTransaction from "../transactions/AddTransaction";
import ThemeToggle from "../common/ThemeToggle";
import CurrencySelector from "../common/CurrencySelector";

export default function Navbar({ activePage }) {
  const { role, switchRole, ROLES } = useRole();

  const getPageTitle = () => {
    const titles = {
      dashboard: "Dashboard",
      transactions: "Transactions",
      insights: "Insights",
    };
    return titles[activePage] || "Dashboard";
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-title-section">
          <h1 className="navbar-title">{getPageTitle()}</h1>
          <p className="navbar-subtitle">
            {activePage === "dashboard" &&
              "Overview of your financial health"}
            {activePage === "transactions" &&
              "Manage and track your transactions"}
            {activePage === "insights" &&
              "Detailed financial insights and analysis"}
          </p>
        </div>

        <div className="navbar-actions">
          <CurrencySelector />
          <ThemeToggle />
          <div className="role-switcher">
            <span className="role-label">Role:</span>
            <select
              value={role}
              onChange={(e) => switchRole(e.target.value)}
              className="role-select"
            >
              <option value={ROLES.VIEWER}>Viewer</option>
              <option value={ROLES.ADMIN}>Admin</option>
            </select>
          </div>

          {activePage === "transactions" && <AddTransaction />}
        </div>
      </div>
    </header>
  );
}