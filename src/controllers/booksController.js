// booksController.js
import Book from '../models/Books.js';

const isValidReleaseYear = (year) => {
  console.log('Validating release year:', year);
  const isValid = year >= 1980 && year <= 2021;
  console.log('Is valid:', isValid);
  return isValid;
};


const determineThickness = (totalPage) => {
  if (totalPage <= 100) return 'tipis';
  else if (totalPage <= 200) return 'sedang';
  else return 'tebal';
};

const getAllBooks = (req, res) => {
  let filter = {};

  if (req.query.title) {
    filter.title = { $regex: new RegExp(req.query.title, 'i') };
  }

  if (req.query.minYear) {
    filter.release_year = { $gte: parseInt(req.query.minYear) };
  }

  if (req.query.maxYear) {
    filter.release_year = { ...filter.release_year, $lte: parseInt(req.query.maxYear) };
  }

  if (req.query.minPage) {
    filter.total_page = { $gte: parseInt(req.query.minPage) };
  }

  if (req.query.maxPage) {
    filter.total_page = { ...filter.total_page, $lte: parseInt(req.query.maxPage) };
  }

  let sort = {};
  if (req.query.sortByTitle) {
    sort.title = req.query.sortByTitle === 'asc' ? 1 : -1;
  }

  Book.find(filter).sort(sort).exec()
  .then((books) => res.json(books))
  .catch((err) => res.status(404).json({ error: 'Failed to Get All Books' }));;
};

const createBook = (req, res) => {
  const { title, description, image, release_year, price, total_page, category_id } = req.body;

  if (!isValidReleaseYear(release_year)) {
    return res.status(400).json({ error: 'Invalid release year' });
  }

  const thickness = determineThickness(total_page);

  const newBook = new Book({
    title,
    description,
    image,
    release_year,
    price,
    total_page,
    thickness,
    created_at: Date.now(),
    updated_at: Date.now(),
    category_id,
  });

  newBook.save()
  .then((book) => res.json(book))
  .catch((err) => {
    res.status(404).json({ error: 'Failed to Create Book' })});
};

const updateBook = async (req, res) => {
  try {
    const { title, description, image, release_year, price, total_page, category_id } = req.body;
    const bookId = req.params.id;

    if (!isValidReleaseYear(release_year)) {
      return res.status(400).json({ error: 'Tahun rilis tidak valid' });
    }

    const thickness = determineThickness(total_page);

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        title,
        description,
        image,
        release_year,
        price,
        total_page,
        thickness,
        updated_at: Date.now(),
        category_id,
      },
      { new: true, useFindAndModify: false }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: 'Buku tidak ditemukan' });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal memperbarui buku' });
  }
};

const deleteBook = (req, res) => {
  const bookId = req.params.id;

  Book.findByIdAndDelete(bookId, { useFindAndModify: false })
  .then((mess) => res.send('Success Deleting The Book'))
  .catch((err) => res.status(404).json({ error: 'Book Not Found' }));;
};

export { getAllBooks, createBook, updateBook, deleteBook };
