import express from 'express';
import { getBestMatch } from '../controllers/aiController.js';

const router = express.Router();

router.post('/recommend', getBestMatch);

export default router;
