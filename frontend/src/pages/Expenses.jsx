import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";

export default function Expenses() {
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  if (showForm) {
    return (
      <ExpenseForm
        categories={categories}
        onBack={() => setShowForm(false)}
        onAdd={(newExpense) => setExpenses((prev) => [...prev, newExpense])}
      />
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Expenses</h1>
      <p className="mb-4 text-gray-600">
        Monitor and organize your expenses with ease
      </p>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white px-4 py-2 rounded-lg shadow transition-colors"
        >
          Add Expense
        </button>
      </div>

      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4 text-gray-500">
                No expenses found.
              </td>
            </tr>
          ) : (
            expenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-2">{exp.date}</td>
                <td className="p-2">{exp.amount}</td>
                <td className="p-2">{exp.categoryName}</td>
                <td className="p-2">{exp.description}</td>
                <td className="p-2">{exp.type}</td>
                <td className="p-2 space-x-2">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>


    </div>
  );
}
