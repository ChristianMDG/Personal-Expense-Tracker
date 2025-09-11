import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  Wallet,
  DollarSign,
  CreditCard,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"; // ✅ Import des icônes
import { summaryAPI } from "../services";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [budgetAlert, setBudgetAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Couleurs pastel
  const COLORS = [
    "var(--primary-color)",
    "#FFB5E8",
    "#FFD8A8",
    "#A7F3D0",
    "#C7D2FE",
    "#F3C6FF",
  ];

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // ✅ Fonction pour format MGA
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);

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

  const {
    totalIncome = 0,
    totalExpenses = 0,
    balance = 0,
    totalSavings = 0,
    expensesByCategory = {},
  } = summary;

  // ✅ Cards dynamiques
  const cards = [
    {
      title: "Total Balance",
      value: formatCurrency(balance),
      change: "+22%", // ⚠️ ici tu pourras brancher une valeur réelle plus tard
      trend: "up",
      color: "from-teal-400 to-cyan-500",
      icon: <Wallet className="w-6 h-6 text-white" />,
    },
    {
      title: "Total Income",
      value: formatCurrency(totalIncome),
      change: "+36%",
      trend: "up",
      color: "from-blue-400 to-indigo-500",
      icon: <DollarSign className="w-6 h-6 text-white" />,
    },
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      change: "-11%",
      trend: "down",
      color: "from-pink-400 to-rose-500",
      icon: <CreditCard className="w-6 h-6 text-white" />,
    },
    {
      title: "Total Savings",
      value: formatCurrency(totalSavings),
      change: "+15%",
      trend: "up",
      color: "from-purple-400 to-violet-500",
      icon: <PiggyBank className="w-6 h-6 text-white" />,
    },
  ];

  // ✅ Transformer les catégories pour recharts
  const categoryData = Object.entries(expensesByCategory || {}).map(
    ([name, value], index) => ({
      name,
      value: Number(value) || 0,
      color: COLORS[index % COLORS.length],
    })
  );

  const totalCategoryValue = categoryData.reduce(
    (acc, cur) => acc + cur.value,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
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

        {/* ✅ Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`bg-gradient-to-r ${card.color} rounded-2xl shadow-lg p-6 text-white relative overflow-hidden`}
            >
              <div className="flex items-center justify-between">
                <div className="bg-white/20 p-3 rounded-xl">{card.icon}</div>
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    card.trend === "up"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {card.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {card.change}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-lg font-medium opacity-90">{card.title}</p>
                <h3 className="text-3xl font-bold mt-2">{card.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Expenses by Category */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Expenses by Category
            </h3>
            {categoryData.length > 0 ? (
              <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch gap-6">
                <div className="flex-1 relative min-w-[260px]">
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={6}
                        startAngle={90}
                        endAngle={-270}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-xl font-bold text-gray-800">
                      {formatCurrency(
                        Number(totalExpenses) || totalCategoryValue
                      )}
                    </div>
                    <div className="text-sm text-gray-500">Spent</div>
                  </div>
                </div>

                <div className="w-56">
                  {categoryData.map((cat, idx) => {
                    const percent =
                      totalCategoryValue > 0
                        ? ((cat.value / totalCategoryValue) * 100).toFixed(0)
                        : 0;
                    return (
                      <div
                        key={cat.name + idx}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center">
                          <span
                            className="inline-block w-3 h-3 rounded-full mr-3"
                            style={{ background: cat.color }}
                          />
                          <span className="text-sm text-gray-700">
                            {cat.name}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">{percent}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-12">No category data</p>
            )}
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
