import { useEffect, useState } from 'react';
import { expensesAPI } from '../services/api';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await expensesAPI.getAll();
        console.log(res.data); 
        setExpenses(res.data);
      } catch (err) {
        console.error('Failed to fetch data', err.response || err.message);
        setError('Impossible de charger les dépenses.');
      }
    };

    fetchExpenses();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Expenses Page</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.title} - {expense.amount} €
          </li>
        ))}
      </ul>
    </div>
  );
}
