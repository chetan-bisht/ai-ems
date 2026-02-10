import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import employeeRoutes from './routes/employeeRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/ai', aiRoutes);

if (process.env.NODE_ENV === 'production') {
  // Static files are in the root's client/dist folder
  const clientDist = path.join(rootDir, 'client/dist');
  app.use(express.static(clientDist));

  app.get('*', (req, res, next) => {
    // If it's an API route that wasn't found, don't serve index.html
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.resolve(clientDist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
