require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');


const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const incomeRoutes = require('./routes/incomes');
const categoryRoutes = require('./routes/categories');
const summaryRoutes = require('./routes/summary');
const receiptRoutes = require('./routes/receipts');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  if (req.headers['content-type'] && req.headers['content-type'].startsWith('multipart/form-data')) {
    console.log('Multipart form data received');
  }
  next();
});


app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/user', userRoutes);


app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});


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
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
