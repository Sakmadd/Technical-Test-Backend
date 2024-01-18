// categoriesRoutes.js
import express from 'express';
// import { authenticateUser } from '../middlewares/authMiddleware.js';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getBooksByCategory,
} from '../controllers/categoriesController.js';

const router = express.Router();

// router.get('/', getAllCategories);
// router.post('/', authenticateUser, createCategory);
// router.patch('/:id', authenticateUser, updateCategory);
// router.delete('/:id', authenticateUser, deleteCategory);
// router.get('/:id/books', getBooksByCategory);

router.get('/', getAllCategories);
router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.get('/:id/books', getBooksByCategory);

export default router;
