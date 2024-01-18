// app.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import categoriesRoutes from '../src/routes/categoriesRoutes.js';
import booksRoutes from '../src/routes/booksRoutes.js';
// import authRoutes from './routes/authRoutes.js';
import errorHandler from '../src/middlewares/errorMiddleware.js';

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Connect to MongoDB (gantilah URL dengan URL MongoDB Anda)
mongoose.connect('mongodb://127.0.0.1:27017/books_db')
.then((result) => console.log('Connected to Mongodb'))
.catch((err) => console.log(err));

// Use Routes
app.use('/categories', categoriesRoutes);
app.use('/books', booksRoutes);
// app.use('/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
