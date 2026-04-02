import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp } from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { path: "/insights", label: "Insights", icon: Lightbulb },
];

export default function Sidebar({ onNavigate = () => {} }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    if (path === "/" && location.pathname === "/dashboard") return true;
    return false;
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <TrendingUp size={18} color="#000" strokeWidth={2.5} />
        </div>
        <div className="logo-text">
          Fin<span>Track</span>
        </div>
      </div>

      <div className="nav-section-label">Menu</div>
      {navItems.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          className={`nav-item ${isActive(path) ? "active" : ""}`}
          onClick={onNavigate}
        >
          <Icon size={16} className="nav-icon" />
          {label}
        </Link>
      ))}

      <div className="sidebar-footer">
        <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6 }}>
          Finance Dashboard v1.0
          <br />
          <span style={{ color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>
            Mock Data Mode
          </span>
        </div>
      </div>
    </nav>
  );
}