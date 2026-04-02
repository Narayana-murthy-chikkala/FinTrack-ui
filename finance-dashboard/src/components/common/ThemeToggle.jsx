import { useTheme } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import "../../styles/themeToggle.css";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label="Toggle theme"
    >
      <div className="toggle-icon">
        {isDark ? (
          <Sun size={20} className="icon-sun" />
        ) : (
          <Moon size={20} className="icon-moon" />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;
