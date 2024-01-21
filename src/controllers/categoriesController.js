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

const getBooksByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { title, minYear, maxYear, minPage, maxPage, sortByTitle } = req.query;

    // Filter conditions
    const filter = { category_id: categoryId };
    if (title) filter.title = { $regex: new RegExp(title, 'i') }; // Case-insensitive title search
    if (minYear) filter.release_year = { $gte: parseInt(minYear) };
    if (maxYear) filter.release_year = { ...filter.release_year, $lte: parseInt(maxYear) };
    if (minPage) filter.total_page = { $gte: parseInt(minPage) };
    if (maxPage) filter.total_page = { ...filter.total_page, $lte: parseInt(maxPage) };

    // Sorting
    const sort = {};
    if (sortByTitle) sort.title = sortByTitle === 'asc' ? 1 : -1;

    const books = await Book.find(filter).sort(sort);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get books by category' });
  }
};


export { getAllCategories, createCategory, updateCategory, deleteCategory, getBooksByCategory };
