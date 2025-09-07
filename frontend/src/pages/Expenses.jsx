import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import ExpenseItem from "./ExpenseItem";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const res = await axios.get("/api/expenses");
        setExpenses(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchExpenses();
  }, []);

  const handleAddOrUpdate = (expense) => {
    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((e) => (e.id === expense.id ? expense : e))
      );
    } else {
      setExpenses((prev) => [expense, ...prev]);
    }
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    setEditingExpense(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 rounded">
      {!showForm ? (
        <>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-[var(--text-color)]">Expenses</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white px-4 py-2 rounded mb-4"
          >
            Add Expense
          </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full shadow-md rounded-lg bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-4 text-left">Date</th>
                  <th className="px-4 py-4 text-left">Amount</th>
                  <th className="px-4 py-4 text-left">Category</th>
                  <th className="px-4 py-4 text-left">Description</th>
                  <th className="px-4 py-4 text-left">Type</th>
                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No expenses found.
                    </td>
                  </tr>
                ) : (
                  expenses.map((exp) => (
                    <ExpenseItem
                      key={exp.id}
                      expense={exp}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <ExpenseForm
          categories={categories}
          initialData={editingExpense}
          onAdd={handleAddOrUpdate}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
