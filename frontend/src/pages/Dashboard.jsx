
import { useState, useEffect } from "react";
import { summaryAPI } from "../services/api";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [timeRange, setTimeRange] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [budgetAlert, setBudgetAlert] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      let startDate, endDate;
      const today = new Date();

      if (timeRange === "monthly") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      } else if (timeRange === "quarterly") {
        startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
        endDate = today;
      } else {
        // yearly
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = today;
      }

      const [summaryResponse, monthlyResponse, alertsResponse] = await Promise.all([
        summaryAPI.getMonthly(),
        summaryAPI.getCustom({
          start: startDate.toISOString().split("T")[0],
          end: endDate.toISOString().split("T")[0],
        }),
        summaryAPI.getAlerts() // Récupérer les alertes budget
      ]);

      setSummary(summaryResponse.data);
      setBudgetAlert(alertsResponse.data);
      processMonthlyData(monthlyResponse.data);
    } catch (error) {
      setError("Failed to fetch dashboard data");
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const processMonthlyData = () => {
    // Simuler des données mensuelles pour la démonstration
    const months = [];
    const currentDate = new Date();

    // for (let i = 5; i >= 0; i--) {
    //   const date = new Date(
    //     currentDate.getFullYear(),
    //     currentDate.getMonth() - i,
    //     1
    //   );
    //   const monthName = date.toLocaleString("default", { month: "short" });
    //   const year = date.getFullYear();

    //   months.push({
    //     name: `${monthName} ${year}`,
    //     income: Math.floor(Math.random() * 5000) + 2000,
    //     expenses: Math.floor(Math.random() * 4000) + 1000,
    //     savings: Math.floor(Math.random() * 2000) + 500,
    //   });
    // }

    setMonthlyData(months);
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FF6B6B",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        {error}
      </div>
    );

  if (!summary)
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No data available</p>
      </div>
    );

  const { totalIncome, totalExpenses, balance, expensesByCategory } = summary;

  const categoryData = Object.entries(expensesByCategory || {}).map(
    ([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    })
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
    }).format(amount);
  };

  const getBalanceColor = (balance) => {
    return balance >= 0 ? "text-green-600" : "text-red-600";
  };

  const getBalanceIcon = (balance) => {
    return balance >= 0 ? "📈" : "📉";
  };


  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
       

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Financial Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Overview of your financial health
              </p>
            </div>
            <div className="flex space-x-2">
              <Link
                to="/incomes/new"
                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-md hover:bg-[var(--secondary-color)]"
              >
               + Add New Income
              </Link>
              <Link
                to="/expenses/new"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
               + Add New Expense
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-500">
              Data updated on: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
 {/* Alerte du backend si disponible */}
        {budgetAlert && budgetAlert.alert && (
          <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-orange-800">
                  Budget Warning
                </h3>
                <div className="mt-2 text-sm text-orange-700">
                  <p>{budgetAlert.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Income
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalIncome)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <span className="text-2xl">💸</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalExpenses)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">{getBalanceIcon(balance)}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Balance</p>
                <p className={`text-2xl font-bold ${getBalanceColor(balance)}`}>
                  {formatCurrency(balance)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Savings Rate
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {totalIncome > 0
                    ? `${((balance / totalIncome) * 100).toFixed(1)}%`
                    : "0%"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Expenses by Category */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Expenses by Category
            </h3>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [formatCurrency(value), "Amount"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No expense data available
              </div>
            )}
          </div>

          {/* Income vs Expenses Trend */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Income vs Expenses Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value), ""]} />
                <Legend />
                <Bar dataKey="income" fill="#00C49F" name="Income" />
                <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Incomes */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Incomes
            </h3>
            <div className="text-center text-gray-500">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Les données seront ajoutées ici */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Expenses
            </h3>
            <div className="text-center text-gray-500">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Les données seront ajoutées ici */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

