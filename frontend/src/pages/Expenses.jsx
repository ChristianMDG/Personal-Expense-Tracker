import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { expensesAPI, categoriesAPI } from '../services/api';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    start: '',
    end: '',
    category: '',
    type: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expensesRes, categoriesRes] = await Promise.all([
        expensesAPI.getAll(filters),
        categoriesAPI.getAll()
      ]);
      setExpenses(expensesRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Expenses error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expensesAPI.delete(id);
        setExpenses(expenses.filter(expense => expense.id !== id));
      } catch (error) {
        setError('Failed to delete expense');
      }
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Expenses</h1>
        <Link to="/expenses/new" className="btn btn-primary">
          Add New Expense
        </Link>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Filters</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div>
            <label>Start Date: </label>
            <input
              type="date"
              value={filters.start}
              onChange={(e) => handleFilterChange('start', e.target.value)}
            />
          </div>
          <div>
            <label>End Date: </label>
            <input
              type="date"
              value={filters.end}
              onChange={(e) => handleFilterChange('end', e.target.value)}
            />
          </div>
          <div>
            <label>Category: </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Type: </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="one-time">One-time</option>
              <option value="recurring">Recurring</option>
            </select>
          </div>
          <button onClick={() => setFilters({ start: '', end: '', category: '', type: '' })}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Expenses List */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>
                  {expense.type === 'one-time' 
                    ? new Date(expense.date).toLocaleDateString()
                    : 'Recurring'
                  }
                </td>
                <td style={{ padding: '10px' }}>${expense.amount}</td>
                <td style={{ padding: '10px' }}>{expense.category.name}</td>
                <td style={{ padding: '10px' }}>{expense.description || '-'}</td>
                <td style={{ padding: '10px' }}>{expense.type}</td>
                <td style={{ padding: '10px' }}>
                  <Link to={`/expenses/${expense.id}/edit`} style={{ marginRight: '10px' }}>
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(expense.id)}
                    style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {expenses.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            No expenses found. <Link to="/expenses/new">Add your first expense</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;
