// booksRoutes.js
import express from 'express';
// import { authenticateUser } from '../middlewares/authMiddleware.js';
import {getAllBooks, createBook, updateBook, deleteBook,} from '../controllers/booksController.js';

const router = express.Router();

// router.get('/', getAllBooks);
// router.post('/', authenticateUser, createBook);
// router.patch('/:id', authenticateUser, updateBook);
// router.delete('/:id', authenticateUser, deleteBook);

router.get('/', getAllBooks);
router.post('/', createBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;

