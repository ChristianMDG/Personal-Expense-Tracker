// import { useState, useEffect } from "react";
// import { summaryAPI } from "../services";
// import { Link } from "react-router-dom";
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const Dashboard = () => {
//   const [summary, setSummary] = useState(null);
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [budgetAlert, setBudgetAlert] = useState(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
      
//       const today = new Date();
//       const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
//       const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

//       const [summaryResponse, alertsResponse] = await Promise.all([
//         summaryAPI.getMonthly(),
//         summaryAPI.getAlerts()
//       ]);

//       setSummary(summaryResponse.data);
//       setBudgetAlert(alertsResponse.data);
      
//       // Simuler des données mensuelles
//       const months = [];
//       for (let i = 5; i >= 0; i--) {
//         const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
//         const monthName = date.toLocaleString("default", { month: "short" });
//         months.push({
//           name: `${monthName}`,
//           income: Math.floor(Math.random() * 5000) + 2000,
//           expenses: Math.floor(Math.random() * 4000) + 1000,
//         });
//       }
//       setMonthlyData(months);
//     } catch (error) {
//       setError("Failed to load dashboard data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
//         {error}
//       </div>
//     );
//   }

//   if (!summary) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-600">No data available</p>
//       </div>
//     );
//   }

//   const { totalIncome, totalExpenses, balance, expensesByCategory } = summary;

//   const categoryData = Object.entries(expensesByCategory || {}).map(
//     ([name, value], index) => ({
//       name,
//       value,
//       color: COLORS[index % COLORS.length],
//     })
//   );

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("fr-MG", {
//       style: "currency",
//       currency: "MGA",
//     }).format(amount);
//   };

//   const getBalanceColor = (balance) => {
//     return balance >= 0 ? "text-green-600" : "text-red-600";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 px-4">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">Financial Dashboard</h1>
//               <p className="text-gray-600 mt-2">Overview of your financial health</p>
//             </div>
//             <div className="flex space-x-2">
//               <Link
//                 to="/incomes/new"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//               >
//                 + Add Income
//               </Link>
//               <Link
//                 to="/expenses/new"
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//               >
//                 + Add Expense
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Budget Alert */}
//         {budgetAlert && budgetAlert.alert && (
//           <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-orange-800">Budget Alert</h3>
//                 <p className="mt-2 text-sm text-orange-700">{budgetAlert.message}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center">
//               <div className="p-3 bg-green-100 rounded-lg">💰</div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">Total Income</p>
//                 <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center">
//               <div className="p-3 bg-red-100 rounded-lg">💸</div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">Total Expenses</p>
//                 <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center">
//               <div className="p-3 bg-blue-100 rounded-lg">{balance >= 0 ? "📈" : "📉"}</div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">Balance</p>
//                 <p className={`text-2xl font-bold ${getBalanceColor(balance)}`}>{formatCurrency(balance)}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center">
//               <div className="p-3 bg-purple-100 rounded-lg">🎯</div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">Savings Rate</p>
//                 <p className="text-2xl font-bold text-purple-600">
//                   {totalIncome > 0 ? `${((balance / totalIncome) * 100).toFixed(1)}%` : "0%"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Charts Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Expenses by Category */}
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h3>
//             {categoryData.length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={categoryData}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={100}
//                     dataKey="value"
//                     label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//                   >
//                     {categoryData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip formatter={(value) => [formatCurrency(value), "Amount"]} />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="text-center py-12 text-gray-500">No expense data available</div>
//             )}
//           </div>

//           {/* Income vs Expenses Trend */}
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses Trend</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={monthlyData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => formatCurrency(value)} />
//                 <Legend />
//                 <Bar dataKey="income" fill="#00C49F" name="Income" />
//                 <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>     
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { summaryAPI } from "../services"; // ton service existant

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [budgetAlert, setBudgetAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [summaryRes, alertRes, trendRes] = await Promise.all([
        summaryAPI.getMonthly(),
        summaryAPI.getAlerts(),
        summaryAPI.getMonthlyTrend(),
      ]);

      setSummary(summaryRes.data);
      setBudgetAlert(alertRes.data);
      setMonthlyData(trendRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("fr-MG", { style: "currency", currency: "MGA" }).format(amount);

  const getBalanceColor = (balance) => (balance >= 0 ? "text-green-600" : "text-red-600");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">{error}</div>;
  }

  if (!summary) return <div className="text-center py-12">No data available</div>;

  const { totalIncome, totalExpenses, balance, expensesByCategory } = summary;

  const categoryData = Object.entries(expensesByCategory || {}).map(([name, value], index) => ({
    name,
    value,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Financial Dashboard</h1>
            <p className="text-gray-600 mt-2">Overview of your financial health</p>
          </div>
          <div className="flex space-x-2">
            <Link
              to="/incomes/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + Add Income
            </Link>
            <Link
              to="/expenses/new"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              + Add Expense
            </Link>
          </div>
        </div>

        {/* Budget Alert */}
        {budgetAlert && budgetAlert.alert && (
          <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-orange-800">Budget Alert</h3>
                <p className="mt-2 text-sm text-orange-700">{budgetAlert.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">💰</div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">💸</div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">{balance >= 0 ? "📈" : "📉"}</div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Balance</p>
              <p className={`text-2xl font-bold ${getBalanceColor(balance)}`}>{formatCurrency(balance)}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">🎯</div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Savings Rate</p>
              <p className="text-2xl font-bold text-purple-600">
                {totalIncome > 0 ? `${((balance / totalIncome) * 100).toFixed(1)}%` : "0%"}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expenses by Category */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h3>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center">No category data</p>
            )}
          </div>

          {/* Monthly Income vs Expenses */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Income vs Expenses</h3>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="income" fill="#0088FE" name="Income" />
                  <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center">No monthly trend data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
