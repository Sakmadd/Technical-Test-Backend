// models/Book.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  image_url: String,
  release_year: { type: Number, validate: { validator: value => value >= 1980 && value <= 2021 } },
  price: String,
  total_page: Number,
  thickness: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
