import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { incomesAPI } from '../services/api';

const IncomeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    source: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchIncome();
    }
  }, [id]);

  const fetchIncome = async () => {
    try {
      const response = await incomesAPI.getById(id);
      const income = response.data;
      setFormData({
        amount: income.amount,
        date: new Date(income.date).toISOString().split('T')[0],
        source: income.source || '',
        description: income.description || ''
      });
    } catch (error) {
      setError('Failed to fetch income');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await incomesAPI.update(id, formData);
      } else {
        await incomesAPI.create(formData);
      }
      
      navigate('/incomes');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save income');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{isEdit ? 'Edit Income' : 'Add New Income'}</h1>
      
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Amount *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Source</label>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            placeholder="Salary, Freelance, etc."
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', minHeight: '80px' }}
            placeholder="Additional details about this income"
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Income' : 'Create Income')}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/incomes')}
            style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;
