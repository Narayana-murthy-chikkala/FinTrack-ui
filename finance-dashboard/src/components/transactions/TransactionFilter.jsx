import { Search } from "lucide-react";
import { useTransactions } from "../../context/TransactionContext";

export default function TransactionFilter() {
  const { filters, setFilters, categories } = useTransactions();

  const update = (k, v) => {
    setFilters((f) => ({ ...f, [k]: v }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      type: "all",
      category: "all",
      sortBy: "amount",
      sortOrder: {
        date: "desc",
        amount: "desc",
        category: "asc",
        description: "asc",
      },
    });
  };

  return (
    <div className="filter-bar">
      <div className="search-wrap">
        <Search size={14} className="search-icon" />
        <input
          className="search-input"
          placeholder="Search transactions…"
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
        />
      </div>

      <select
        className="select-input"
        value={filters.type}
        onChange={(e) => update("type", e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        className="select-input"
        value={filters.category}
        onChange={(e) => update("category", e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        className="select-input"
        value={filters.sortBy}
        onChange={(e) => update("sortBy", e.target.value)}
      >
        <option value="date">Sort: Date</option>
        <option value="amount">Sort: Amount</option>
        <option value="category">Sort: Category</option>
      </select>

      <select
        className="select-input"
        value={filters.sortOrder[filters.sortBy] || "asc"}
        onChange={(e) => update("sortOrder", { ...filters.sortOrder, [filters.sortBy]: e.target.value })}
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>

      <button onClick={handleReset} className="btn btn-secondary btn-sm">
        Reset
      </button>
    </div>
  );
}