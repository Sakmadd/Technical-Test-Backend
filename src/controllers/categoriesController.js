// categoriesController.js
import Category from '../models/Category.js';
import Book from '../models/Books.js';

const getAllCategories = (req, res) => {
  Category.find()
  .then((category) => res.json(category))
  .catch((err) => res.status(500).json({error : 'fucked up'}));
};

const createCategory = (req, res) => {
  const { name } = req.body;

  const newCategory = new Category({ name });

  newCategory.save()
  .then((category) => {res.json(category)})
  .catch((err)=> res.status(400).json({ error: 'Failed to create category' }))
  
  // (err, category) => {
  //   if (err) {
  //     return res.status(400).json({ error: 'Failed to create category' });
  //   }
  //   res.json(category);
  // });
};

const updateCategory = (req, res) => {
  const { name } = req.body;
  const categoryId = req.params.id;

  Category.findByIdAndUpdate(
    categoryId,
    { name, updated_at: Date.now() },
    { new: true, useFindAndModify: false })
    .then((category) => res.json(category))
    .catch((err) => res.status(404).json({ error: 'Failed to Update Category' }))
};

const deleteCategory = (req, res) => {
  const categoryId = req.params.id;

  Category.findByIdAndDelete(categoryId, { useFindAndModify: false })
  .then((category) => res.send('Deleted Succesfully'))
    .catch((err) => res.status(404).json({ error: 'Failed to Delete Category' }));
};

const getBooksByCategory = (req, res) => {
  const categoryId = req.params.id;

  Book.find()
  .then((books) => res.json(books))
    .catch((err) => res.status(404).json({ error: 'Failed to Update Category' }));
};

export { getAllCategories, createCategory, updateCategory, deleteCategory, getBooksByCategory };
