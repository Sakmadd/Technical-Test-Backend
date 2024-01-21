
import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getBooksByCategory,
  getCategoryById,
} from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/',getAllCategories);
router.get('/:id',getCategoryById)
router.post('/',createCategory);
router.patch('/:id',updateCategory);
router.delete('/:id',deleteCategory);
router.get('/:id/books',getBooksByCategory);

export default router;
