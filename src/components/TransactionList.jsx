// src/components/TransactionList.jsx
import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import categories from "../data/categories";
import { formatCurrency } from "../utils/calculations";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function EditRow({ transaction, onSave, onCancel }) {
  const [draft, setDraft] = useState({
    description: transaction.description,
    amount: transaction.amount,
    category: transaction.category,
    type: transaction.type,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    const amountNum = Number(draft.amount);
    if (!draft.description.trim() || isNaN(amountNum) || amountNum <= 0) {
      return;
    }
    onSave({
      description: draft.description.trim(),
      amount: amountNum,
      category: draft.category,
      type: draft.type,
    });
  }

  return (
    <li className="transaction-item transaction-item--editing">
      <div className="transaction-edit-fields">
        <input aria-label="Edit description" name="description" type="text" value={draft.description} onChange={handleChange} />
        <input aria-label="Edit amount" name="amount" type="number" min="0" step="0.01" value={draft.amount} onChange={handleChange} />
        <select aria-label="Edit category" name="category" value={draft.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select aria-label="Edit type" name="type" value={draft.type} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div className="transaction-actions">
        <button type="button" className="btn btn-small btn-primary" onClick={handleSave}>Save</button>
        <button type="button" className="btn btn-small" onClick={onCancel}>Cancel</button>
      </div>
    </li>
  );
}

function TransactionList() {
  const { filteredTransactions, updateTransaction, deleteTransaction } = useExpenses();
  const [editingId, setEditingId] = useState(null);

  if (filteredTransactions.length === 0) {
    return (
      <section className="transaction-list" aria-label="Transactions">
        <h2 className="section-title">Transactions</h2>
        <p className="empty-state">No transactions match your filters yet.</p>
      </section>
    );
  }

  return (
    <section className="transaction-list" aria-label="Transactions">
      <h2 className="section-title">Transactions</h2>
      <ul className="transaction-items">
        {filteredTransactions.map((t) =>
          editingId === t.id ? (
            <EditRow
              key={t.id}
              transaction={t}
              onSave={(updates) => {
                updateTransaction(t.id, updates);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <li key={t.id} className={`transaction-item transaction-item--${t.type}`}>
              <div className="transaction-info">
                <span className="transaction-description">{t.description}</span>
                <span className="transaction-meta">{t.category} &middot; {formatDate(t.date)}</span>
              </div>
              <span className={`transaction-amount transaction-amount--${t.type}`}>
                {t.type === "income" ? "+" : "-"}{formatCurrency(Number(t.amount))}
              </span>
              <div className="transaction-actions">
                <button type="button" className="btn btn-small" onClick={() => setEditingId(t.id)} aria-label={`Edit ${t.description}`}>Edit</button>
                <button type="button" className="btn btn-small btn-danger" onClick={() => deleteTransaction(t.id)} aria-label={`Delete ${t.description}`}>Delete</button>
              </div>
            </li>
          )
        )}
      </ul>
    </section>
  );
}

export default TransactionList;