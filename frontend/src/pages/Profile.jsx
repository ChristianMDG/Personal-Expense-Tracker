
// import { useState, useEffect } from 'react';
// import { userAPI } from '../services/api';
// import { useAuth } from '../contexts/AuthContext';
// import { 
//   PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
//   Tooltip, Legend, ResponsiveContainer 
// } from 'recharts';

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [activeTab, setActiveTab] = useState('overview');
//   const { user, logout } = useAuth();

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     try {
//       setLoading(true);
//       const [profileResponse, statsResponse] = await Promise.all([
//         userAPI.getProfile(),
//         userAPI.getStats && userAPI.getStats().catch(() => null) // Fallback si la route n'existe pas
//       ]);
      
//       setProfile(profileResponse.data);
//       setStats(statsResponse?.data || null);
//     } catch (error) {
//       setError('Failed to fetch profile data');
//       console.error('Profile error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     setError('');
//     setSuccess('');

//     // Ici vous implémenteriez la logique de changement de mot de passe
//     setTimeout(() => {
//       setSuccess('Password updated successfully!');
//       setUpdating(false);
//     }, 1000);
//   };

//   const handleExportData = async () => {
//     try {
//       // Simuler l'export de données
//       setSuccess('Data export started. You will receive an email shortly.');
//     } catch (error) {
//       setError('Failed to export data');
//     }
//   };

//   const handleDeleteAccount = async () => {
//     if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
//       return;
//     }

//     if (!window.confirm('⚠️ This will permanently delete all your data. Please type "DELETE" to confirm.')) {
//       return;
//     }

//     // Ici vous implémenteriez la logique de suppression de compte
//     setError('Account deletion is not implemented yet.');
//   };

//   if (loading) return <div className="loading">Loading profile...</div>;

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

//   return (
//     <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
//       {/* Header */}
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center', 
//         marginBottom: '30px',
//         paddingBottom: '20px',
//         borderBottom: '2px solid #f0f0f0'
//       }}>
//         <div>
//           <h1 style={{ margin: 0, color: '#333' }}>Profile</h1>
//           <p style={{ margin: '5px 0 0 0', color: '#666' }}>Manage your account settings</p>
//         </div>
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <button
//             onClick={handleExportData}
//             style={{
//               padding: '8px 16px',
//               border: '1px solid #007bff',
//               backgroundColor: 'transparent',
//               color: '#007bff',
//               borderRadius: '6px',
//               cursor: 'pointer'
//             }}
//           >
//             Export Data
//           </button>
//         </div>
//       </div>

//       {/* Messages d'alerte */}
//       {error && (
//         <div style={{ 
//           color: '#d32f2f', 
//           backgroundColor: '#ffebee', 
//           padding: '15px', 
//           border: '1px solid #ffcdd2',
//           borderRadius: '6px',
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
//           borderRadius: '6px',
//           marginBottom: '20px'
//         }}>
//           {success}
//         </div>
//       )}

//       {/* Navigation par onglets */}
//       <div style={{ 
//         display: 'flex', 
//         gap: '0', 
//         marginBottom: '30px',
//         borderBottom: '1px solid #ddd'
//       }}>
//         {['overview', 'security', 'preferences'].map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             style={{
//               padding: '12px 24px',
//               border: 'none',
//               backgroundColor: activeTab === tab ? '#007bff' : 'transparent',
//               color: activeTab === tab ? 'white' : '#666',
//               cursor: 'pointer',
//               borderBottom: activeTab === tab ? '2px solid #007bff' : 'none',
//               textTransform: 'capitalize'
//             }}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Contenu des onglets */}
//       {activeTab === 'overview' && (
//         <div>
//           {/* Cartes de statistiques */}
//           <div style={{ 
//             display: 'grid', 
//             gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
//             gap: '20px', 
//             marginBottom: '30px' 
//           }}>
//             <StatCard 
//               title="Total Expenses" 
//               value={profile?._count?.expenses || 0} 
//               icon="💸" 
//               color="#ff4757"
//             />
//             <StatCard 
//               title="Total Income" 
//               value={profile?._count?.incomes || 0} 
//               icon="💰" 
//               color="#2ed573"
//             />
//             <StatCard 
//               title="Categories" 
//               value={profile?._count?.categories || 0} 
//               icon="📊" 
//               color="#3742fa"
//             />
//             <StatCard 
//               title="Member Since" 
//               value={new Date(profile?.createdAt).toLocaleDateString()} 
//               icon="📅" 
//               color="#ffa502"
//             />
//           </div>

//           {/* Graphiques */}
//           <div style={{ 
//             display: 'grid', 
//             gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
//             gap: '20px', 
//             marginBottom: '30px' 
//           }}>
//             <ChartContainer title="Account Overview">
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={[
//                       { name: 'Expenses', value: profile?._count?.expenses || 0 },
//                       { name: 'Income', value: profile?._count?.incomes || 0 }
//                     ]}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={60}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label
//                   >
//                     <Cell fill="#ff4757" />
//                     <Cell fill="#2ed573" />
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </ChartContainer>

//             <ChartContainer title="Monthly Activity">
//               <ResponsiveContainer width="100%" height={200}>
//                 <BarChart
//                   data={[
//                     { month: 'Jan', expenses: 12, income: 15 },
//                     { month: 'Feb', expenses: 19, income: 21 },
//                     { month: 'Mar', expenses: 15, income: 18 },
//                     { month: 'Apr', expenses: 11, income: 13 }
//                   ]}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="expenses" fill="#ff4757" />
//                   <Bar dataKey="income" fill="#2ed573" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </div>

//           {/* Informations du compte */}
//           <div style={{ 
//             padding: '25px', 
//             backgroundColor: 'white', 
//             borderRadius: '12px', 
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//             marginBottom: '20px'
//           }}>
//             <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Account Information</h3>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//               <InfoField label="Email" value={user?.email} />
//               <InfoField label="User ID" value={user?.id} />
//               <InfoField label="Account Created" value={new Date(profile?.createdAt).toLocaleString()} />
//               <InfoField label="Last Updated" value={new Date(profile?.updatedAt).toLocaleString()} />
//             </div>
//           </div>
//         </div>
//       )}

//       {activeTab === 'security' && (
//         <div style={{ 
//           padding: '25px', 
//           backgroundColor: 'white', 
//           borderRadius: '12px', 
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
//         }}>
//           <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Security Settings</h3>
          
//           <form onSubmit={handlePasswordChange} style={{ marginBottom: '30px' }}>
//             <h4 style={{ marginBottom: '15px' }}>Change Password</h4>
//             <div style={{ display: 'grid', gap: '15px', maxWidth: '400px' }}>
//               <div>
//                 <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
//                   Current Password
//                 </label>
//                 <input
//                   type="password"
//                   style={{
//                     width: '100%',
//                     padding: '10px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px'
//                   }}
//                   disabled={updating}
//                 />
//               </div>
//               <div>
//                 <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
//                   New Password
//                 </label>
//                 <input
//                   type="password"
//                   style={{
//                     width: '100%',
//                     padding: '10px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px'
//                   }}
//                   disabled={updating}
//                 />
//               </div>
//               <div>
//                 <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
//                   Confirm New Password
//                 </label>
//                 <input
//                   type="password"
//                   style={{
//                     width: '100%',
//                     padding: '10px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px'
//                   }}
//                   disabled={updating}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={updating}
//                 style={{
//                   padding: '12px 24px',
//                   backgroundColor: updating ? '#ccc' : '#007bff',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: updating ? 'not-allowed' : 'pointer'
//                 }}
//               >
//                 {updating ? 'Updating...' : 'Update Password'}
//               </button>
//             </div>
//           </form>

//           <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '6px', border: '1px solid #ffeaa7' }}>
//             <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>⚠️ Danger Zone</h4>
//             <p style={{ margin: '0 0 15px 0', color: '#856404' }}>
//               Once you delete your account, there is no going back. Please be certain.
//             </p>
//             <button
//               onClick={handleDeleteAccount}
//               style={{
//                 padding: '10px 20px',
//                 backgroundColor: '#dc3545',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer'
//               }}
//             >
//               Delete Account
//             </button>
//           </div>
//         </div>
//       )}

//       {activeTab === 'preferences' && (
//         <div style={{ 
//           padding: '25px', 
//           backgroundColor: 'white', 
//           borderRadius: '12px', 
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
//         }}>
//           <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Preferences</h3>
//           <p style={{ color: '#666' }}>Preferences settings will be available soon.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// // Composants helper
// const StatCard = ({ title, value, icon, color }) => (
//   <div style={{
//     padding: '20px',
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     textAlign: 'center'
//   }}>
//     <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
//     <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>{title}</h3>
//     <div style={{ 
//       fontSize: '24px', 
//       fontWeight: 'bold', 
//       color: color 
//     }}>
//       {value}
//     </div>
//   </div>
// );

// const ChartContainer = ({ title, children }) => (
//   <div style={{
//     padding: '20px',
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//   }}>
//     <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>{title}</h4>
//     {children}
//   </div>
// );

// const InfoField = ({ label, value }) => (
//   <div>
//     <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>{label}:</strong>
//     <span style={{ color: '#333' }}>{value || 'N/A'}</span>
//   </div>
// );

// export default Profile;

import { useState, useEffect } from "react";
import { userAPI } from "../services";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  //etat pour stocker les informations du profil, les statistiques, les états de chargement et de mise à jour, ainsi que les messages d'erreur et de succès
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Récupération des informations de l'utilisateur connecté et de la fonction de déconnexion depuis le contexte d'authentification
  const { user, logout } = useAuth();

  // Utilisation de useEffect pour charger les données du profil au montage du composant
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Fonction pour récupérer les données du profil et des statistiques
  const fetchProfileData = async () => {
    try {
      setLoading(true);

      // Utilisation de Promise.all pour effectuer les deux appels API en parallèle
      const [profileResponse, statsResponse] = await Promise.all([
        userAPI.getProfile(),
        userAPI.getStats && userAPI.getStats().catch(() => null),
      ]);

      // Mise à jour des états avec les données récupérées
      setProfile(profileResponse.data);
      setStats(statsResponse?.data || null);
    } catch (error) {
      setError("Failed to fetch profile data");
      console.error("Profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer le changement de mot de passe
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");
    setSuccess("");

    // Simuler une mise à jour du mot de passe
    setTimeout(() => {
      setSuccess("Password updated successfully!");
      setUpdating(false);
    }, 1000);
  };

  // Fonction pour gérer l'exportation des données
  const handleExportData = async () => {
    try {
      setSuccess("Data export started. You will receive an email shortly.");
    } catch (error) {
      setError("Failed to export data");
    }
  };

  // Fonction pour gérer la suppression du compte utilisateur
  const handleDeleteAccount = async () => {
    //demander une confirmation avant de procéder à la suppression du compte
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    //demander une confirmation supplémentaire en demandant à l'utilisateur de taper "DELETE"
    if (
      !window.confirm(
        'This will permanently delete all your data. Please type "DELETE" to confirm.'
      )
    ) {
      return;
    }

    setError("Account deletion is not implemented yet.");
  };

  // Affichage d'un message de chargement si les données du profil sont en cours de récupération
  if (loading)
    return <div className="loading text-center p-4">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto p-5 md:p-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 pb-5 border-b-2 border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="mt-1 text-gray-600">Manage your account settings</p>
        </div>
      </div>

      {/* Affichage des messages d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-5">
          {error}
        </div>
      )}

      {/* Affichage des messages de succès */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-5">
          {success}
        </div>
      )}

      {/* navigation par onglets */}
      <div className="flex gap-0 mb-8 border-b border-gray-300">
        {["overview", "security"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              py-3 px-6 rounded-t-lg font-medium transition-colors duration-200
              ${
                activeTab === tab
                  ? "bg-[#2c98a0] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contenu de l'onglet Aperçu */}
      {activeTab === "overview" && (
        <div>
          {/* Statistics cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="p-5 bg-white rounded-lg shadow border-l-4 border-red-500">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">💸</div>
                <h3 className="text-sm font-semibold text-gray-600">
                  Total Expenses
                </h3>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {profile?._count?.expenses || 0}
              </div>
            </div>

            <div className="p-5 bg-white rounded-lg shadow border-l-4 border-green-500">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">💰</div>
                <h3 className="text-sm font-semibold text-gray-600">
                  Total Income
                </h3>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {profile?._count?.incomes || 0}
              </div>
            </div>

            <div className="p-5 bg-white rounded-lg shadow border-l-4 border-blue-500">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">📊</div>
                <h3 className="text-sm font-semibold text-gray-600">
                  Categories
                </h3>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {profile?._count?.categories || 0}
              </div>
            </div>

            <div className="p-5 bg-white rounded-lg shadow border-l-4 border-yellow-500">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">📅</div>
                <h3 className="text-sm font-semibold text-gray-600">
                  Member Since
                </h3>
              </div>
              <div className="text-xl font-bold text-gray-800">
                {new Date(profile?.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Account information section */}
          <div className="p-6 bg-white rounded-lg shadow mb-5">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-gray-600 font-medium mb-1">Email:</p>
                <p className="text-gray-800">{user?.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium mb-1">
                  Account Created:
                </p>
                <p className="text-gray-800">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleString
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-medium mb-1">Last Updated:</p>
                <p className="text-gray-800">
                  {profile?.updatedAt
                    ? new Date(profile.updatedAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security tab content */}
      {activeTab === "security" && (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h1 className="mt-0 mb-8 text-gray-800 font-semibold">
            Security Settings
          </h1>

          {/* Password change form */}
          <form onSubmit={handlePasswordChange} className="mb-8">
            <div className="grid gap-4 max-w-md mx-auto">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled={updating}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled={updating}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled={updating}
                />
              </div>
              <div></div>
              <button
                type="submit"
                disabled={updating}
                className={`
                  py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-200
                  ${
                    updating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#2c98a0] hover:bg-opacity-90"
                  }
                `}
              >
                {updating ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>

          {/* Danger zone section */}
          <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="mt-0 mb-2 font-semibold text-yellow-800">
              ⚠️ Danger Zone
            </h4>
            <p className="mt-0 mb-4 text-yellow-800">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="py-2 px-5 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
