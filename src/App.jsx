import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) {
      setError("Please enter title, amount, and category");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);
    setError("");
    setTitle("");
    setAmount("");
    setCategory("");
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const filteredExpenses =
    filterCategory === "All"
      ? expenses
      : expenses.filter((exp) => exp.category === filterCategory);

  return (
    <div className="app-container">
      <h3 className="title">Expense Tracker</h3>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label>Filter by Category: </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <br />

      {/* Add Expense Form */}
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />{" "}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>{" "}
        <button type="submit">Add Expense</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Expense List */}
      <div className="expense-list">
        {filteredExpenses.length === 0 ? (
          <p className="no-expenses">No expenses yet.</p>
        ) : (
          filteredExpenses.map((exp) => (
            <div key={exp.id} className="expense-item">
              <div>
                <h4>{exp.title}</h4>
                <p>
                  {exp.amount} - <strong>{exp.category}</strong>
                </p>
              </div>
              <button onClick={() => handleDelete(exp.id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <h3 className="total">Total Spend: {total}</h3>
    </div>
  );
}
