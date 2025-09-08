const prisma = require('../config/database');

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const userId = req.user.id;

      const categories = await prisma.category.findMany({
        where: { userId },
        orderBy: { name: 'asc' }
      });

      res.status(200).json(categories);
    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createCategory: async (req, res) => {
    try {
      const userId = req.user.id;
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }

      // Check if category already exists for this user
      const existingCategory = await prisma.category.findFirst({
        where: { name, userId }
      });

      if (existingCategory) {
        return res.status(400).json({ error: 'Category already exists' });
      }

      const category = await prisma.category.create({
        data: {
          name,
          userId
        }
      });

      res.status(201).json(category);
    } catch (error) {
      console.error('Create category error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }

      // Check if category exists and belongs to user
      const existingCategory = await prisma.category.findFirst({
        where: { id, userId }
      });

      if (!existingCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }

      // Check if new name already exists for this user
      const duplicateCategory = await prisma.category.findFirst({
        where: { name, userId, NOT: { id } }
      });

      if (duplicateCategory) {
        return res.status(400).json({ error: 'Category name already exists' });
      }

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name }
      });

      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error('Update category error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      // Check if category exists and belongs to user
      const category = await prisma.category.findFirst({
        where: { id, userId }
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      // Check if category is in use
      const expensesWithCategory = await prisma.expense.findFirst({
        where: { categoryId: id }
      });

      if (expensesWithCategory) {
        return res.status(400).json({ error: 'Cannot delete category that is in use' });
      }

      await prisma.category.delete({
        where: { id }
      });

      res.status(204).send();
    } catch (error) {
      console.error('Delete category error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = categoryController;