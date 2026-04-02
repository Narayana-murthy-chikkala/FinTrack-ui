import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "../../styles/advancedFilters.css";

export function AdvancedFilters({ onFiltersChange, transactions = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
    sortBy: "date",
    sortOrder: "desc",
  });

  const categories = [
    ...new Set(transactions.map((tx) => tx.category).filter(Boolean)),
  ];

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const handleReset = () => {
    const reset = {
      search: "",
      type: "all",
      category: "all",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
      sortBy: "date",
      sortOrder: "desc",
    };
    setFilters(reset);
    onFiltersChange(reset);
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v && v !== "all" && v !== "date" && v !== "desc"
  ).length;

  return (
    <div className="advanced-filters">
      <button
        className="filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          "--active-count": activeFilterCount,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M10 4h-6v2h6v-2zm12 0h-8v2h8v-2zm-12 6h-10v2h10v-2zm12 0h-2v2h2v-2zm0 6h-8v2h8v-2zm-12 0h-10v2h10v-2z" />
        </svg>
        Filters
        {activeFilterCount > 0 && <span className="badge">{activeFilterCount}</span>}
        <ChevronDown
          size={18}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </button>

      {isOpen && (
        <div className="filter-panel">
          <div className="filter-grid">
            {/* Search */}
            <div className="filter-group">
              <label>Search Description</label>
              <input
                type="text"
                placeholder="Search transactions..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="filter-input"
              />
            </div>

            {/* Type */}
            <div className="filter-group">
              <label>Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="filter-input"
              >
                <option value="all">All Transactions</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Category */}
            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="filter-input"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Range */}
            <div className="filter-group">
              <label>Min Amount</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minAmount}
                onChange={(e) =>
                  handleFilterChange("minAmount", e.target.value)
                }
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Max Amount</label>
              <input
                type="number"
                placeholder="10000"
                value={filters.maxAmount}
                onChange={(e) =>
                  handleFilterChange("maxAmount", e.target.value)
                }
                className="filter-input"
              />
            </div>

            {/* Date Range */}
            <div className="filter-group">
              <label>Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value)
                }
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                className="filter-input"
              />
            </div>

            {/* Sort */}
            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="filter-input"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="description">Description</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort Order</label>
              <select
                value={filters.sortOrder}
                onChange={(e) =>
                  handleFilterChange("sortOrder", e.target.value)
                }
                className="filter-input"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button className="btn-reset" onClick={handleReset}>
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdvancedFilters;
