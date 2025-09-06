import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { incomesAPI } from '../services/api';

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [filters, setFilters] = useState({
    start: '',
    end: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIncomes();
  }, [filters]);

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      const response = await incomesAPI.getAll(filters);
      setIncomes(response.data);
    } catch (error) {
      setError('Failed to fetch incomes');
      console.error('Incomes error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      try {
        await incomesAPI.delete(id);
        setIncomes(incomes.filter(income => income.id !== id));
      } catch (error) {
        setError('Failed to delete income');
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
        <h1>Incomes</h1>
        <Link to="/incomes/new" className="btn btn-primary">
          Add New Income
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
          <button onClick={() => setFilters({ start: '', end: '' })}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Incomes List */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Source</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map(income => (
              <tr key={income.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>
                  {new Date(income.date).toLocaleDateString()}
                </td>
                <td style={{ padding: '10px' }}>${income.amount}</td>
                <td style={{ padding: '10px' }}>{income.source || '-'}</td>
                <td style={{ padding: '10px' }}>{income.description || '-'}</td>
                <td style={{ padding: '10px' }}>
                  <Link to={`/incomes/${income.id}/edit`} style={{ marginRight: '10px' }}>
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(income.id)}
                    style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {incomes.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            No incomes found. <Link to="/incomes/new">Add your first income</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Incomes;
