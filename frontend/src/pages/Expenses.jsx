import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { expensesAPI } from '../services/api';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ start: '', end: '', category: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchData(); }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await expensesAPI.getAll(filters);
      setExpenses(res.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await expensesAPI.delete(id);
      setExpenses(expenses.filter(e => e.id !== id));
    } catch {
      setError('Failed to delete expense');
    }
  };

  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Expenses</h1>
        <Link to="/expenses/new">Add New Expense</Link>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <input type="date" value={filters.start} onChange={e => handleFilterChange('start', e.target.value)} />
        <input type="date" value={filters.end} onChange={e => handleFilterChange('end', e.target.value)} />
        <select value={filters.category} onChange={e => handleFilterChange('category', e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={filters.type} onChange={e => handleFilterChange('type', e.target.value)}>
          <option value="">All Types</option>
          <option value="one-time">One-time</option>
          <option value="recurring">Recurring</option>
        </select>
        <button onClick={() => setFilters({ start: '', end: '', category: '', type: '' })}>Clear</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Date</th><th>Amount</th><th>Category</th><th>Description</th><th>Type</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td>{exp.type === 'one-time' ? new Date(exp.date).toLocaleDateString() : 'Recurring'}</td>
              <td>${exp.amount}</td>
              <td>{exp.category?.name || '-'}</td>
              <td>{exp.description || '-'}</td>
              <td>{exp.type}</td>
              <td>
                <Link to={`/expenses/${exp.id}/edit`}>Edit</Link>
                <button onClick={() => handleDelete(exp.id)} style={{ color:'red', marginLeft:'10px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {expenses.length === 0 && <div>No expenses found. <Link to="/expenses/new">Add one</Link></div>}
    </div>
  );
};

export default Expenses;
