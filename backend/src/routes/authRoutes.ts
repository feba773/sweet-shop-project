// src/routes/authRoutes.ts
import { Router } from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController'; // Add getMe
import { protect } from '../middleware/authMiddleware'; // Import the middleware

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;