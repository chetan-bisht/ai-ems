
// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables (secrets)
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware (The "Gatekeepers")
app.use(cors('*')); // Allow all origins (for development)
app.use(express.json()); // Parse JSON bodies

// Sample Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});