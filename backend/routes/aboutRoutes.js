import express from 'express';
import { getAbout, createAbout, updateAbout } from '../controllers/aboutController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAbout);
router.post('/', authMiddleware, createAbout);
router.put('/', authMiddleware, updateAbout);

export default router;