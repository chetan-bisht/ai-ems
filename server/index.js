// server/index.js
// Load environment variables FIRST (before any other imports)
import dotenv from 'dotenv';
dotenv.config();

// Now import everything else
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Connect to Database
connectDB();

const app = express();

// Middleware (The "Gatekeepers")
app.use(cors()); // Allow all origins (for development)
app.use(express.json()); // Parse JSON bodies

// Routes
import employeeRoutes from './routes/employeeRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

app.use('/api/employees', employeeRoutes);
app.use('/api/ai', aiRoutes);

// Sample Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});