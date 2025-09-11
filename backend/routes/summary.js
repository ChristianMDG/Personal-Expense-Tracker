const express = require('express');
const authenticateToken = require('../middleware/auth');
const summaryController = require('../controllers/summaryController');

const router = express.Router();

router.get('/monthly', authenticateToken, summaryController.getMonthlySummary);
router.get('/', authenticateToken, summaryController.getCustomSummary);
router.get('/alerts', authenticateToken, summaryController.getBudgetAlerts);
router.get('/monthly-trend', authenticateToken, summaryController.getMonthlyTrend);

module.exports = router;