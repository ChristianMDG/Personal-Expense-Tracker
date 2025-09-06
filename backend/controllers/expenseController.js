const prisma = require('../config/database');

const expenseController = {
  getAllExpenses: async (req, res) => {
    try {
      const { start, end, category, type } = req.query;
      const userId = req.user.id;

      let whereClause = { userId };

      // Date filter
      if (start && end) {
        whereClause.OR = [
          // One-time expenses with date in range
          {
            type: 'one-time',
            date: {
              gte: new Date(start),
              lte: new Date(end)
            }
          },
          // Recurring expenses active during the period
          {
            type: 'recurring',
            OR: [
              {
                AND: [
                  { startDate: { lte: new Date(end) } },
                  { endDate: null }
                ]
              },
              {
                AND: [
                  { startDate: { lte: new Date(end) } },
                  { endDate: { gte: new Date(start) } }
                ]
              }
            ]
          }
        ];
      }

      // Category filter
      if (category) {
        whereClause.categoryId = category;
      }

      // Type filter
      if (type) {
        whereClause.type = type;
      }

      const expenses = await prisma.expense.findMany({
        where: whereClause,
        include: {
          category: {
            select: { id: true, name: true }
          }
        },
        orderBy: { date: 'desc' }
      });

      res.status(200).json(expenses);
    } catch (error) {
      console.error('Get expenses error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getExpenseById: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const expense = await prisma.expense.findFirst({
        where: { id, userId },
        include: {
          category: {
            select: { id: true, name: true }
          }
        }
      });

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      res.status(200).json(expense);
    } catch (error) {
      console.error('Get expense error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createExpense: async (req, res) => {
    try {
      console.log('Request body:', req.body);
      console.log('Request file:', req.file);
      console.log('User:', req.user);

      const userId = req.user.id;
      
      // Pour multipart/form-data, les champs sont dans req.body
      const { amount, date, categoryId, description, type, startDate, endDate } = req.body;
      const receipt = req.file ? req.file.filename : null;

      console.log('Parsed data from form:', {
        amount, date, categoryId, description, type, startDate, endDate, receipt
      });

      // Validation des champs requis
      if (!amount || !categoryId) {
        console.log('Validation failed: Amount and category are required');
        console.log('Received amount:', amount);
        console.log('Received categoryId:', categoryId);
        return res.status(400).json({ error: 'Amount and category are required' });
      }
        

      // Validation des requirements spécifiques au type
      if (type === 'one-time' && !date) {
        console.log('Validation failed: Date is required for one-time expenses');
        return res.status(400).json({ error: 'Date is required for one-time expenses' });
      }

      if (type === 'recurring' && !startDate) {
        console.log('Validation failed: Start date is required for recurring expenses');
        return res.status(400).json({ error: 'Start date is required for recurring expenses' });
      }

      // Vérifie si la catégorie appartient à l'utilisateur
      const category = await prisma.category.findFirst({
        where: { id: categoryId, userId }
      });

      if (!category) {
        console.log('Validation failed: Invalid category');
        return res.status(400).json({ error: 'Invalid category' });
      }

      const expenseData = {
        amount: parseFloat(amount),
        categoryId,
        description: description || null,
        type: type || 'one-time',
        userId,
        receipt
      };

      // Gestion des dates selon le type
      if (type === 'one-time') {
        expenseData.date = new Date(date);
        expenseData.startDate = null;
        expenseData.endDate = null;
      } else if (type === 'recurring') {
        expenseData.date = null;
        expenseData.startDate = new Date(startDate);
        if (endDate) expenseData.endDate = new Date(endDate);
      }

      console.log('Final expense data:', expenseData);

      const expense = await prisma.expense.create({
        data: expenseData,
        include: {
          category: {
            select: { id: true, name: true }
          }
        }
      });

      console.log('Expense created successfully:', expense);
      res.status(201).json(expense);
    } catch (error) {
      console.error('Create expense error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { amount, date, categoryId, description, type, startDate, endDate } = req.body;
      const receipt = req.file ? req.file.filename : undefined;

      // Check if expense exists and belongs to user
      const existingExpense = await prisma.expense.findFirst({
        where: { id, userId }
      });

      if (!existingExpense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      // Check if category belongs to user if provided
      if (categoryId) {
        const category = await prisma.category.findFirst({
          where: { id: categoryId, userId }
        });

        if (!category) {
          return res.status(400).json({ error: 'Invalid category' });
        }
      }

      const updateData = {};
      if (amount) updateData.amount = parseFloat(amount);
      if (categoryId) updateData.categoryId = categoryId;
      if (description !== undefined) updateData.description = description;
      if (type) updateData.type = type;
      if (receipt) updateData.receipt = receipt;

      // Handle dates based on type
      if (type === 'one-time') {
        updateData.date = date ? new Date(date) : null;
        updateData.startDate = null;
        updateData.endDate = null;
      } else if (type === 'recurring') {
        updateData.date = null;
        if (startDate) updateData.startDate = new Date(startDate);
        if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null;
      }

      const updatedExpense = await prisma.expense.update({
        where: { id },
        data: updateData,
        include: {
          category: {
            select: { id: true, name: true }
          }
        }
      });

      res.status(200).json(updatedExpense);
    } catch (error) {
      console.error('Update expense error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      // Check if expense exists and belongs to user
      const expense = await prisma.expense.findFirst({
        where: { id, userId }
      });

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      await prisma.expense.delete({
        where: { id }
      });

      res.status(204).send();
    } catch (error) {
      console.error('Delete expense error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = expenseController;