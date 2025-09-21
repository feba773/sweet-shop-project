// src/routes/sweetsRoutes.ts
import { Router } from 'express';
import {
  addSweet,
  getSweets,
  searchSweets,
  getSweetById,
  updateSweet,
  deleteSweet,
  purchaseSweet,  // <-- Ensure this is imported
  restockSweet    // <-- Ensure this is imported
} from '../controllers/sweetsController';
import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

// Routes for getting all sweets and adding a new one
router.route('/')
  .post(protect, addSweet)
  .get(getSweets);

// Route for searching sweets
router.get('/search', searchSweets);

// Routes for a specific sweet by its ID
router.route('/:id')
  .get(getSweetById)
  .put(protect, updateSweet)
  .delete(protect, admin, deleteSweet);

// Route for purchasing a sweet
router.post('/:id/purchase', protect, purchaseSweet);

// Route for restocking a sweet (Admin only)
router.post('/:id/restock', protect, admin, restockSweet);

export default router;