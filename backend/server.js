require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');


const authRoute = require('./routes/auth')
const incomesRoute = require('./routes/incomes')
const expenseRoutes = require('./routes/expenses');


const app = express();
const PORT = process.env.PORT || 8080;



const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3001';

app.use(cors({
  origin: frontendURL,
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth/', authRoute)
app.use('/api/incomes',incomesRoute)
app.use('/api/expenses', expenseRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});



// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
  }
  
  if (error.message === 'Only JPG, PNG, and PDF files are allowed') {
    return res.status(400).json({ error: error.message });
  }
  
  res.status(500).json({ error: 'Internal server error' });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});