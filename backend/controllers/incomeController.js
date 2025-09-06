const prisma = require('../config/database');

const incomeController = {
  getAllIncomes: async (req, res) => {
    try {
      const { start, end } = req.query;
      const userId = req.user.id;

      let whereClause = { userId };

      // Date filter
      if (start && end) {
        whereClause.date = {
          gte: new Date(start),
          lte: new Date(end)
        };
      }

      const incomes = await prisma.income.findMany({
        where: whereClause,
        orderBy: { date: 'desc' }
      });

      res.status(200).json(incomes);
    } catch (error) {
      console.error('Get incomes error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

};

module.exports = incomeController;