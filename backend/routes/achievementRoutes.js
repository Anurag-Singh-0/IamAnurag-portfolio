import express from 'express';
import { 
  getAchievements, createAchievement, updateAchievement, deleteAchievement 
} from '../controllers/achievementController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAchievements);
router.post('/', authMiddleware, createAchievement);
router.put('/:id', authMiddleware, updateAchievement);
router.delete('/:id', authMiddleware, deleteAchievement);

export default router;