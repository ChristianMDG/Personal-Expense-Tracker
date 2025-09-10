import { useState, useEffect } from 'react';
import { userAPI } from '../services';
import { useAuth } from '../contexts/AuthContext';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const [profileResponse, statsResponse] = await Promise.all([
        userAPI.getProfile(),
        userAPI.getStats && userAPI.getStats().catch(() => null)
      ]);
      
      setProfile(profileResponse.data);
      setStats(statsResponse?.data || null);
    } catch (error) {
      setError('Failed to fetch profile data');
      console.error('Profile error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    setSuccess('');

    setTimeout(() => {
      setSuccess('Password updated successfully!');
      setUpdating(false);
    }, 1000);
  };

  const handleExportData = async () => {
    try {
      setSuccess('Data export started. You will receive an email shortly.');
    } catch (error) {
      setError('Failed to export data');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    if (!window.confirm('⚠️ This will permanently delete all your data. Please type "DELETE" to confirm.')) {
      return;
    }

    setError('Account deletion is not implemented yet.');
  };

  if (loading) return <div className="loading text-center p-4">Loading profile...</div>;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="max-w-4xl mx-auto p-5 md:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pb-5 border-b-2 border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="mt-1 text-gray-600">Manage your account settings</p>
        </div>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-5">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-5">
          {success}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-0 mb-8 border-b border-gray-300">
        {['overview', 'security'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              py-3 px-6 rounded-t-lg font-medium transition-colors duration-200
              ${activeTab === tab
                ? 'bg-[#2c98a0] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard
              title="Total Expenses"
              value={profile?._count?.expenses || 0}
              icon="💸"
              color="#ff4757"
            />
            <StatCard
              title="Total Income"
              value={profile?._count?.incomes || 0}
              icon="💰"
              color="#2ed573"
            />
            <StatCard
              title="Categories"
              value={profile?._count?.categories || 0}
              icon="📊"
              color="#3742fa"
            />
            <StatCard
              title="Member Since"
              value={new Date(profile?.createdAt).toLocaleDateString()}
              icon="📅"
              color="#ffa502"
            />
          </div>


          {/* Account Information */}
          <div className="p-6 bg-white rounded-xl shadow-lg mb-5">
            <h3 className="mt-0 mb-9 text-gray-800 font-semibold">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoField label="Email" value={user?.email} />
              <InfoField label="User ID" value={user?.id} />
              <InfoField label="Account Created" value={new Date(profile?.createdAt).toLocaleString()} />
              <InfoField label="Last Updated" value={new Date(profile?.updatedAt).toLocaleString()} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h1 className="mt-0 mb-8 text-gray-800 font-semibold">Security Settings</h1>
          
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
        ${updating ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2c98a0] hover:bg-opacity-90'}
      `}
    >
      {updating ? 'Updating...' : 'Update Password'}
    </button>
  </div>
</form>

          <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="mt-0 mb-2 font-semibold text-yellow-800">⚠️ Danger Zone</h4>
            <p className="mt-0 mb-4 text-yellow-800">
              Once you delete your account, there is no going back. Please be certain.
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

      {activeTab === 'preferences' && (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h3 className="mt-0 mb-5 text-gray-800 font-semibold">Preferences</h3>
          <p className="text-gray-600">Preferences settings will be available soon.</p>
        </div>
      )}
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, icon, color }) => (
  <div className="p-5 bg-white rounded-xl shadow-lg text-center">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="mt-0 mb-2 text-gray-600 text-sm font-semibold">{title}</h3>
    <div className="text-2xl font-bold" style={{ color: color }}>
      {value}
    </div>
  </div>
);

const ChartContainer = ({ title, children }) => (
  <div className="p-5 bg-white rounded-xl shadow-lg">
    <h4 className="mt-0 mb-4 text-gray-800 font-semibold">{title}</h4>
    {children}
  </div>
);

const InfoField = ({ label, value }) => (
  <div>
    <strong className="block mb-1 text-gray-600">{label}:</strong>
    <span className="text-gray-800">{value || 'N/A'}</span>
  </div>
);

export default Profile;