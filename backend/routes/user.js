const express = require('express');
const authenticateToken = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/profile', authenticateToken, userController.getProfile);

module.exports = router;