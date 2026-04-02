import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp } from "lucide-react";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { key: "insights", label: "Insights", icon: Lightbulb },
];

export default function Sidebar({ activePage, setActivePage, onNavigate = () => {} }) {
  const handleNavClick = (key) => {
    setActivePage(key);
    onNavigate(); // Close sidebar on mobile after navigation
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
      {navItems.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          className={`nav-item ${activePage === key ? "active" : ""}`}
          onClick={() => handleNavClick(key)}
        >
          <Icon size={16} className="nav-icon" />
          {label}
        </button>
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