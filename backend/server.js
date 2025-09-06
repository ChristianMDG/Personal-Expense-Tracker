require('dotenv').config();
const express = require('express');
const path = require('path');

const incomesRoute = require('./routes/incomes')
const app = express();
const PORT = process.env.PORT || 8080;

const cors = require('cors');
require('dotenv').config(); // ⬅️ IMPORTANT !

// Évaluer la variable AVANT
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3002';

app.use(cors({
  origin: frontendURL, // ← MAINTENANT ÉVALUÉE
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/incomes',incomesRoute)


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});