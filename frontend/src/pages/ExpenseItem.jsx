import React from "react";

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <tr className="">
      <td className="p-4">{expense.date}</td>
      <td className="px-3">{expense.amount}</td>
      <td className="px-3">{expense.category}</td>
      <td className="px-3">{expense.description}</td>
      <td className="px-3">{expense.type}</td>
      <td>
        <button onClick={() => onEdit(expense)} className="bg-[var(--primary-color)] text-white px-5 py-1 rounded mr-1">Edit</button>
        <button onClick={() => onDelete(expense.id)} className="bg-[var(--secondary-color)] px-3 py-1 rounded">Delete</button>
      </td>
    </tr>
  );
}
