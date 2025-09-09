// // import { useState, useEffect } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { expensesAPI, categoriesAPI } from '../services/api';

// // const ExpenseForm = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const isEdit = Boolean(id);
  
// //   const [formData, setFormData] = useState({
// //     amount: '',
// //     date: '',
// //     categoryId: '',
// //     description: '',
// //     type: 'one-time',
// //     startDate: '',
// //     endDate: '',
// //     receipt: null
// //   });
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     fetchCategories();
// //     if (isEdit) {
// //       fetchExpense();
// //     }
// //   }, [id]);

// //   const fetchCategories = async () => {
// //     try {
// //       const response = await categoriesAPI.getAll();
// //       setCategories(response.data);
      
// //       // Sélectionner la première catégorie par défaut si disponible
// //       if (response.data.length > 0 && !formData.categoryId) {
// //         setFormData(prev => ({ ...prev, categoryId: response.data[0].id }));
// //       }
// //     } catch (error) {
// //       setError('Failed to fetch categories');
// //       console.error('Categories error:', error);
// //     }
// //   };

// //   const fetchExpense = async () => {
// //     try {
// //       const response = await expensesAPI.getById(id);
// //       const expense = response.data;
// //       setFormData({
// //         amount: expense.amount.toString(),
// //         date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : '',
// //         categoryId: expense.categoryId,
// //         description: expense.description || '',
// //         type: expense.type,
// //         startDate: expense.startDate ? new Date(expense.startDate).toISOString().split('T')[0] : '',
// //         endDate: expense.endDate ? new Date(expense.endDate).toISOString().split('T')[0] : '',
// //         receipt: null
// //       });
// //     } catch (error) {
// //       setError('Failed to fetch expense');
// //       console.error('Expense fetch error:', error);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value, type, files } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: type === 'file' ? files[0] : value
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');

// //     // Validation côté client
// //     if (!formData.amount || !formData.categoryId) {
// //       setError('Amount and category are required');
// //       setLoading(false);
// //       return;
// //     }

// //     if (formData.type === 'one-time' && !formData.date) {
// //       setError('Date is required for one-time expenses');
// //       setLoading(false);
// //       return;
// //     }

// //     if (formData.type === 'recurring' && !formData.startDate) {
// //       setError('Start date is required for recurring expenses');
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const data = new FormData();
      
// //       // Ajouter tous les champs requis
// //       data.append('amount', formData.amount);
// //       data.append('categoryId', formData.categoryId);
// //       data.append('type', formData.type);
      
// //       if (formData.description) data.append('description', formData.description);
      
// //       if (formData.type === 'one-time' && formData.date) {
// //         data.append('date', formData.date);
// //       }
      
// //       if (formData.type === 'recurring') {
// //         data.append('startDate', formData.startDate);
// //         if (formData.endDate) data.append('endDate', formData.endDate);
// //       }
      
// //       if (formData.receipt) {
// //         data.append('receipt', formData.receipt);
// //       }

// //       // Debug: Afficher le contenu de FormData
// //       for (let [key, value] of data.entries()) {
// //         console.log(`${key}:`, value);
// //       }

// //       if (isEdit) {
// //         await expensesAPI.update(id, data);
// //       } else {
// //         await expensesAPI.create(data);
// //       }
      
// //       navigate('/expenses');
// //     } catch (error) {
// //       console.error('Error details:', error);
// //       console.error('Error response:', error.response?.data);
// //       setError(error.response?.data?.error || 'Failed to save expense');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
// //       <h1>{isEdit ? 'Edit Expense' : 'Add New Expense'}</h1>
      
// //       {error && (
// //         <div style={{ 
// //           color: 'red', 
// //           padding: '10px', 
// //           border: '1px solid red', 
// //           borderRadius: '4px',
// //           marginBottom: '15px',
// //           backgroundColor: '#ffe6e6'
// //         }}>
// //           {error}
// //         </div>
// //       )}

// //       <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
// //         <div style={{ marginBottom: '15px' }}>
// //           <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Amount *</label>
// //           <input
// //             type="number"
// //             name="amount"
// //             value={formData.amount}
// //             onChange={handleChange}
// //             step="0.01"
// //             required
// //             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
// //           />
// //         </div>

// //         <div style={{ marginBottom: '15px' }}>
// //           <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category *</label>
// //           <select
// //             name="categoryId"
// //             value={formData.categoryId}
// //             onChange={handleChange}
// //             required
// //             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
// //           >
// //             <option value="">Select a category</option>
// //             {categories.map(category => (
// //               <option key={category.id} value={category.id}>
// //                 {category.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div style={{ marginBottom: '15px' }}>
// //           <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Type *</label>
// //           <select
// //             name="type"
// //             value={formData.type}
// //             onChange={handleChange}
// //             required
// //             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
// //           >
// //             <option value="one-time">One-time</option>
// //             <option value="recurring">Recurring</option>
// //           </select>
// //         </div>

// //         {formData.type === 'one-time' && (
// //           <div style={{ marginBottom: '15px' }}>
// //             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date *</label>
// //             <input
// //               type="date"
// //               name="date"
// //               value={formData.date}
// //               onChange={handleChange}
// //               required
// //               style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
// //             />
// //           </div>
// //         )}

// //         {formData.type === 'recurring' && (
// //           <>
// //             <div style={{ marginBottom: '15px' }}>
// //               <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Start Date *</label>
// //               <input
// //                 type="date"
// //                 name="startDate"
// //                 value={formData.startDate}
// //                 onChange={handleChange}
// //                 required
// //                 style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
// //               />
// //             </div>
// //             <div style={{ marginBottom: '15px' }}>
// //               <label style={{ display: 'block', marginBottom: '5px' }}>End Date (optional)</label>
// //               <input
// //                 type="date"
// //                 name="endDate"
// //                 value={formData.endDate}
// //                 onChange={handleChange}
// //                 style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
// //               />
// //             </div>
// //           </>
// //         )}

// //         <div style={{ marginBottom: '15px' }}>
// //           <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
// //           <textarea
// //             name="description"
// //             value={formData.description}
// //             onChange={handleChange}
// //             style={{ width: '100%', padding: '8px', minHeight: '80px', border: '1px solid #ccc', borderRadius: '4px' }}
// //             placeholder="Optional description"
// //           />
// //         </div>

// //         <div style={{ marginBottom: '20px' }}>
// //           <label style={{ display: 'block', marginBottom: '5px' }}>Receipt (JPG, PNG, PDF - max 5MB)</label>
// //           <input
// //             type="file"
// //             name="receipt"
// //             onChange={handleChange}
// //             accept=".jpg,.jpeg,.png,.pdf"
// //             style={{ width: '100%', padding: '8px' }}
// //           />
// //         </div>

// //         <div style={{ display: 'flex', gap: '10px' }}>
// //           <button 
// //             type="submit" 
// //             disabled={loading}
// //             style={{ 
// //               padding: '10px 20px', 
// //               background: '#007bff', 
// //               color: 'white', 
// //               border: 'none', 
// //               borderRadius: '4px',
// //               cursor: loading ? 'not-allowed' : 'pointer'
// //             }}
// //           >
// //             {loading ? 'Saving...' : (isEdit ? 'Update Expense' : 'Create Expense')}
// //           </button>
// //           <button 
// //             type="button" 
// //             onClick={() => navigate('/expenses')}
// //             style={{ 
// //               padding: '10px 20px', 
// //               background: '#6c757d', 
// //               color: 'white', 
// //               border: 'none', 
// //               borderRadius: '4px',
// //               cursor: 'pointer'
// //             }}
// //           >
// //             Cancel
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default ExpenseForm;


// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { expensesAPI, categoriesAPI } from '../services/api';

// const ExpenseForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEdit = Boolean(id);
  
//   const [formData, setFormData] = useState({
//     amount: '',
//     date: '',
//     categoryId: '',
//     description: '',
//     type: 'one-time',
//     startDate: '',
//     endDate: '',
//     receipt: null
//   });
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [receiptPreview, setReceiptPreview] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//     if (isEdit) {
//       fetchExpense();
//     }
//   }, [id]);

//   const fetchCategories = async () => {
//     try {
//       const response = await categoriesAPI.getAll();
//       setCategories(response.data);
      
//       if (response.data.length > 0 && !formData.categoryId) {
//         setFormData(prev => ({ ...prev, categoryId: response.data[0].id }));
//       }
//     } catch (error) {
//       setError('Failed to fetch categories');
//       console.error('Categories error:', error);
//     }
//   };

//   const fetchExpense = async () => {
//     try {
//       setLoading(true);
//       const response = await expensesAPI.getById(id);
//       const expense = response.data;
      
//       setFormData({
//         amount: expense.amount.toString(),
//         date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : '',
//         categoryId: expense.categoryId,
//         description: expense.description || '',
//         type: expense.type,
//         startDate: expense.startDate ? new Date(expense.startDate).toISOString().split('T')[0] : '',
//         endDate: expense.endDate ? new Date(expense.endDate).toISOString().split('T')[0] : '',
//         receipt: null
//       });

//       if (expense.receipt) {
//         setReceiptPreview(`/api/uploads/${expense.receipt}`);
//       }
//     } catch (error) {
//       setError('Failed to fetch expense details');
//       console.error('Expense fetch error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
    
//     if (type === 'file' && files[0]) {
//       const file = files[0];
//       setFormData(prev => ({ ...prev, [name]: file }));
      
//       // Create preview for image files
//       if (file.type.startsWith('image/')) {
//         const reader = new FileReader();
//         reader.onload = (e) => setReceiptPreview(e.target.result);
//         reader.readAsDataURL(file);
//       } else {
//         setReceiptPreview(null);
//       }
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     // Validation
//     if (!formData.amount || !formData.categoryId) {
//       setError('Amount and category are required');
//       setLoading(false);
//       return;
//     }

//     if (parseFloat(formData.amount) <= 0) {
//       setError('Amount must be greater than 0');
//       setLoading(false);
//       return;
//     }

//     if (formData.type === 'one-time' && !formData.date) {
//       setError('Date is required for one-time expenses');
//       setLoading(false);
//       return;
//     }

//     if (formData.type === 'recurring' && !formData.startDate) {
//       setError('Start date is required for recurring expenses');
//       setLoading(false);
//       return;
//     }

//     try {
//       const data = new FormData();
      
//       data.append('amount', formData.amount);
//       data.append('categoryId', formData.categoryId);
//       data.append('type', formData.type);
//       data.append('description', formData.description || '');
      
//       if (formData.type === 'one-time' && formData.date) {
//         data.append('date', formData.date);
//       }
      
//       if (formData.type === 'recurring') {
//         data.append('startDate', formData.startDate);
//         if (formData.endDate) data.append('endDate', formData.endDate);
//       }
      
//       if (formData.receipt) {
//         data.append('receipt', formData.receipt);
//       }

//       if (isEdit) {
//         await expensesAPI.update(id, data);
//         setSuccess('Expense updated successfully!');
//       } else {
//         await expensesAPI.create(data);
//         setSuccess('Expense created successfully!');
//       }

//       setTimeout(() => navigate('/expenses'), 1500);
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || 'Failed to save expense';
//       setError(errorMessage);
//       console.error('Save expense error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeReceipt = () => {
//     setFormData(prev => ({ ...prev, receipt: null }));
//     setReceiptPreview(null);
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(amount);
//   };

//   if (loading && isEdit) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center mb-4">
//             <button
//               onClick={() => navigate('/expenses')}
//               className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//             </button>
//             <h1 className="text-3xl font-bold text-gray-900">
//               {isEdit ? 'Edit Expense' : 'Add New Expense'}
//             </h1>
//           </div>
//           <p className="text-gray-600 ml-11">
//             {isEdit ? 'Update your expense details' : 'Track a new expense to manage your budget'}
//           </p>
//         </div>

//         {/* Alerts */}
//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//             <div className="flex items-center">
//               <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//               <span className="text-red-800">{error}</span>
//             </div>
//           </div>
//         )}

//         {success && (
//           <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
//             <div className="flex items-center">
//               <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <span className="text-green-800">{success}</span>
//             </div>
//           </div>
//         )}

//         {/* Form Card */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Amount Field */}
//             <div>
//               <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
//                 Amount *
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <span className="text-gray-500">$</span>
//                 </div>
//                 <input
//                   id="amount"
//                   name="amount"
//                   type="number"
//                   value={formData.amount}
//                   onChange={handleChange}
//                   step="0.01"
//                   min="0"
//                   required
//                   className="pl-8 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   placeholder="0.00"
//                   disabled={loading}
//                 />
//               </div>
//               {formData.amount && (
//                 <p className="mt-1 text-sm text-gray-500">
//                   {formatCurrency(parseFloat(formData.amount) || 0)}
//                 </p>
//               )}
//             </div>

//             {/* Category Field */}
//             <div>
//               <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
//                 Category *
//               </label>
//               <select
//                 id="categoryId"
//                 name="categoryId"
//                 value={formData.categoryId}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                 disabled={loading}
//               >
//                 <option value="">Select a category</option>
//                 {categories.map(category => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Type Field */}
//             <div>
//               <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
//                 Type *
//               </label>
//               <div className="grid grid-cols-2 gap-4">
//                 <label className="relative flex cursor-pointer">
//                   <input
//                     type="radio"
//                     name="type"
//                     value="one-time"
//                     checked={formData.type === 'one-time'}
//                     onChange={handleChange}
//                     className="sr-only"
//                     disabled={loading}
//                   />
//                   <div className={`w-full p-4 border rounded-lg text-center transition-colors ${
//                     formData.type === 'one-time'
//                       ? 'border-blue-500 bg-blue-50 text-blue-700'
//                       : 'border-gray-300 text-gray-700 hover:border-gray-400'
//                   }`}>
//                     <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     One-time
//                   </div>
//                 </label>
//                 <label className="relative flex cursor-pointer">
//                   <input
//                     type="radio"
//                     name="type"
//                     value="recurring"
//                     checked={formData.type === 'recurring'}
//                     onChange={handleChange}
//                     className="sr-only"
//                     disabled={loading}
//                   />
//                   <div className={`w-full p-4 border rounded-lg text-center transition-colors ${
//                     formData.type === 'recurring'
//                       ? 'border-blue-500 bg-blue-50 text-blue-700'
//                       : 'border-gray-300 text-gray-700 hover:border-gray-400'
//                   }`}>
//                     <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                     </svg>
//                     Recurring
//                   </div>
//                 </label>
//               </div>
//             </div>

//             {/* Date Fields */}
//             {formData.type === 'one-time' && (
//               <div>
//                 <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
//                   Date *
//                 </label>
//                 <input
//                   id="date"
//                   name="date"
//                   type="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   disabled={loading}
//                 />
//               </div>
//             )}

//             {formData.type === 'recurring' && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
//                     Start Date *
//                   </label>
//                   <input
//                     id="startDate"
//                     name="startDate"
//                     type="date"
//                     value={formData.startDate}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     disabled={loading}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
//                     End Date (optional)
//                   </label>
//                   <input
//                     id="endDate"
//                     name="endDate"
//                     type="date"
//                     value={formData.endDate}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     disabled={loading}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Description Field */}
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                 placeholder="Additional details about this expense (optional)"
//                 disabled={loading}
//               />
//             </div>

//             {/* Receipt Field */}
//             <div>
//               <label htmlFor="receipt" className="block text-sm font-medium text-gray-700 mb-2">
//                 Receipt (JPG, PNG, PDF - max 5MB)
//               </label>
//               <input
//                 id="receipt"
//                 name="receipt"
//                 type="file"
//                 onChange={handleChange}
//                 accept=".jpg,.jpeg,.png,.pdf"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 disabled={loading}
//               />
              
//               {/* Receipt Preview */}
//               {(receiptPreview || formData.receipt) && (
//                 <div className="mt-3">
//                   <p className="text-sm text-gray-600 mb-2">Receipt preview:</p>
//                   {receiptPreview && receiptPreview.startsWith('data:image/') ? (
//                     <div className="relative">
//                       <img
//                         src={receiptPreview}
//                         alt="Receipt preview"
//                         className="w-32 h-32 object-cover rounded-lg border"
//                       />
//                       <button
//                         type="button"
//                         onClick={removeReceipt}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center space-x-2">
//                       <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                       </svg>
//                       <span className="text-sm text-gray-600">
//                         {formData.receipt?.name || 'Document attached'}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={removeReceipt}
//                         className="text-red-500 hover:text-red-700 text-sm"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Form Actions */}
//             <div className="flex flex-col sm:flex-row gap-3 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     {isEdit ? 'Updating...' : 'Creating...'}
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center">
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     {isEdit ? 'Update Expense' : 'Create Expense'}
//                   </div>
//                 )}
//               </button>
              
//               <button
//                 type="button"
//                 onClick={() => navigate('/expenses')}
//                 disabled={loading}
//                 className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Quick Tips */}
//         <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
//           <h3 className="text-lg font-medium text-blue-900 mb-3 flex items-center">
//             <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//             </svg>
//             Quick Tips
//           </h3>
//           <ul className="text-sm text-blue-800 space-y-2">
//             <li>• Use recurring expenses for monthly bills and subscriptions</li>
//             <li>• Add receipts for better expense tracking and documentation</li>
//             <li>• Use specific descriptions to easily identify expenses later</li>
//             <li>• Categorize expenses accurately for better budget analysis</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExpenseForm;


import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { expensesAPI, categoriesAPI } from '../services/api';

const ExpenseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    categoryId: '',
    description: '',
    type: 'one-time',
    startDate: '',
    endDate: '',
    receipt: null
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [receiptPreview, setReceiptPreview] = useState(null);

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchExpense();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data);
      
      // Set default category if not editing
      if (!isEdit && response.data.length > 0 && !formData.categoryId) {
        setFormData(prev => ({ ...prev, categoryId: response.data[0].id }));
      }
    } catch (error) {
      setError('Failed to fetch categories');
      console.error('Categories error:', error);
    }
  };

  const fetchExpense = async () => {
    try {
      setLoading(true);
      const response = await expensesAPI.getById(id);
      const expense = response.data;
      
      setFormData({
        amount: expense.amount.toString(),
        date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : '',
        categoryId: expense.categoryId,
        description: expense.description || '',
        type: expense.type,
        startDate: expense.startDate ? new Date(expense.startDate).toISOString().split('T')[0] : '',
        endDate: expense.endDate ? new Date(expense.endDate).toISOString().split('T')[0] : '',
        receipt: null
      });

      if (expense.receiptUrl) {
        setReceiptPreview(expense.receiptUrl);
      }
    } catch (error) {
      setError('Failed to fetch expense details');
      console.error('Expense fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files[0]) {
      const file = files[0];
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setError('Please select a JPG, PNG, or PDF file');
        return;
      }

      setFormData(prev => ({ ...prev, [name]: file }));
      setError('');
      
      // Create preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setReceiptPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setReceiptPreview(null);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validation
      if (!formData.amount || !formData.categoryId) {
        throw new Error('Amount and category are required');
      }

      const amountValue = parseFloat(formData.amount);
      if (isNaN(amountValue) || amountValue <= 0) {
        throw new Error('Amount must be a positive number');
      }

      if (formData.type === 'one-time' && !formData.date) {
        throw new Error('Date is required for one-time expenses');
      }

      if (formData.type === 'recurring' && !formData.startDate) {
        throw new Error('Start date is required for recurring expenses');
      }

      // Prepare data for API
      const apiData = {
        amount: amountValue,
        categoryId: formData.categoryId,
        type: formData.type,
        description: formData.description,
        receipt: formData.receipt
      };

      // Add date fields based on type
      if (formData.type === 'one-time') {
        apiData.date = formData.date;
      } else {
        apiData.startDate = formData.startDate;
        apiData.endDate = formData.endDate;
      }

      if (isEdit) {
        await expensesAPI.update(id, apiData);
        setSuccess('Expense updated successfully!');
      } else {
        await expensesAPI.create(apiData);
        setSuccess('Expense created successfully!');
      }

      // Redirect after success
      setTimeout(() => navigate('/expenses'), 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to save expense';
      setError(errorMessage);
      console.error('Save expense error:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeReceipt = () => {
    setFormData(prev => ({ ...prev, receipt: null }));
    setReceiptPreview(null);
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
              onClick={() => navigate('/expenses')}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? 'Edit Expense' : 'Add New Expense'}
            </h1>
          </div>
          <p className="text-gray-600 ml-11">
            {isEdit ? 'Update your expense details' : 'Track a new expense to manage your budget'}
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
                  className="pl-8 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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

            {/* Category Field */}
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                disabled={loading}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Field */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative flex cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="one-time"
                    checked={formData.type === 'one-time'}
                    onChange={handleChange}
                    className="sr-only"
                    disabled={loading}
                  />
                  <div className={`w-full p-4 border rounded-lg text-center transition-colors ${
                    formData.type === 'one-time'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}>
                    <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    One-time
                  </div>
                </label>
                <label className="relative flex cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="recurring"
                    checked={formData.type === 'recurring'}
                    onChange={handleChange}
                    className="sr-only"
                    disabled={loading}
                  />
                  <div className={`w-full p-4 border rounded-lg text-center transition-colors ${
                    formData.type === 'recurring'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}>
                    <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Recurring
                  </div>
                </label>
              </div>
            </div>

            {/* Date Fields */}
            {formData.type === 'one-time' && (
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  disabled={loading}
                />
              </div>
            )}

            {formData.type === 'recurring' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date (optional)
                  </label>
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    disabled={loading}
                  />
                </div>
              </div>
            )}

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
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Additional details about this expense (optional)"
                disabled={loading}
              />
            </div>

            {/* Receipt Field */}
            <div>
              <label htmlFor="receipt" className="block text-sm font-medium text-gray-700 mb-2">
                Receipt (JPG, PNG, PDF - max 5MB)
              </label>
              <input
                id="receipt"
                name="receipt"
                type="file"
                onChange={handleChange}
                accept=".jpg,.jpeg,.png,.pdf"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={loading}
              />
              
              {/* Receipt Preview */}
              {(receiptPreview || formData.receipt) && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Receipt preview:</p>
                  {receiptPreview && (receiptPreview.startsWith('data:image/') || receiptPreview.startsWith('/api/uploads/')) ? (
                    <div className="relative">
                      <img
                        src={receiptPreview}
                        alt="Receipt preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={removeReceipt}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {formData.receipt?.name || 'Document attached'}
                      </span>
                      <button
                        type="button"
                        onClick={removeReceipt}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                    {isEdit ? 'Update Expense' : 'Create Expense'}
                  </div>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/expenses')}
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
            <li>• Use recurring expenses for monthly bills and subscriptions</li>
            <li>• Add receipts for better expense tracking and documentation</li>
            <li>• Use specific descriptions to easily identify expenses later</li>
            <li>• Categorize expenses accurately for better budget analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;