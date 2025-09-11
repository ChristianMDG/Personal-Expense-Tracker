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
import { summaryAPI } from "../services";
import { use } from "react";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [budgetAlert, setBudgetAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const COLORS = [
    "var(--primary-color)",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

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
    new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
    }).format(amount);

  const getBalanceColor = (balance) =>
    balance >= 0 ? "text-green-600" : "text-red-600";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        {error}
      </div>
    );
  }

  if (!summary)
    return <div className="text-center py-12">No data available</div>;

  const { totalIncome, totalExpenses, balance, expensesByCategory } = summary;

  const categoryData = Object.entries(expensesByCategory || {}).map(
    ([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    })
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto pa">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
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
              + Add Income
            </Link>
            <Link
              to="/expenses/new"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
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
                <svg
                  className="h-5 w-5 text-orange-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-orange-800">
                  Budget Alert
                </h3>
                <p className="mt-2 text-sm text-orange-700">
                  {budgetAlert.message}
                </p>
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
              <p className="text-2xl font-bold text-[var(--primary-color)]">
                {formatCurrency(totalIncome)}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">💸</div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              {balance >= 0 ? "📈" : "📉"}
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Balance</p>
              <p className={`text-2xl font-bold text-[var(--primary-color)]`}>
                {formatCurrency(balance)}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">🎯</div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Savings Rate</p>
              <p className="text-2xl font-bold text-[var(--secondary-color)]">
                {totalIncome > 0
                  ? `${((balance / totalIncome) * 100).toFixed(1)}%`
                  : "0%"}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expenses by Category */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
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
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
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
              <p className="text-gray-500 text-center py-12">
                No category data
              </p>
            )}
            {/* Footer space */}
            <div className="mt-auto py-4 text-center text-gray-400 text-sm">
              Summary updated monthly
            </div>
          </div>

          {/* Monthly Income vs Expenses */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Income vs Expenses
            </h3>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                              dataKey="value"
                              label={({ name, percent }) =>
                                `${name} (${(percent * 100).toFixed(0)}%)`
                              }
                            >
                              {categoryData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Legend />
                            <Tooltip
                              formatter={(value) => formatCurrency(value)}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <p className="text-gray-500 text-center">
                          No category data
                        </p>
                      )}
                    </div>

                    {/* Monthly Income vs Expenses */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Monthly Income vs Expenses
                      </h3>
                      {monthlyData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={monthlyData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip
                              formatter={(value) => formatCurrency(value)}
                            />
                            <Legend />
                            <Bar
                              dataKey="income"
                              fill="#0088FE"
                              name="Income"
                            />
                            <Bar
                              dataKey="expenses"
                              fill="#FF8042"
                              name="Expenses"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <p className="text-gray-500 text-center">
                          No monthly trend data
                        </p>
                      )}
                    </div>
                  </div>{" "}
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="income" fill="#2C98A0" name="Income" />
                  <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-12">
                No monthly trend data
              </p>
            )}
            {/* Footer space */}
            <div className="mt-auto py-4 text-center text-gray-400 text-sm">
              Data reflects your latest transactions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
