require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const incomesRoute = require('./routes/incomes')
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: "process.env.FRONTEND_URL ||'http:localhost:3000'",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/incomes',incomesRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});