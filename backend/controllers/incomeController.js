// backend/controllers/incomeController.js
const prisma = require('../config/database');
//controller pour les revenus
const incomeController = {

  //recuperer tous les revenus
  getAllIncomes: async (req, res) => {
    try {
      const { start, end } = req.query;
      const userId = req.user.id;
// Construire la clause where pour filtrer les revenus
      let whereClause = { userId };

      // Date filter
      if (start && end) {
        whereClause.date = {
          gte: new Date(start),
          lte: new Date(end)
        };
      }
      // Récupérer les revenus depuis la base de données avec les filtres appliqués
      const incomes = await prisma.income.findMany({
        where: whereClause,
        orderBy: { date: 'desc' }
      });
      // Envoyer les revenus récupérés au client
      res.status(200).json(incomes);
    } catch (error) {
      console.error('Get incomes error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  //recuperer un revenu par son id
  getIncomeById: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      // Vérifier si le revenu existe et appartient à l'utilisateur
      const income = await prisma.income.findFirst({
        where: { id, userId }
      });
      // Si le revenu n'existe pas, retourner une erreur 404
      if (!income) {
        return res.status(404).json({ error: 'Income not found' });
      }
// Retourner le revenu²
      res.status(200).json(income);
    } catch (error) {
      console.error('Get income by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  //créer un revenu
  createIncome: async (req, res) => {
    try {
      const { amount, date, source, description } = req.body;
      const userId = req.user.id;
// Valider les champs requis
      if (!amount || !date) {
        return res.status(400).json({ error: 'Amount, and date are required' });
      }
      // Créer le revenu dans la base de données
      const newIncome = await prisma.income.create({
        data: {
          amount: parseFloat(amount),
          date: new Date(date),
          source,
          description,
          userId
        }
      });
// Retourner le revenu créé
      res.status(201).json(newIncome);
    } catch (error) {
      console.error('Create income error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  //mettre à jour un revenu
  updateIncome: async (req, res) => {
    try {
      const { id } = req.params;
      const { amount, date, source, description } = req.body;
      const userId = req.user.id;
      // Vérifier si le revenu existe et appartient à l'utilisateur
      const existingIncome = await prisma.income.findFirst({
        where: { id, userId }
      });
      // Si le revenu n'existe pas, retourner une erreur 404
      if (!existingIncome) {
        return res.status(404).json({ error: 'Income not found' });
      }
      // Préparer les données à mettre à jour
      const updateData = {};
      if (amount) updateData.amount = parseFloat(amount);
      if (date) updateData.date = new Date(date);
      if (source !== undefined) updateData.source = source;
      if (description !== undefined) updateData.description = description;
      // Mettre à jour le revenu
      const updatedIncome = await prisma.income.update({
        where: { id },
        data: updateData
      });
      // Retourner le revenu mis à jour
      res.status(200).json(updatedIncome);
    } catch (error) {
      console.error('Update income error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  //supprimer un revenu
  deleteIncome: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      // Vérifier si le revenu existe et appartient à l'utilisateur
      const existingIncome = await prisma.income.findFirst({
        where: { id, userId }
      });
      // Si le revenu n'existe pas, retourner une erreur 404
      if (!existingIncome) {
        return res.status(404).json({ error: 'Income not found' });
      }
      // Supprimer le revenu
      await prisma.income.delete({
        where: { id }
      });
      // Retourner une réponse 204 No Content
      res.status(204).send();
    } catch (error) {
      console.error('Delete income error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = incomeController;

