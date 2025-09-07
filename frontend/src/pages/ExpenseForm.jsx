import React, { useState } from "react";

export default function ExpenseForm({ categories, onBack, onAdd }) {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    description: "",
    type: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        onAdd(data);
        onBack();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="Recurring">Recurring</option>
            <option value="Refundable">Refundable</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2 flex space-x-2 mt-2">
          <button
            type="submit"
            className="bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white px-4 py-2 rounded-lg shadow transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg shadow transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
