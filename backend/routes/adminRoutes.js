import express from 'express';
import { loginAdmin, createFirstAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/create-first-admin', createFirstAdmin); // Only run once!

export default router;