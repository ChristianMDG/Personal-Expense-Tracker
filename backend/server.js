require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const incomesRoute = require('./routes/incomes')
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: "process.env.FRONTEND_URL ||'http:localhost:3002'",
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