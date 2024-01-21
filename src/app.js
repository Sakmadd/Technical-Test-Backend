// app.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import categoriesRoutes from './routes/categoriesRoutes.js';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';
import errorHandler from './middlewares/errorMiddleware.js';



const app = express();
const port = 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/books_db')
.then((result) => console.log('Connected to Mongodb'))
.catch((err) => console.log(err));

app.use(cors());
app.use('/categories', categoriesRoutes);
app.use('/books', booksRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
