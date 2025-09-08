const express = require('express');
const authenticateToken = require('../middleware/auth');
const receiptController = require('../controllers/receiptController');

const router = express.Router();

router.get('/:id', authenticateToken, receiptController.getReceipt);

module.exports = router;