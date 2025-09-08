// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { incomesAPI } from '../services/api';

// const IncomeForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEdit = Boolean(id);
  
//   const [formData, setFormData] = useState({
//     amount: '',
//     date: new Date().toISOString().split('T')[0],
//     source: '',
//     description: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (isEdit) {
//       fetchIncome();
//     }
//   }, [id]);

//   const fetchIncome = async () => {
//     try {
//       const response = await incomesAPI.getById(id);
//       const income = response.data;
//       setFormData({
//         amount: income.amount,
//         date: new Date(income.date).toISOString().split('T')[0],
//         source: income.source || '',
//         description: income.description || ''
//       });
//     } catch (error) {
//       setError('Failed to fetch income');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       if (isEdit) {
//         await incomesAPI.update(id, formData);
//       } else {
//         await incomesAPI.create(formData);
//       }
      
//       navigate('/incomes');
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to save income');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>{isEdit ? 'Edit Income' : 'Add New Income'}</h1>
      
//       {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

//       <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
//         <div style={{ marginBottom: '15px' }}>
//           <label>Amount *</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             step="0.01"
//             required
//             style={{ width: '100%', padding: '8px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Date *</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//             style={{ width: '100%', padding: '8px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Source</label>
//           <input
//             type="text"
//             name="source"
//             value={formData.source}
//             onChange={handleChange}
//             style={{ width: '100%', padding: '8px' }}
//             placeholder="Salary, Freelance, etc."
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             style={{ width: '100%', padding: '8px', minHeight: '80px' }}
//             placeholder="Additional details about this income"
//           />
//         </div>

//         <div style={{ display: 'flex', gap: '10px' }}>
//           <button 
//             type="submit" 
//             disabled={loading}
//             style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
//           >
//             {loading ? 'Saving...' : (isEdit ? 'Update Income' : 'Create Income')}
//           </button>
//           <button 
//             type="button" 
//             onClick={() => navigate('/incomes')}
//             style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default IncomeForm;




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
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchIncome();
    }
  }, [id]);

  const fetchIncome = async () => {
    try {
      setLoading(true);
      const response = await incomesAPI.getById(id);
      const income = response.data;
      setFormData({
        amount: income.amount.toString(),
        date: new Date(income.date).toISOString().split('T')[0],
        source: income.source || '',
        description: income.description || ''
      });
    } catch (error) {
      setError('Failed to fetch income details');
      console.error('Fetch income error:', error);
    } finally {
      setLoading(false);
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
    setSuccess('');

    // Validation
    if (!formData.amount || !formData.date) {
      setError('Amount and date are required');
      setLoading(false);
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than 0');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      if (isEdit) {
        await incomesAPI.update(id, payload);
        setSuccess('Income updated successfully!');
      } else {
        await incomesAPI.create(payload);
        setSuccess('Income created successfully!');
      }

      // Redirection après un court délai pour montrer le message de succès
      setTimeout(() => {
        navigate('/incomes');
      }, 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to save income';
      setError(errorMessage);
      console.error('Save income error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading && isEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate('/incomes')}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? 'Edit Income' : 'Add New Income'}
            </h1>
          </div>
          <p className="text-gray-600 ml-11">
            {isEdit ? 'Update your income details' : 'Add a new income source to track your earnings'}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800">{success}</span>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Field */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Amount *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                  className="pl-8 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="0.00"
                  disabled={loading}
                />
              </div>
              {formData.amount && (
                <p className="mt-1 text-sm text-gray-500">
                  {formatCurrency(parseFloat(formData.amount) || 0)}
                </p>
              )}
            </div>

            {/* Date Field */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                disabled={loading}
              />
            </div>

            {/* Source Field */}
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-2">
                Source
              </label>
              <select
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                disabled={loading}
              >
                <option value="">Select a source</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investment">Investment</option>
                <option value="Business">Business</option>
                <option value="Rental">Rental Income</option>
                <option value="Bonus">Bonus</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Additional details about this income (optional)"
                disabled={loading}
              />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEdit ? 'Updating...' : 'Creating...'}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {isEdit ? 'Update Income' : 'Create Income'}
                  </div>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/incomes')}
                disabled={loading}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Quick Tips
          </h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Use specific source names for better categorization</li>
            <li>• Include descriptions for better tracking</li>
            <li>• Record income as soon as you receive it</li>
            <li>• Use consistent naming for similar income sources</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IncomeForm;