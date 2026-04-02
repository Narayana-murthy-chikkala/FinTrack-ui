import { useLocation } from "react-router-dom";
import { useRole } from "../../context/RoleContext";
import { Plus } from "lucide-react";
import AddTransaction from "../transactions/AddTransaction";
import ThemeToggle from "../common/ThemeToggle";
import CurrencySelector from "../common/CurrencySelector";

export default function Navbar() {
  const { role, switchRole, ROLES } = useRole();
  const location = useLocation();

  const getPageTitle = () => {
    const titles = {
      "/": "Dashboard",
      "/dashboard": "Dashboard",
      "/transactions": "Transactions",
      "/insights": "Insights",
    };
    return titles[location.pathname] || "Dashboard";
  };

  const getPageSubtitle = () => {
    const subtitles = {
      "/": "Overview of your financial health",
      "/dashboard": "Overview of your financial health",
      "/transactions": "Manage and track your transactions",
      "/insights": "Detailed financial insights and analysis",
    };
    return subtitles[location.pathname] || "";
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-title-section">
          <h1 className="navbar-title">{getPageTitle()}</h1>
          <p className="navbar-subtitle">{getPageSubtitle()}</p>
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

          {location.pathname === "/transactions" && <AddTransaction />}
        </div>
      </div>
    </header>
  );
}