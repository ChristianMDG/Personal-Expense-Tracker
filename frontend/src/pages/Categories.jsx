// import { useState, useEffect } from 'react';
// import { categoriesAPI } from '../services/api';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [newCategoryName, setNewCategoryName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [creating, setCreating] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await categoriesAPI.getAll();
//       setCategories(response.data);
//     } catch (error) {
//       setError('Failed to fetch categories');
//       console.error('Categories error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateCategory = async (e) => {
//     e.preventDefault();
    
//     if (!newCategoryName.trim()) {
//       setError('Category name is required');
//       return;
//     }

//     setCreating(true);
//     setError('');
//     setSuccess('');

//     try {
//       const response = await categoriesAPI.create({ name: newCategoryName.trim() });
//       setCategories(prev => [...prev, response.data]);
//       setNewCategoryName('');
//       setSuccess('Category created successfully!');
      
//       // Clear success message after 3 seconds
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to create category');
//       console.error('Create category error:', error);
//     } finally {
//       setCreating(false);
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this category?')) {
//       return;
//     }

//     try {
//       await categoriesAPI.delete(id);
//       setCategories(prev => prev.filter(category => category.id !== id));
//       setSuccess('Category deleted successfully!');
      
//       // Clear success message after 3 seconds
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to delete category');
//       console.error('Delete category error:', error);
//     }
//   };

//   if (loading) return <div className="loading">Loading...</div>;

//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
//         <h1>Categories</h1>
//       </div>

//       {/* Messages d'alerte */}
//       {error && (
//         <div style={{ 
//           color: '#d32f2f', 
//           backgroundColor: '#ffebee', 
//           padding: '15px', 
//           border: '1px solid #ffcdd2',
//           borderRadius: '4px',
//           marginBottom: '20px'
//         }}>
//           {error}
//         </div>
//       )}

//       {success && (
//         <div style={{ 
//           color: '#2e7d32', 
//           backgroundColor: '#e8f5e8', 
//           padding: '15px', 
//           border: '1px solid #c8e6c9',
//           borderRadius: '4px',
//           marginBottom: '20px'
//         }}>
//           {success}
//         </div>
//       )}

//       {/* Formulaire d'ajout de catégorie */}
//       <div style={{ 
//         padding: '20px', 
//         backgroundColor: 'white', 
//         borderRadius: '8px', 
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//         marginBottom: '30px'
//       }}>
//         <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Add New Category</h3>
//         <form onSubmit={handleCreateCategory} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
//               Category Name
//             </label>
//             <input
//               type="text"
//               value={newCategoryName}
//               onChange={(e) => setNewCategoryName(e.target.value)}
//               placeholder="Enter category name"
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 fontSize: '16px'
//               }}
//               disabled={creating}
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={creating || !newCategoryName.trim()}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: creating ? '#ccc' : '#007bff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: creating ? 'not-allowed' : 'pointer',
//               fontSize: '16px',
//               minWidth: '120px'
//             }}
//           >
//             {creating ? 'Adding...' : 'Add Category'}
//           </button>
//         </form>
//       </div>

//       {/* Liste des catégories */}
//       <div style={{ 
//         padding: '20px', 
//         backgroundColor: 'white', 
//         borderRadius: '8px', 
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
//       }}>
//         <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Your Categories</h3>
        
//         {categories.length === 0 ? (
//           <div style={{ 
//             textAlign: 'center', 
//             padding: '40px', 
//             color: '#666',
//             backgroundColor: '#f9f9f9',
//             borderRadius: '4px'
//           }}>
//             <p style={{ margin: 0, fontSize: '18px' }}>No categories yet.</p>
//             <p style={{ margin: '10px 0 0 0', color: '#999' }}>Add your first category above!</p>
//           </div>
//         ) : (
//           <div style={{ display: 'grid', gap: '10px' }}>
//             {categories.map(category => (
//               <div
//                 key={category.id}
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   padding: '15px',
//                   border: '1px solid #e0e0e0',
//                   borderRadius: '6px',
//                   backgroundColor: '#fafafa',
//                   transition: 'background-color 0.2s'
//                 }}
//               >
//                 <span style={{ 
//                   fontSize: '16px', 
//                   fontWeight: '500',
//                   color: '#333'
//                 }}>
//                   {category.name}
//                 </span>
                
//                 <button
//                   onClick={() => handleDeleteCategory(category.id)}
//                   style={{
//                     padding: '6px 12px',
//                     backgroundColor: '#ff4757',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                     transition: 'background-color 0.2s'
//                   }}
//                   onMouseOver={(e) => e.target.style.backgroundColor = '#ff3742'}
//                   onMouseOut={(e) => e.target.style.backgroundColor = '#ff4757'}
//                   title="Delete category"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Informations */}
//       <div style={{ 
//         marginTop: '20px', 
//         padding: '15px', 
//         backgroundColor: '#e3f2fd', 
//         borderRadius: '6px',
//         border: '1px solid #bbdefb'
//       }}>
//         <p style={{ margin: 0, color: '#1976d2', fontSize: '14px' }}>
//           💡 <strong>Note:</strong> You cannot delete categories that are being used by expenses. 
//           Default categories (Food, Transportation, etc.) are created automatically when you sign up.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Categories;


import { useState, useEffect } from 'react';
import { categoriesAPI } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      setError('Failed to fetch categories');
      console.error('Categories error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    
    if (!newCategoryName.trim()) {
      setError('Category name is required');
      return;
    }

    setCreating(true);
    setError('');
    setSuccess('');

    try {
      const response = await categoriesAPI.create({ name: newCategoryName.trim() });
      setCategories(prev => [...prev, response.data]);
      setNewCategoryName('');
      setSuccess('Category created successfully!');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create category');
      console.error('Create category error:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateCategory = async (id, newName) => {
    if (!newName.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      const response = await categoriesAPI.update(id, { name: newName.trim() });
      setCategories(prev => prev.map(cat => 
        cat.id === id ? response.data : cat
      ));
      setEditingId(null);
      setEditName('');
      setSuccess('Category updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update category');
      console.error('Update category error:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      await categoriesAPI.delete(id);
      setCategories(prev => prev.filter(category => category.id !== id));
      setSuccess('Category deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete category');
      console.error('Delete category error:', error);
    }
  };

  const startEditing = (category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isDefaultCategory = (categoryName) => {
    const defaultCategories = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Rent', 'Healthcare', 'Other'];
    return defaultCategories.includes(categoryName);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600 mt-2">Organize your expenses with custom categories</p>
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

        {/* Add Category Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Category</h2>
          <form onSubmit={handleCreateCategory} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                id="categoryName"
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                disabled={creating}
              />
            </div>
            <button
              type="submit"
              disabled={creating || !newCategoryName.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {creating ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </div>
              ) : (
                'Add Category'
              )}
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Categories</h2>
            <span className="text-sm text-gray-500">
              {categories.length} {categories.length === 1 ? 'category' : 'categories'}
            </span>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No categories yet</h3>
              <p className="mt-2 text-gray-500">Get started by adding your first category above.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {editingId === category.id ? (
                    <div className="flex items-center space-x-3 flex-1">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        autoFocus
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateCategory(category.id, editName)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="px-3 py-1 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-900 font-medium">{category.name}</span>
                        {isDefaultCategory(category.name) && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {!isDefaultCategory(category.name) && (
                          <>
                            <button
                              onClick={() => startEditing(category)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                              title="Edit category"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete category"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Information Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Important Information</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Default categories cannot be edited or deleted</li>
                  <li>Categories used by expenses cannot be deleted</li>
                  <li>Use descriptive names for better organization</li>
                  <li>You can create up to 50 custom categories</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;