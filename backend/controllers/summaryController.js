const prisma = require('../config/database');

const calculateMonthlySummary = async (userId, month) => {
  const date = month ? new Date(month) : new Date();
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);


  const incomes = await prisma.income.findMany({
    where: {
      userId,
      date: {
        gte: startOfMonth,
        lte: endOfMonth
      }
    }
  });

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  // Get all expenses for the month (one-time and recurring)
  const expenses = await prisma.expense.findMany({
    where: {
      userId,
      OR: [
        // One-time expenses in the month
        {
          type: 'one-time',
          date: {
            gte: startOfMonth,
            lte: endOfMonth
          }
        },
        // Recurring expenses active during the month
        {
          type: 'recurring',
          OR: [
            {
              AND: [
                { startDate: { lte: endOfMonth } },
                { endDate: null }
              ]
            },
            {
              AND: [
                { startDate: { lte: endOfMonth } },
                { endDate: { gte: startOfMonth } }
              ]
            }
          ]
        }
      ]
    },
    include: {
      category: {
        select: { name: true }
      }
    }
  });

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const categoryName = expense.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }
    acc[categoryName] += expense.amount;
    return acc;
  }, {});

  return {
    period: {
      start: startOfMonth,
      end: endOfMonth
    },
    totalIncome,
    totalExpenses,
    balance,
    expensesByCategory,
    incomeCount: incomes.length,
    expenseCount: expenses.length
  };
};

const summaryController = {
  getMonthlySummary: async (req, res) => {
    try {
      const userId = req.user.id;
      const { month } = req.query;

      const summary = await calculateMonthlySummary(userId, month);

      res.status(200).json(summary);
    } catch (error) {
      console.error('Get monthly summary error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getCustomSummary: async (req, res) => {
    try {
      const userId = req.user.id;
      const { start, end } = req.query;

      if (!start || !end) {
        return res.status(400).json({ error: 'Start and end dates are required' });
      }

      const startDate = new Date(start);
      const endDate = new Date(end);

      // Get all incomes for the period
      const incomes = await prisma.income.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: endDate
          }
        }
      });

      const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

      // Get all expenses for the period (one-time and recurring)
      const expenses = await prisma.expense.findMany({
        where: {
          userId,
          OR: [
            // One-time expenses in the period
            {
              type: 'one-time',
              date: {
                gte: startDate,
                lte: endDate
              }
            },
            // Recurring expenses active during the period
            {
              type: 'recurring',
              OR: [
                {
                  AND: [
                    { startDate: { lte: endDate } },
                    { endDate: null }
                  ]
                },
                {
                  AND: [
                    { startDate: { lte: endDate } },
                    { endDate: { gte: startDate } }
                  ]
                }
              ]
            }
          ]
        },
        include: {
          category: {
            select: { name: true }
          }
        }
      });

      const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const balance = totalIncome - totalExpenses;

      // Group expenses by category
      const expensesByCategory = expenses.reduce((acc, expense) => {
        const categoryName = expense.category.name;
        if (!acc[categoryName]) {
          acc[categoryName] = 0;
        }
        acc[categoryName] += expense.amount;
        return acc;
      }, {});

      const summary = {
        period: {
          start: startDate,
          end: endDate
        },
        totalIncome,
        totalExpenses,
        balance,
        expensesByCategory,
        incomeCount: incomes.length,
        expenseCount: expenses.length
      };

      res.status(200).json(summary);
    } catch (error) {
      console.error('Get custom summary error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getBudgetAlerts: async (req, res) => {
    try {
      const userId = req.user.id;
      const summary = await calculateMonthlySummary(userId);

      if (summary.balance < 0) {
        res.status(200).json({
          alert: true,
          message: `You've exceeded your budget for this month by $${Math.abs(summary.balance).toFixed(2)}`,
          amountOver: Math.abs(summary.balance)
        });
      } else {
        res.status(200).json({
          alert: false,
          message: 'You are within your budget for this month'
        });
      }
    } catch (error) {
      console.error('Get alerts error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

};

module.exports = summaryController;