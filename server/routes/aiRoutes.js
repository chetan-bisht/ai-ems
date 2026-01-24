// server/routes/aiRoutes.js
import express from 'express';
import { getBestMatch } from '../controllers/aiController.js';

const router = express.Router();

// Route: POST /api/ai/recommend
router.post('/recommend', getBestMatch);

export default router;
