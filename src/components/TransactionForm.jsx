// src/components/TransactionForm.jsx
import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import categories from "../data/categories";

const initialState = {
  description: "",
  amount: "",
  category: categories[0],
  type: "expense",
};

function TransactionForm() {
  const { addTransaction } = useExpenses();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.description.trim()) {
      setError("Please enter a description.");
      return;
    }
    const amountNum = Number(form.amount);
    if (!form.amount || isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }

    addTransaction({
      description: form.description.trim(),
      amount: amountNum,
      category: form.category,
      type: form.type,
      date: new Date().toISOString(),
    });

    setForm(initialState);
    setError("");
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit} aria-label="Add transaction">
      <h2 className="section-title">Add Transaction</h2>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="form-row">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder="e.g. Groceries"
          aria-required="true"
        />
      </div>

      <div className="form-row">
        <label htmlFor="amount">Amount (₹)</label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
          aria-required="true"
        />
      </div>

      <div className="form-row">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={form.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="type">Type</label>
        <select id="type" name="type" value={form.type} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;