import express from 'express';
import {getAllBooks, createBook, updateBook, deleteBook, getBookById} from '../controllers/booksController.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;

