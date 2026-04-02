import { Plus } from "lucide-react";
import { useState } from "react";
import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useRole } from "../../context/RoleContext";
import Modal from "../common/Modal";
import Button from "../common/Button";

export default function AddTransaction() {
  const { addTransaction, categories } = useTransactions();
  const { baseCurrency, currencySymbols, convertCurrency } = useCurrency();
  const { canAdd } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  if (!canAdd) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.description || !formData.amount || formData.amount <= 0) {
      alert("Please fill in all fields with valid values");
      return;
    }
    
    // Convert amount from selected currency to INR (base currency) for storage
    const amountInINR = baseCurrency === 'INR' 
      ? formData.amount 
      : convertCurrency(formData.amount, baseCurrency, 'INR');
    
    addTransaction({
      ...formData,
      amount: amountInINR,
    });
    setFormData({
      description: "",
      amount: "",
      category: "Food",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setIsOpen(true)}
        className="add-transaction-btn"
      >
        <Plus size={18} />
        Add Transaction
      </Button>

      <Modal
        isOpen={isOpen}
        title="Add New Transaction"
        onClose={() => setIsOpen(false)}
        onConfirm={handleSubmit}
        confirmText="Add"
      >
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Grocery shopping"
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-input"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Amount ({baseCurrency})</label>
            <div className="amount-input-wrapper">
              <span className="currency-prefix">{currencySymbols[baseCurrency]}</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}